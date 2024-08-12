import { Component, OnInit } from '@angular/core';

import { initFlowbite } from 'flowbite';
import { AdministrationService } from '../administration.service';
import { CategoryProfits } from '../model/categoriesProfits.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit{



  constructor(private adminService:AdministrationService) { }

  ngOnInit(): void {
    initFlowbite()
    this.adminService.categoriesProfitsDays.subscribe(data =>
    { 
      this.GetCategoryProfits()

    })
  }

  GetCategoryProfits()
  { 
    this.adminService.GetCategoriesProfits().subscribe(data =>
    { 
      let categoryProfits = data.value
      this.adminService.categoryProfits.next(categoryProfits);
      
    })
  }



  


}
