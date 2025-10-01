import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-scanned-items',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './delivery-scanned-items.component.html',
  styleUrl: './delivery-scanned-items.component.css'
})
export class DeliveryScannedItemsComponent {
   showSearch = false;
   orders = [
    {
      rowId: 1,
      orderNo: 'ORD1001',
      orderItemNo: 'ITM001',
      userName: 'John Doe',
      productCode: 'PRD-5001',
      eanCode: '8901234567890',
      serialNo: 'SN-10001',
      quantity: 5,
      driverCode: 'DRV101',
      scannedTime: '2025-09-26 10:15 AM',
      geoLocation: 'Hyderabad, IN',
      latitude: 17.3850,
      longitude: 78.4867
    },
    {
      rowId: 2,
      orderNo: 'ORD1002',
      orderItemNo: 'ITM002',
      userName: 'Jane Smith',
      productCode: 'PRD-5002',
      eanCode: '8901234567891',
      serialNo: 'SN-10002',
      quantity: 10,
      driverCode: 'DRV102',
      scannedTime: '2025-09-26 11:30 AM',
      geoLocation: 'Bangalore, IN',
      latitude: 12.9716,
      longitude: 77.5946
    },
    {
      rowId: 3,
      orderNo: 'ORD1003',
      orderItemNo: 'ITM003',
      userName: 'Robert Lee',
      productCode: 'PRD-5003',
      eanCode: '8901234567892',
      serialNo: 'SN-10003',
      quantity: 3,
      driverCode: 'DRV103',
      scannedTime: '2025-09-26 01:45 PM',
      geoLocation: 'Mumbai, INghaDVASHHHHHHHHHHHHBSBDHVH',
      latitude: 19.0760,
      longitude: 72.8777
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
