// Angular
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
import { LayoutConfigService, SubheaderService } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
declare var am4core: any
declare var am4charts: any
declare var am4themes_animated: any
import { Observable } from 'rxjs';
import { User, currentUser, Login } from '../../../../../src/app/core/auth';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../src/app/core/reducers';
import { environment } from '../../../../../src/environments/environment';
import { HeaderService } from '../../../../../src/app/core/_base/layout/services/header-service';
import { Router, ActivatedRoute } from '@angular/router';
import {componentName} from './../../../../../src/element.json'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'kt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	tabs = [{
		name: "Dashboard",
		url: "dashboard",
		baseRoute: "home"
	  },{
		name: "Report",
		url: "report",
		baseRoute: "home"
    }]
    user: any;
    content;
    component: any
    constructor(
      //private AmCharts: AmChartsService,
      private subheaderService: SubheaderService,
      private headerService: HeaderService,
      private router:Router,
      private activatedRoute:ActivatedRoute,
      private cdr: ChangeDetectorRef,
      private route: ActivatedRoute,
      private domSanatizer: DomSanitizer,
      private store: Store<AppState>) {
    }
    changeRoute(url) {
      
      this.router.navigate([url], { relativeTo: this.activatedRoute });
    }
    loadSubheader() {
      this.headerService.selectTab$.subscribe((selectedTab => {
        if (selectedTab.baseRoute ==='home') {
          this.changeRoute(`../${selectedTab.baseRoute}/${selectedTab.url}`);
        }
      }))
  
      this.subheaderService.setTitle('Dashboard', false);
      this.subheaderService.setBreadcrumbs([
        { title: 'Dashboard', page: `/Dashboard` },
        // { title: 'Dashboard', page: `/das` },
      ]);
      this.subheaderService.setActionButtons([
  
      ])
    }
  ngOnInit() {
    console.log(componentName);
    this.store.pipe(select(currentUser)).subscribe(user => {
      this.user = user;
      if (!!user) {
        let self = this;
        let element = `<${componentName} ['applicationid']="${user['activeApplication']['_id']}" ['selected_tab_url']="/" (elementEvent)="elementEvent($event)"></${componentName}>`
        console.log(element);
        this.content = this.domSanatizer.bypassSecurityTrustHtml(element);
        this.cdr.detectChanges();
        setTimeout(function () {
          this.component = document.querySelector(componentName);
          this.component["applicationId"] = user['activeApplication']['_id'];
          this.component["selected_tab_url"] = '/';
          this.component.addEventListener('elementEvent', function (event) {
            console.log(event);
            self.headerService.setHeaderTabs(event.detail)
          });
        }, 2000)
      } else {
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.store.dispatch(new Login({ authToken: userToken }));
      }
    });
    this.subheaderService.hideSubHeader(false);
		this.headerService.setHeaderTabs(this.tabs);
		this.loadSubheader();
  }
  elementEvent(eventDetail: any) {
    let event = eventDetail.detail;
    switch (event.method) {
      case 'setHeaderTabs':
        let { tabs } = event.data;
        this.headerService.setHeaderTabs(tabs);
        break
      case 'setBreadcrumbs':
        let { breadcrumbs } = event.data;
        this.subheaderService.setBreadcrumbs(breadcrumbs);
        break
      case 'setActiveTab':
        let { activeTab } = event.data;
        this.headerService.setActiveTab(activeTab)
        break
      case 'setTitle':
        let { showBack, title } = event.data;
        this.subheaderService.setTitle(title, showBack)
        break
      case 'hideSubHeader':
        let { showHide } = event.data;
        this.subheaderService.hideSubHeader(showHide);
    }

  }

}
