import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public circulations: Circulations[];
  public Highcharts;
  public chartOptions;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Circulations[]>(baseUrl + 'api/SampleData/Circulations').subscribe(result => {
      this.circulations = result;
      this.buildChart();
    }, error => console.error(error));
  }

  buildChart() {
    this.Highcharts = Highcharts;
    this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'RBDigital Library Circulations by Media Format'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Thousands'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            split: true,
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'eAudio',
            data: [0, 569, 1205, 1379, 1732, 1314, 1518, 1393, 1235, 1463, 1356, 1225]
        }, {
            name: 'eBook',
            data: [0, 272, 889, 757, 1114, 1832, 1060, 1121, 950, 1106, 761, 895]
        }, {
            name: 'eMagazine',
            data: [559, 261, 722, 443, 465, 244, 252, 246, 216, 286, 239, 402]
        }, {
            name: 'comic',
            data: [0, 0, 289, 88, 210, 86, 96, 49, 40, 28, 51, 26]
        }, {
            name: 'acorn',
            data: [0, 0, 60, 21, 13, 71, 47, 28, 24, 5, 16]
        }, {
            name: 'qello',
            data: [4, 0, 44, 19, 13, 13, 8, 50, 23,18, 35, 10]
        }]
    }
  }

  
}

interface Circulations {
  libraryID: string;
  month: number;
  mediaType: number;
  transactions: string;
}
