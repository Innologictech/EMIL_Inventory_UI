import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagementComponent } from './task-management/task-management.component';
import { DesignationComponent } from './designation/designation.component';
import { AdminemployeecreationComponent } from './adminemployeecreation/adminemployeecreation.component';
import { AdminEmployeeCalendarComponent } from './admin-employee-calendar/admin-employee-calendar.component';

const routes: Routes = [
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
