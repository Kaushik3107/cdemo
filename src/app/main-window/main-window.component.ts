import { Component } from '@angular/core';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css'],
})
export class MainWindowComponent {
  selectedmonth: any;
  selectMonth(month: any) {
    this.selectedmonth = month.target.value;
    console.log('Selected month:', this.selectedmonth);
    // You can implement additional logic here, such as updating charts based on the selected month
  }
}
