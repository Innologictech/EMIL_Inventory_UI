import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-against-invoice',
  templateUrl: './against-invoice.component.html',
  styleUrl: './against-invoice.component.css',
   standalone: true,
    imports: [CommonModule,FormsModule,ReactiveFormsModule]
})
export class AgainstInvoiceComponent {
    poLabel: string = 'Invoice/STO PO Number ';


  againstInvoice:FormGroup;
    showFirstScreen = true;
  showSecondScreen = false;
  showThirdScreen = false; // For scanned items screen
  showGrnConfirmation = false;
  showSearch: boolean;

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
