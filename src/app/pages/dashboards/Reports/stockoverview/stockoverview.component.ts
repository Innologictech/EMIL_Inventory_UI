import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockoverview',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './stockoverview.component.html',
  styleUrl: './stockoverview.component.css'
})
export class StockoverviewComponent {
  
stockOverview:FormGroup

}
