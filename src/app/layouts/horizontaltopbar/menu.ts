import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
 

   { id: 1, label: 'Dashboard', link: '', icon: 'bi-speedometer2' },
  { id: 2, label: 'EAN SCAN', link: '/eanscan', icon: 'bi-upc-scan' },
  { id: 3, label: 'STOCK SCAN', link: '/stockscan', icon: 'bi-box-seam' },
  { id: 4, label: 'INWARD SCAN', link: '/inwardscan', icon: 'bi-box-arrow-in-down' },
  { id: 5, label: 'OUTWARD SCAN', link: '/outwardscan', icon: 'bi-box-arrow-up' },
  { id: 6, label: 'Stock Qty Overview Report', link: '/stockqty', icon: 'bi-card-list' },
  { id: 7, label: 'Stock Serials Report', link: '/stockserial', icon: 'bi-upc' },

   {
  id: 8,                    
  label: 'Reports',
  icon: 'bx-cylinder',
  subItems: [
    {
      id: 1,               
      label: 'STOCK TO SAP',
      link: '/stock-to-sap', 
      parentId: 7,          
      icon: 'bx-receipt',   
    }
    
  ]
},
 {
  id: 9,                    
  label: 'User Management',
  icon: 'bx-cylinder',
link:'/user-management'
},

{
  id: 10,                    
  label: 'Master Data',
  icon: 'bx-cylinder',
 subItems: [
    {
      id: 1,               
      label: 'Article Master',
      link: '/article-master', 
      parentId: 10,          
      icon: 'bx-receipt',   
    },
    {
      id: 1,               
      label: 'Site Master',
      link: '/site-master', 
      parentId: 10,          
      icon: 'bx-receipt',   
    },
    {
      id: 1,               
      label: 'Stock Master',
      link: '/stock-master', 
      parentId: 10,          
      icon: 'bx-receipt',   
    },
    
  ]
},
 
 


   
];

