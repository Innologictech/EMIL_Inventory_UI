import { Component } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-mb51',
  standalone: true,
  imports: [BsDatepickerModule],
  templateUrl: './mb51.component.html',
  styleUrl: './mb51.component.css'
})
export class MB51Component {
  bsRangeConfig: Partial<BsDatepickerConfig>;

}
