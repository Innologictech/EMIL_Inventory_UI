import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-in-transit',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './stock-in-transit.component.html',
  styleUrl: './stock-in-transit.component.css'
})
export class StockInTransitComponent {
stocktransit:FormGroup;
}
