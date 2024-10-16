import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../../core/services/administration.service';
import { GetDescription } from '../../../core/model/administration.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  description: GetDescription = {
    title_eng: '',
    title_arb: '',
    desc_eng: '',
    desc_arb: '',
  };

  constructor(
    private adminService: AdministrationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.adminService.GetDescription().subscribe((data) => {
      this.description = data.value;
    });
  }
}
