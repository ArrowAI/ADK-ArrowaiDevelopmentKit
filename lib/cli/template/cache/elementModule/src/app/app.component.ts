import { Component, OnInit,EventEmitter, OnChanges, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges {

  constructor(private router:Router) { }

  tabs = [{
    name: "Employee",
    url: "employee",
    baseRoute: "employee"
  }]

  @Input('applicationid') applicationid: string; // decorate the property with @Input();
  @Input('selected_tab_url') selected_tab_url: string; // decorate the property with @Input()
  @Output('elementEvent') elementEvent = new EventEmitter();
  ngOnInit() {
    console.log("applicationId", this.applicationid);
    console.log('activeUrl',this.selected_tab_url);
    localStorage.setItem("appid",this.applicationid)
    this.setHeaderTabs();
    this.setTitle();
    this.setBreadcrumbs();
    this.setActiveTab();
   
    this.router.initialNavigation(); 
  }
  setHeaderTabs() {
    let event = {
      method: 'setHeaderTabs',
      data: {
        tabs: this.tabs
      }
    }
    this.sendEvent(event);
  }
  setBreadcrumbs() {
    let event = {
      method: 'setBreadcrumbs',
      data: {
        breadcrumbs: [
          { title: 'Employee', page: `/employee` },
         // { title: 'Title 2', page: `/url` },
        ]
      }
    }
    this.sendEvent(event);

  }
  setActiveTab() {
    let event = {
      method: 'setActiveTab',
      data: {
        activeTab: 1
      }
    }
    this.sendEvent(event);
  }
  setTitle() {
    let event = {
      method: 'setTitle',
      data: {
        title: "Employees"
      }
    }
    this.sendEvent(event);
  }


  
  sendEvent(event) {
    /**
     * {event}= {
     * "method":'setHeaderTabs' || 'setTitle'
     * }
     */
    this.elementEvent.emit(event);
  }
  ngOnChanges() {
    console.log(this.applicationid);
    console.log(this.selected_tab_url);
  }

 
}


 

