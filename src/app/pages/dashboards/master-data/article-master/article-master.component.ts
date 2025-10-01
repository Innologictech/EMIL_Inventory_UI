import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-master',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './article-master.component.html',
  styleUrl: './article-master.component.css'
})
export class ArticleMasterComponent {
showSearch = false;
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
