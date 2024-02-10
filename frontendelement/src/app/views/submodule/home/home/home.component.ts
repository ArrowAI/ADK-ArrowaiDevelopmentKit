import { Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../../../../src/app/core/reducers';
import { currentUser, Login } from './../../../../../..//src/app/core/auth';
import { environment } from './../../../../../..//src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { SubheaderService } from './../../../../../..//src/app/core/_base/layout';
import { HeaderService } from './../../../../../../src/app/core/_base/layout/services/header-service';
import { CommonService } from './../../../../../../src/app/core/common/common.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'kt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  user: any;
  constructor(
    private store: Store<AppState>,
    private subheaderService: SubheaderService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private domSanatizer: DomSanitizer) {
  }
  content;
  component: any
  customevent = new EventEmitter();
  applicationid;
  componentName;
  allElements = [];
  installedModule = [];
  selectedTab = '/'
  ngOnInit() {
    this.commonService.getElementList().subscribe(elements => {
      this.allElements = elements.data;
      this.route.queryParams
        .subscribe(
          (params: Params) => {
            let moduleName = params['moduleName'];
            this.commonService.getElementDetail(moduleName).subscribe(response => {
              let data = response.data;
              this.loadScript(data.url);
              this.store.pipe(select(currentUser)).subscribe(user => {
                this.user = user;
                this.applicationid = user['activeApplication']['_id'];
                if (!!user) {
                  let self = this;
                  this.componentName = data.componentName;
                  let element = `<${data.componentName} ['applicationid']="${user['activeApplication']['_id']}" ['selected_tab_url']="/" (elementEvent)="elementEvent($event)"></${data.componentName}>`
                  console.log(element);
                  this.content = this.domSanatizer.bypassSecurityTrustHtml(element);
                  this.cdr.detectChanges();
                  // setTimeout(function () {
                  this.component = document.querySelector(data.componentName);
                  this.component["applicationid"] = user['activeApplication']['_id'];
                  this.component["selected_tab_url"] = '/';

                  this.component.addEventListener('elementevent', function (event) {
                    console.log(event);
                    self.elementEvent(event)
                  });
                  this.cdr.detectChanges();
                  // }, 2000)
                } else {
                  const userToken = localStorage.getItem(environment.authTokenKey);
                  this.store.dispatch(new Login({ authToken: userToken }));
                }
              });
            })
          }
        );

      this.headerService.selectTab$.subscribe((selectedTab => {
        this.changeRoute(selectedTab.url);
      }))
    })

    // this.touch.emit({ success: true });
  }
  event() {


  }
  elementEvent(eventDetail: any) {
    console.log(eventDetail);
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
      case 'getInstalledModule':
        this.getInstalledModule(event.data)

    }

  }
  getInstalledModule(event) {
    let modules = []
    this.installedModule = this.user['activeApplication']['installedModules'].filter(module => module.type == event.type);
    this.allElements.forEach(module => {
      this.installedModule.forEach(installed => {
        if (installed._id)
          if (module._id == installed._id) {
            modules.push(module)
          }
      });

    })
    window.dispatchEvent(new CustomEvent("customEvent", {
      detail: {
        type: "installedModules",
        installedModules: modules
      }
    }));
  }
  public loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  changeRoute(route) {
    try {
      this.selectedTab = route;
      this.component = document.querySelector(this.componentName);
      this.component['selected_tab_url'] = route;
      this.cdr.detectChanges();
    } catch (error) {

    }


  }
  valueChanged(e) {
    alert();
  }
  ngAfterViewInit() {

  }

}
