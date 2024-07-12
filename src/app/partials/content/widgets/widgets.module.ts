import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarningChartComponent } from './earning-chart/earning-chart.component';
import { DailySalesChartComponent } from './daily-sales-chart/daily-sales-chart.component';
import { MonthSalesComponent } from './month-sales/month-sales.component';



@NgModule({
  declarations: [
    EarningChartComponent,
    DailySalesChartComponent,
    MonthSalesComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    EarningChartComponent,
    DailySalesChartComponent,
    MonthSalesComponent
  ]
})
export class WidgetsModule { }
