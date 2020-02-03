import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
   url = environment.baseUrl;
  
  constructor(private http:HttpClient) { }
    get_academic_years():Observable<any>{
      let URL = `${this.url}getAcademicYears`
      return this.http.get(URL)
    }
   }

