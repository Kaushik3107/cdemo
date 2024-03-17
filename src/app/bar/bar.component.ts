import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartdataService } from '../services/chartdata.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
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
        this.createBarChart(this.labeldata, this.realdata, this.colordata);
        this.createPieChart(this.labeldata, this.realdata, this.colordata);
      }
    });

    this.createBubbleChart();
  }

  createBubbleChart() {
    // const bubbleChartCanvas = document.getElementById(
    //   'bubbleChart'
    // ) as HTMLCanvasElement;
    // const bbox1 = document.querySelector('.bbox1') as HTMLElement;
    // bubbleChartCanvas.width = bbox1.clientWidth;
    // bubbleChartCanvas.height = bbox1.clientHeight;
    new Chart('bubbleChartCanvas', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Bubble Chart',
            data: [
              { x: 10, y: 20, r: 10 }, // Sample bubble data
              { x: 30, y: 40, r: 20 },
              { x: 50, y: 60, r: 15 },
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createBarChart(labeldata: any, realdata: any, colorcode: any) {
    const barChartCanvas = document.getElementById(
      'barChartCanvas'
    ) as HTMLCanvasElement;
    const bbox2 = document.querySelector('.bbox2') as HTMLElement;
    barChartCanvas.width = bbox2.clientWidth;
    barChartCanvas.height = bbox2.clientHeight;
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Bar Chart',
            data: realdata, // Sample bar data
            backgroundColor: colorcode,
            borderColor: 'rgba(54, 162, 235, 1)',
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

  createPieChart(labeldata: any, realdata: any, colorcode: any) {
    const myChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Pie Chart',
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
}
