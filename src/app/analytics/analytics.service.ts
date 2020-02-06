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

    getSemester():Observable<any>{
      let URL = `${this.url}getSemester`   
      return this.http.get(URL)
     }

     getUsnByEmail(email):Observable<any>{
      let URL = `${this.url}getUsn/${email}`   
      return this.http.get(URL)
     }

     getStudentAttendance(usn,academic,term):Observable<any>{
      let URL = `${this.url}getAttendance/${usn}/${academic}/${term}`  
      console.log(URL) 
      return this.http.get(URL)
     }

     getStudentInternal(usn,academic,term):Observable<any>{
      let URL = `${this.url}getInternal/${usn}/${academic}/${term}`   
      return this.http.get(URL)
     }

     getCourseAttendance(course,usn):Observable<any>{
      let URL = `${this.url}getCourseAttendance/${course}/${usn}`   
      return this.http.get(URL)

     }
   }

