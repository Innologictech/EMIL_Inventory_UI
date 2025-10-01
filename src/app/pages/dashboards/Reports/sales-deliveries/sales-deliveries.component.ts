import { Component } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-sales-deliveries',
  standalone: true,
  imports: [BsDatepickerModule],
  templateUrl: './sales-deliveries.component.html',
  styleUrl: './sales-deliveries.component.css'
})
export class SalesDeliveriesComponent {
    bsRangeConfig: Partial<BsDatepickerConfig>;

}
