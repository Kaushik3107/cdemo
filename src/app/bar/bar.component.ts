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
        this.createBubbleChart(this.data);
      }
    });
  }

  createBubbleChart(data: any[]): void {
    const bubbleData = data.map((item) => ({
      x: item.year,
      y: item.amount,
      r: 10,
    }));

    const bubblechart = new Chart('bubbleChartCanvas', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Bubble Chart',
            data: bubbleData,
            backgroundColor: data.map((item) => item.colorcode),
            borderColor: 'rgba(255, 99, 132, 1)',
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
            ticks: {
              precision: 0, // Set precision to 0 to display whole numbers
            },
          },
        },
      },
    });
  }

  createBarChart(labeldata: any, realdata: any, colorcode: any) {
    const barchart = new Chart('barChartCanvas', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Bar Chart',
            data: realdata,
            backgroundColor: colorcode,
            borderColor: 'rgba(255, 99, 132, 1)',
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
    const pichart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Pie Chart',
            data: realdata,
            backgroundColor: colorcode,
            borderColor: 'rgba(255, 99, 132, 1)',
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
