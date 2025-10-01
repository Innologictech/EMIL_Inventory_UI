import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SessionServiceService } from './pages/ui/session-service.service';
import { NotificationService } from './notification.service';
import { GeneralserviceService } from './generalservice.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,CommonModule,NgxSpinnerModule],
})
export class AppComponent implements OnInit {
  data: any[] = [];
  showLayout = true;
  constructor(private spinner: NgxSpinnerService,private sessionService:SessionServiceService,private notificationService: NotificationService,private service:GeneralserviceService) {}
   

 ngOnInit() {
    const spinnerTimeout = setTimeout(() => {
    this.spinner.hide();
    return
  }, 5000); 
}


  
}
