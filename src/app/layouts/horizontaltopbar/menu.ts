import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    // {
    //     id: 2,
    //     label: 'MENUITEMS.DASHBOARDS.TEXT',
    //     icon: 'bx-home-circle',
    //     parentId: 1,
       
    // },

     {
        id: 2,
        label: 'Dashboard',
        link:'',
        icon: 'bi-speedometer2',
        parentId: 1,
       
    },

    
    {
        id: 2,
        label: 'User Management',
        link:'UserCreation',
        icon: 'bx-group',
        parentId: 1,
       
    },

    {
        id: 2,
        label: 'GRN',
        link: 'grn',
        //  parentId: 2,
        icon: 'bi-journal-text',
       
    },


    {
        id: 2,
        label: 'Create STO',
         parentId: 3,
        icon: 'bi-file-earmark-plus',
      subItems: [
            {
                id: 2,
                label: 'My Store [R] from Any[s]',
                link: '/mystore',
                parentId: 2,
                icon: 'bx-home-circle',
            },

            {
             id: 3,  
             label: 'My Store [S] to Warehouse[R]',
             link: '/mystore-warehouse', 
             parentId: 2,              
             icon: 'bx-store',          
            }

        
        ]
    },


    {
    id: 3,                      
    label: 'Scan Stock Items',   
    link: '/scan-stock-items',  
    // parentId: 2,              
    icon: 'bi-box-seam',          
},


    {
        id: 2,
        label: 'Assign Delivery',
        link: 'assigndelivery',
        //  parentId: 2,
        icon: 'bi-share',
    },


    {
    id: 3,
    label: 'Storage Location Transfer',
    link: 'storagelocationtransfer',
    icon: 'bi-skip-forward-btn',
},




{
  id: 5,                    
  label: 'Dispatch',
          
  icon: 'bi-truck',
  subItems: [
    {
      id: 6,               
      label: 'Against Invoice',
      link: '/against-invoice', 
      parentId: 5,          
      icon: 'bx-receipt',   
    },
    {
      id: 6,               
      label: 'Against STO',
      link: '/againststo', 
      parentId: 5,          
      icon: 'bx-receipt',   
    },
    {
      id: 6,               
      label: 'Sales Return',
      link: '/salesreturn', 
      parentId: 5,          
      icon: 'bx-receipt',   
    },
    {
      id: 6,               
      label: 'Gatepass Print',
      link: '/gatepassprint', 
      parentId: 5,          
      icon: 'bx-receipt',   
    },
    {
      id: 6,               
      label: 'Invoice Print',
      link: '/invoiceprint', 
      parentId: 5,          
      icon: 'bx-receipt',   
    },

  ]
},

{
    id: 4,
    label: 'Article Master',
    link: 'article-master',
    icon: 'bi-database',
},

{
  id: 7,                    
  label: 'Reports',
//   parentId: null,           
  icon: 'bi-bar-chart',
  subItems: [
    {
      id: 8,               
      label: 'Stock Overview',
      link: '/stockoverview', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
    {
      id: 8,               
      label: 'Stock Status',
      link: '/stockstatus', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
    {
      id: 8,               
      label: 'Open STO Order List',
      link: '/openstolist', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },

     {
      id: 8,               
      label: 'Inward Stock',
      link: '/inwardstock', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 8,               
      label: 'Stock In Transit',
      link: '/stockintransit', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 8,               
      label: 'Sales-Deliveries',
      link: '/salesdeliveries', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 8,               
      label: 'Pending-Deliveries',
      link: '/pendingdeliveries', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 8,               
      label: 'MB51',
      link: '/mb51', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
   
   

  ]
},

{
  id: 7,                    
  label: 'Master data',
//   parentId: null,           
  icon: 'bx-cylinder',
  subItems: [
    {
      id: 1,               
      label: 'Article Master',
      link: '/article-master2', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 2,               
      label: 'Site Master',
      link: '/site-master', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 3,               
      label: 'Stock Scanned Items',
      link: '/stock-scanned-items', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 4,               
      label: 'Dispatch Scanned Items',
      link: '/dispatch-scanned-items', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
     {
      id: 5,               
      label: 'Grn Scanned Items',
      link: '/grn-scanned-items', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
    {
      id: 6,               
      label: 'Delivery Scanned Items',
      link: '/delivery-scanned-items', 
      parentId: 7,          
      icon: 'bx-receipt',   
    },
  ]
},



   
];

