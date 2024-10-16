import { Component, OnInit, signal } from '@angular/core';
import { AdministrationService } from '../../../core/services/administration.service';
import { catchError, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  title_eng: string;
  title_arb: string;
  desc_eng: string;
  desc_arb: string;

  HeroImageUrl = signal('');

  constructor(
    private adminService: AdministrationService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // AOS.init();
    this.adminService.GetAdministration().subscribe((data) => {
      console.log('current lang', this.translateService.defaultLang);
      this.title_eng = data.value.title_Eng;
      this.title_arb = data.value.title_Arb;
      this.desc_eng = data.value.desc_Eng;
      this.desc_arb = data.value.desc_Arb;
    });

    this.adminService
      .GetHero()
      .pipe(
        catchError((error) => {
          console.error('Error fetching hero image', error);
          return of(new Blob()); // Return a default empty Blob
        })
      )
      .subscribe((blob) => {
        this.createImageFromBlob(blob)
          .then((image) => {
            this.HeroImageUrl.set(`url(${image})`); // Set the URL in the correct format
          })
          .catch((error) => {
            console.error('Error creating image from blob', error);
            this.HeroImageUrl.set('url(/assets/default-image.jpg)'); // Fallback image
          });
      });
  }

  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read the Blob as a Data URL.'));
      };
      reader.readAsDataURL(image);
    });
  }
}
