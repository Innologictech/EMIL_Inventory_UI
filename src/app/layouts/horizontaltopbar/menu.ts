import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
 

   { id: 1, label: 'Dashboard', link: '', icon: 'bi-speedometer2' },
  { id: 2, label: 'EAN SCAN', link: '/eanscan', icon: 'bi-upc-scan' },
  { id: 3, label: 'STOCK SCAN', link: '/stockscan', icon: 'bi-box-seam' },
  { id: 4, label: 'INWARD SCAN', link: '/inwardscan', icon: 'bi-box-arrow-in-down' },
  { id: 5, label: 'OUTWARD SCAN', link: '/outwardscan', icon: 'bi-box-arrow-up' },
  { id: 6, label: 'Stock Qty Overview Report', link: '/stockqty', icon: 'bi-card-list' },
  { id: 7, label: 'Stock Serials Report', link: '/stockserial', icon: 'bi-upc' }

    


   
];

