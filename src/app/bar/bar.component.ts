import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  ngOnInit(): void {
    this.createBubbleChart();
    this.createBarChart();
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

  createBarChart() {
    const barChartCanvas = document.getElementById(
      'barChartCanvas'
    ) as HTMLCanvasElement;
    const bbox2 = document.querySelector('.bbox2') as HTMLElement;
    barChartCanvas.width = bbox2.clientWidth;
    barChartCanvas.height = bbox2.clientHeight;
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            label: 'Bar Chart',
            data: [10, 20, 30, 40], // Sample bar data
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
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
}
