import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockserials-report',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './stockserials-report.component.html',
  styleUrl: './stockserials-report.component.css'
})
export class StockserialsReportComponent {
stockSerials:FormGroup;
}
