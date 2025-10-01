import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-grn',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,BsDatepickerModule],
  templateUrl: './grn.component.html',
  styleUrl: './grn.component.css'
})
export class GrnComponent {
  poLabel: string = 'PO Number';

  // Only one screen active at a time
  showFirstScreen = true;
  showSecondScreen = false;
  showThirdScreen = false; // For scanned items screen
  showGrnConfirmation = false;
  poNumber: any;
  showScanned: boolean;
  showSearch: boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  
    ngOnInit() {
      this.bsConfig = {
        dateInputFormat: 'DD-MM-YYYY', // day-month-number-year
        containerClass: 'theme-default',
      };
    }

  constructor(private route: ActivatedRoute) {
    // Example: read route params
    this.route.params.subscribe(params => {
      if (params['poNumber']) {
        this.poNumber = params['poNumber'];
      }
      if (params['screen'] === 'scanned') {
        this.showScanned = true;
      }
    });
  }


  onGrnTypeChange(type: string) {
    if (type === 'vendor') {
      this.poLabel = 'PO Number';
    } else if (type === 'sto') {
      this.poLabel = 'STO Outbound Delivery Number';
    }
  }

  // FIRST → SECOND
  goToSecondScreen() {
    this.showFirstScreen = false;
    this.showSecondScreen = true;
    this.showThirdScreen = false;
  }

  // SECOND → THIRD (Scanned Items)
  openScannedItems() {
    this.showFirstScreen = false;
    this.showSecondScreen = false;
    this.showThirdScreen = true;
  }

  // Toggle GRN Confirmation
  toggleGrnConfirmation(show: boolean) {
    this.showGrnConfirmation = show;
  }

  // BACK button from SECOND → FIRST
  goBackToFirst() {
    this.showFirstScreen = true;
    this.showSecondScreen = false;
    this.showThirdScreen = false;
    this.showGrnConfirmation = false;
  }

  // BACK button from THIRD → SECOND
  goBackFromThird() {
    this.showFirstScreen = false;
    this.showSecondScreen = true;
    this.showThirdScreen = false;
  }
  toggleSearch(event: MouseEvent) {
    event.stopPropagation();
    this.showSearch = true;
  }
 
 
  closeSearch() {
    this.showSearch = false;
  }
 
    // Listen for document clicks
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showSearch) {
      this.closeSearch();
    }
  }
}
