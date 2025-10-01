import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dispatch-scanned-items',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dispatch-scanned-items.component.html',
  styleUrl: './dispatch-scanned-items.component.css'
})
export class DispatchScannedItemsComponent {

   showSearch = false;
   orders = [
    {
      rowId: 1,
      orderNo: 'ORD2001',
      orderItemNo: 'ITM101',
      saleStore: 'Store A',
      deliveredStore: 'Store B',
      productCode: 'PRD-7001',
      productDesc: 'Smartphone Model X',
      eanCode: '8901122334455',
      serialNo: 'SN-20001',
      quantity: 2,
      scannedTime: '2025-09-26 09:15 AM',
      driverCode: 'DRV201',
      sapUpdated: 'Yes',
      refConfId: 'CONF-9001'
    },
    {
      rowId: 2,
      orderNo: 'ORD2002',
      orderItemNo: 'ITM102',
      saleStore: 'Store C',
      deliveredStore: 'Store D',
      productCode: 'PRD-7002',
      productDesc: 'LED TV 42 inch',
      eanCode: '8901122334466',
      serialNo: 'SN-20002',
      quantity: 1,
      scannedTime: '2025-09-26 11:30 AM',
      driverCode: 'DRV202',
      sapUpdated: 'No',
      refConfId: 'CONF-9002'
    },
    {
      rowId: 3,
      orderNo: 'ORD2003',
      orderItemNo: 'ITM103',
      saleStore: 'Store E',
      deliveredStore: 'Store F',
      productCode: 'PRD-7003',
      productDesc: 'Laptop Pro 15',
      eanCode: '8901122334477',
      serialNo: 'SN-20003',
      quantity: 5,
      scannedTime: '2025-09-26 01:45 PM',
      driverCode: 'DRV203',
      sapUpdated: 'Yes',
      refConfId: 'CONF-9003'
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
