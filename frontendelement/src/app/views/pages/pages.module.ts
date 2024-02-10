// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';





// import { BotsComponent } from './bots/bots.component';
//import { IntegrationsComponent } from './integrations/integrations.component';
// import { BotsComponent } from './bots/bots.component';

import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../../../environments/environment';
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule,
	MatChipsModule
} from '@angular/material';
import {
	InterceptService, HttpUtilsService,
	TypesUtilsService, LayoutUtilsService
} from '../../../../src/app/core/_base/crud';
import { ActionNotificationComponent } from '../partials/content/crud';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({

	//declarations: [MyPageComponent, TestpageComponent, EventsComponent, SettingsComponent, IntegrationsComponent, UserProfileComponent, NewApplicaitonComponent, ApplicationListComponent],
	// declarations: [MyPageComponent, TestpageComponent, EventsComponent, SettingsComponent, BotsComponent, UserProfileComponent, NewApplicaitonComponent, ApplicationListComponent],
	exports: [],
	imports: [
		// AngularFireModule.initializeApp(environment.firebase),
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,

		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatChipsModule,
	],
	providers: [
		InterceptService,
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: InterceptService,
		  multi: true
		},
		{
		  provide: MAT_DIALOG_DEFAULT_OPTIONS,
		  useValue: {
			hasBackdrop: true,
			panelClass: 'kt-mat-dialog-container__wrapper',
			height: 'auto',
			width: '900px'
		  }
		},
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,
		AngularFireDatabase,

		
	  ],
	entryComponents: [
		ActionNotificationComponent,
		// NewApplicaitonComponent



	],
	declarations: [],
})
export class PagesModule {
}
