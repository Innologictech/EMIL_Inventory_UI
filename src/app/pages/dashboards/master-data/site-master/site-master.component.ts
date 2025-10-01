import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-master',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './site-master.component.html',
  styleUrl: './site-master.component.css'
})
export class SiteMasterComponent {

showSearch = false;
  orders = [
  { id: 1, storeCode: 'SC001', storeName: 'Hyderabad Central' },
  { id: 2, storeCode: 'SC002', storeName: 'Chennai Plaza' },
  { id: 3, storeCode: 'SC003', storeName: 'Bangalore Mart' },
  { id: 4, storeCode: 'SC004', storeName: 'Pune Superstore' },
  { id: 5, storeCode: 'SC005', storeName: 'Delhi Bazaar' }
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
