import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grn-scanned-items',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './grn-scanned-items.component.html',
  styleUrl: './grn-scanned-items.component.css'
})
export class GrnScannedItemsComponent {



showSearch = false;

  orders = [
  {
    rowId: 1,
    storeCode: 'SC001',
    poNum: 'PO123',
    poItemNo: '10',
    productCode: 'P1001',
    eanCode: 'EAN123456',
    serialNo: 'SN98765',
    scanQty: 5,
    scannedTime: '2025-09-26 10:30',
    grnDone: 'Yes',
    refConfId: 'RC001'
  },
  {
    rowId: 2,
    storeCode: 'SC002',
    poNum: 'PO124',
    poItemNo: '20',
    productCode: 'P1002',
    eanCode: 'EAN654321',
    serialNo: 'SN12345',
    scanQty: 3,
    scannedTime: '2025-09-26 11:00',
    grnDone: 'No',
    refConfId: 'RC002'
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
