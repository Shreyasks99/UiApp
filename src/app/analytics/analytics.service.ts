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

     getBranch():Observable<any>{
      let URL = `${this.url}getBranch`   
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

     getFacultyId(email):Observable<any>{
      let URL = `${this.url}getFacultyId/${email}`   
      return this.http.get(URL)
     }

     getFacultyAttendance(eid,academic,term):Observable<any>{
      let URL = `${this.url}getFacultyAttendance/${eid}/${academic}/${term}`   
      return this.http.get(URL)
     }

     get_dept_faculty(deptName):Observable<any>{
      let URL = `${this.url}getDeptFaculty/${deptName}`   
      return this.http.get(URL)
     }

     get_id_by_name(name):Observable<any>{
      let URL = `${this.url}getId/${name}`   
      return this.http.get(URL)
     }

     getFacultyUE(eid,academic,term):Observable<any>{
      let URL = `${this.url}getFacultyUE/${eid}/${academic}/${term}`   
      return this.http.get(URL)
     }

     getFacultyName(deptId):Observable<any>{
      let URL = `${this.url}getFacultyNameByDeptId/${deptId}`   
      return this.http.get(URL)

     }
   }

