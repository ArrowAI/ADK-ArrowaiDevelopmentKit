import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService } from '../../auth/_services/auth.service'
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';

// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
private headers
  constructor(private http: HttpClient,private httpUtils: HttpUtilsService) { 
    this.headers=AuthService.dreamheader();
  }

  public getEventList<T>(): Observable<T> {
    return this.http.get<T>('https://api.arrowai.in/api/v2/chat_developer/_table/applications_key?filter=(app_id%3D%2258906f07faad6f52008b456a%22)&limit=1&order=create_date%20desc',{headers:this.headers})
  }
}
