import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartdataService } from '../services/chartdata.service';
Chart.register(...registerables);
@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css'],
})
export class MychartComponent implements OnInit {
  data: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  constructor(private chartdata: ChartdataService) {}
  ngOnInit(): void {
    this.chartdata.getChartData().subscribe((res) => {
      this.data = res;
      if (this.data != null) {
        for (let i = 0; i < this.data.length; i++) {
          this.labeldata.push(this.data[i].year);
          this.realdata.push(this.data[i].amount);
          this.colordata.push(this.data[i].colorcode);
        }
        this.RenderChart(this.labeldata, this.realdata, this.colordata);
        this.PieChart(this.labeldata, this.realdata, this.colordata);
        this.createBubbleChart(this.data);
      }
    });
  }
  RenderChart(labeldata: any, realdata: any, colorcode: any) {
    const myChart = new Chart('barchart', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: realdata,
            backgroundColor: colorcode,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  PieChart(labeldata: any, realdata: any, colorcode: any) {
    const myChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: realdata,
            backgroundColor: colorcode,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createBubbleChart(data: any[]): void {
    const years = data.map((item: any) => item.year);
    const amounts = data.map((item: any) => item.amount);
    const colorcodes = data.map((item: any) => item.colorcode);
    const myChart = new Chart('bubbleChartCanvas', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Bubble Chart',
            data: years.map((year: any, index: number) => ({
              x: year,
              y: amounts[index],
              r: 10, // radius, you can set it based on your data
              backgroundColor: colorcodes[index],
            })),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
          x: {
            beginAtZero: false,
          },
        },
      },
    });
  }
}
