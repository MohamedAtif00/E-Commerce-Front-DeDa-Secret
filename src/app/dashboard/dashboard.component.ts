import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouteService } from '../core/services/route.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{




  ngOnInit(): void {

    
      initFlowbite()
  }

}
