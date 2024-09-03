import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarningChartComponent } from './earning-chart/earning-chart.component';
import { DailySalesChartComponent } from './daily-sales-chart/daily-sales-chart.component';
import { MonthSalesComponent } from './month-sales/month-sales.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    EarningChartComponent,
    DailySalesChartComponent,
    MonthSalesComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],exports:[
    EarningChartComponent,
    DailySalesChartComponent,
    MonthSalesComponent
  ]
})
export class WidgetsModule { }
