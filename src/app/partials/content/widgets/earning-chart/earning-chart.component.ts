import { Component, OnInit, OnDestroy, EventEmitter, signal } from '@angular/core';
import { initDropdowns, initFlowbite } from 'flowbite';
 import type { DropdownOptions, DropdownInterface } from 'flowbite';
import ApexCharts from 'apexcharts';
import { CategoryProfits } from '../../../../modules/admin/model/categoriesProfits.model';
import { AdministrationService } from '../../../../modules/admin/administration.service';
import { FlowbiteService } from '../../../../core/services/flowbite.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-earning-chart',
  templateUrl: './earning-chart.component.html',
  styleUrls: ['./earning-chart.component.scss']
})
export class EarningChartComponent implements OnInit, OnDestroy {
  categoriesProfits: CategoryProfits[];
  chart: ApexCharts;
  options: DropdownOptions;
  daysDropdown: DropdownInterface;

  totalEaring = signal('');
  
  constructor(private adminService: AdministrationService,
    private fow: FlowbiteService,
    private translate:TranslationService  ) { 
    }
    
    ngOnInit(): void {
      
      this.totalEaring.set(this.translate.currentLang() == 'en' ? "Total Earnings" : 'اجمالي الارباح');
    initFlowbite();

    this.GetCategoriesProfits()
  }

  GetCategoriesProfits()
  { 
    this.adminService.categoryProfits.subscribe(data => { 
      this.categoriesProfits = data;
      if(this.categoriesProfits.length != 0)
      this.startChart();
    });
  }

  ngOnDestroy(): void {
   this.ClearCharts()
  }

  startChart(): void {
    this.ClearCharts()
    const getChartOptions = () => {
      return {
        series: this.categoriesProfits.map(x => x.total),
        colors: this.categoriesProfits.map(() => this.generateHeavyColor()),
        chart: {
          height: 320,
          width: "100%",
          type: "donut",
        },
        stroke: {
          colors: ["transparent"],
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: 20,
                },
                total: {
                  showAlways: true,
                  show: true,
                  label:this.totalEaring(),
                  fontFamily: "Inter, sans-serif",
                  formatter:  (w)=> {
                    const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    let total =  (this.translate.currentLang() == 'en'? "EGP":'جنيه') + (sum >= 1000 ? (Math.round(sum / 1000) + 'k') : '');
                      return total
                  }
                  ,
                },
                value: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: -20,
                  formatter: function (value) {
                    return value + "k";
                  },
                },
              },
              size: "80%",
            },
          },
        },
        grid: {
          padding: {
            top: -2,
          },
        },
        labels: this.categoriesProfits.map(x => x.categoryName),
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
          fontSize:13
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + "k";
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return value + "k";
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      };
    };

    const chartElement = document.getElementById("donut-chart");
    if (chartElement && typeof ApexCharts !== 'undefined') {
      this.chart = new ApexCharts(chartElement, getChartOptions());
      this.chart.render();

      this.setupCheckboxListeners();
    }
  }

  private setupCheckboxListeners(): void {
    const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => this.handleCheckboxChange(event));
    });
  }

  private handleCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (this.chart) {
      if (checkbox.checked) {
        this.updateChartSeries(checkbox.value);
      } else {
        // Reset to default values if needed
        this.chart.updateSeries([35.1, 23.5, 2.4, 5.4]); // Example values
      }
    }
  }

  private updateChartSeries(value: string): void {
  // Find the matching category based on 'categoyId'
  const matchingCategory = this.categoriesProfits.find(category => category.categoyId === value);

  if (matchingCategory) {
    // Assuming 'total' is the data you want to update the chart with
    // Create a series data array from the matching category
    const seriesData = this.categoriesProfits.map(category => category.total);
    
    if (this.chart) {
      this.chart.updateSeries(seriesData);
    }
  } else {
    // Optionally handle the case where no matching data is found
  }
}



  SetCategoryProfitsDays(days:number)
  { 
    this.ClearCharts()
    this.adminService.categoriesProfitsDays.next(days)
    this.GetCategoriesProfits()
  }














  ClearCharts()
  { 
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // Method to generate a random hex color with heavy saturation
  private generateHeavyColor(): string {
     // Helper function to generate a random number between min and max
    const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    // Generate a random hue between 0 and 360 degrees
    const hue = getRandomInt(0, 360);

    // Saturation is set to 100% to ensure vibrant colors
    const saturation = 100;

    // Lightness is set to between 70% and 90% to ensure lighter colors
    const lightness = getRandomInt(70, 90);

    // Return the HSL color formatted as a string
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;  
  }


  



}
