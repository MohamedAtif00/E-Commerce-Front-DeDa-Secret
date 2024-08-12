import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import ApexCharts from 'apexcharts';
import { AdministrationService } from '../../../../core/services/administration.service';
import { DailyEarningProfits } from '../../../../core/model/administration.model';

@Component({
  selector: 'app-daily-sales-chart',
  templateUrl: './daily-sales-chart.component.html',
  styleUrl: './daily-sales-chart.component.scss'
})
export class DailySalesChartComponent implements OnInit{


  dailyProfits: DailyEarningProfits[] = []

  constructor(private administrationService:AdministrationService) { }

  ngOnInit(): void {
    initFlowbite()
    this.GetDailyEarningProfits()
      //this.StartChart();
  }


  GetDailyEarningProfits()
  {
    return this.administrationService.GetDailyEarningProfits().subscribe(data =>
    { 
      console.log('daily profits',data);
      this.dailyProfits = data.value
      this.StartChart(this.dailyProfits);
    })
  }


  StartChart(data:DailyEarningProfits[])
  {
    
    const options = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
        {
          name: "Organic",
          color: "#1A56DB",
          data: data.map(e => { return { x: e.day.substring(0,3), y: e.total } })
            //[
            // { x: "Mon", y: 231 },
            // { x: "Tue", y: 122 },
            // { x: "Wed", y: 63 },
            // { x: "Thu", y: 421 },
            // { x: "Fri", y: 122 },
            // { x: "Sat", y: 323 },
            // { x: "Sun", y: 111 },
          //]
          ,
        }
      ],
      chart: {
        type: "bar",
        height: "260px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    }

    if(document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("column-chart"), options);
      chart.render();
    }

  }



}
