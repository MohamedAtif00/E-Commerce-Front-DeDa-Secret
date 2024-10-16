import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../../core/services/administration.service';
import {
  AdministrationModel,
  GetDescription,
  WelcomeMessage,
} from '../../../core/model/administration.model';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'], // Corrected `styleUrl` to `styleUrls`
})
export class AdministrationComponent implements OnInit {
  // Administration
  Administration: AdministrationModel;

  // Color
  selectedColor: string = '#000000'; // Default color

  // Logo Section
  logoUrl: string | ArrayBuffer | null = null; // To store the logo URL
  logoFile: File | null = null; // To store the selected file

  // Hero Section
  heroUrl: string | ArrayBuffer | null = null; // To store the logo URL
  heroFile: File | null = null;
  // Welcome Message Section
  welcomeMessageLang: string = 'en'; // Corrected spelling
  welcomeMessage: WelcomeMessage = {
    title_Eng: '',
    title_Arb: '',
    desc_Eng: '',
    desc_Arb: '',
    marquee_Eng: '',
    marquee_Arb: '',
  };

  // Description Message Section
  descriptionMessageLang: string = 'en';
  descriptionMessage: GetDescription = {
    title_eng: '',
    title_arb: '',
    desc_eng: '',
    desc_arb: '',
  };

  constructor(
    private adminService: AdministrationService,
    public translation: TranslationService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetAdministration();
    this.GetDescription();
  }

  // Color Section
  ColorSelected(): void {
    this.adminService.ChangeWebsiteColor(this.selectedColor).subscribe(
      (data) => {
        console.log('Color change response:', data);
        this.toastrService.success('Color updated successfully');
      },
      (error) => {
        console.error('Failed to update color:', error);
        this.toastrService.error('Failed to update color');
      }
    );
  }

  // Logo Section
  onLogoFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.logoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.logoUrl = e.target?.result; // Set the logo URL for preview
      };
      reader.readAsDataURL(this.logoFile); // Read the file as data URL
    }
  }

  saveLogo(): void {
    if (this.logoFile) {
      const formData = new FormData();
      formData.append('logo', this.logoFile);

      // Replace 'your-api-endpoint' with your actual endpoint
      // this.adminService.uploadLogo(formData).subscribe({
      //   next: (response) => {
      //     console.log('Logo saved successfully', response);
      //     this.toastrService.success('Logo uploaded successfully');
      //   },
      //   error: (err) => {
      //     console.error('Failed to save logo', err);
      //     this.toastrService.error('Failed to upload logo');
      //   }
      // });
    } else {
      console.warn('No logo file selected');
      this.toastrService.warning('No logo file selected');
    }
  }

  // Welcome Message Section
  SetLang(lang: string): void {
    this.welcomeMessageLang = lang;
  }

  SaveWelcomeMessage(): void {
    this.adminService.SetWelcomeMessage(this.welcomeMessage).subscribe(
      (data) => {
        if (data.isSuccess) {
          this.welcomeMessage = {
            title_Eng: '',
            title_Arb: '',
            desc_Eng: '',
            desc_Arb: '',
            marquee_Eng: '',
            marquee_Arb: '',
          };
          this.toastrService.success('Welcome message updated successfully');
        } else {
          this.toastrService.error('Failed to update welcome message');
        }
      },
      (error) => {
        console.error('Error saving welcome message:', error);
        this.toastrService.error('Failed to update welcome message');
      }
    );
  }

  // End Welcome Message Section

  GetAdministration(): void {
    this.adminService.GetAdministration().subscribe(
      (data) => {
        try {
          let welcome = data.value;

          this.selectedColor = data.value.websiteColor;
          this.welcomeMessage = {
            title_Eng: welcome.title_Eng,
            title_Arb: welcome.title_Arb,
            desc_Eng: welcome.desc_Eng,
            desc_Arb: welcome.desc_Arb,
            marquee_Eng: welcome.marquee_Eng,
            marquee_Arb: welcome.marquee_Arb,
          };

          // this.selectedColor = this.Administration.websiteColor || '#FBD5D5'; // Default to a color if undefined

          // this.welcomeMessage =this.Administration.welcomeMessage
        } catch (e) {}
        // console.log('After assignment:', this.Administration.welcomeMessage);
      },
      (error) => {
        console.error('Error fetching administration data:', error);
      }
    );
  }

  // Description Section
  SetDescriptionLang(lang: string) {
    this.descriptionMessageLang = lang;
  }

  GetDescription() {
    this.adminService.GetDescription().subscribe((data) => {
      this.descriptionMessage = data.value;
    });
  }

  SaveDescription() {
    let description: WelcomeMessage = {
      title_Eng: this.welcomeMessage.title_Eng,
      title_Arb: this.welcomeMessage.title_Arb,
      desc_Eng: this.welcomeMessage.desc_Eng,
      desc_Arb: this.welcomeMessage.desc_Arb,
      marquee_Eng: this.welcomeMessage.marquee_Eng,
      marquee_Arb: this.welcomeMessage.marquee_Arb,
    };
    this.adminService.SetDescription(description).subscribe((data) => {});
  }

  onHeroFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.heroFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.heroUrl = e.target?.result; // Set the logo URL for preview
      };
      reader.readAsDataURL(this.heroFile); // Read the file as data URL
    }
  }

  saveHero(): void {
    if (this.heroFile) {
      const formData = new FormData();
      formData.append('file', this.heroFile);

      this.adminService.ChangeHero(formData).subscribe((data) => {});
    } else {
      console.warn('No Hero file selected');
      this.toastrService.warning('No Hero file selected');
    }
  }
}
