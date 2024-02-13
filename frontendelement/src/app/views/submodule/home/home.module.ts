import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const routes:Routes=[
 { path: '',
  component: HomeComponent,

  }
]

@NgModule({
  declarations: [ HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,        // <----- import for date formating(optional)
    MatMomentDateModule,
    NgbDropdownModule,
   
  ],
  providers:[
    DatePipe
  ]
  ,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
