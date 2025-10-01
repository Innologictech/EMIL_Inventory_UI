import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-scanned-items',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './stock-scanned-items.component.html',
  styleUrl: './stock-scanned-items.component.css'
})
export class StockScannedItemsComponent {
  showSearch = false;

orders = [
  {
    rowId: 1,
    scannedBy: 'John Doe',
    storeCode: 'SC001',
    productCode: 'P1001',
    eanCode: 'EAN123456',
    quantity: 5,
    serialNo: 'SN98765',
    scannedTime: '2025-09-26 10:30'
  },
  {
    rowId: 2,
    scannedBy: 'Jane Smith',
    storeCode: 'SC002',
    productCode: 'P1002',
    eanCode: 'EAN654321',
    quantity: 3,
    serialNo: 'SN12345',
    scannedTime: '2025-09-26 11:00'
  }
];




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
