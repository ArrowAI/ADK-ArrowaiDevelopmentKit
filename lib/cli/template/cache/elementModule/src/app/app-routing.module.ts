import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';



const routes = [
  
  // {
  //     path: '',  component: EmployeeListComponent ,outlet: 'employeeModule'
  // },
  // {
  //   path: 'employee',  component: EmployeeListComponent ,outlet: 'employeeModule'
  // },
  // { 
  //     path: 'addemployee',  component: AddEmployeeComponent ,outlet: 'employeeModule'
  // },
  // { 
  //     path: 'empdetail/:int',  component: EmpDetailComponent, outlet: 'employeeModule'
  // },
  { 
     path: '**', redirectTo: '', pathMatch: 'full' 
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
