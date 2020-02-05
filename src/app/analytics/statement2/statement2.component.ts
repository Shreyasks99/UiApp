import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-statement2',
  templateUrl: './statement2.component.html',
  styleUrls: ['./statement2.component.css']
})
export class Statement2Component implements OnInit {
  columnChart:GoogleChartInterface
  a:String[] = []
  semester:String[] = []
  event;
  email:any;
  user:any;
  usn;
  SelectedYear;
  SelectedSem;
  attendance:String[]=[]
  attendancedetails:String[] =[]
  internalDetails:String[] = []
  constructor(private analysis:AnalyticsService) { }
  ngOnInit() {
    this.analysis.get_academic_years().subscribe(res=>{
      this.a = res['academicyear'];
    })
    this.email = localStorage.getItem("user")
    this.user = JSON.parse(this.email)
    console.log(this.SelectedSem)
    this.analysis.getSemester().subscribe(res=>{
      this.semester = res['semester']
    })

    this.analysis.getUsnByEmail(this.user["user"]).subscribe(res=>{
      this.usn = res["usn"]
    })

  }
  search(){
    let data = []
    this.analysis.getStudentAttendance(this.usn,this.SelectedYear,this.SelectedSem).subscribe(res=>{
      this.attendancedetails = res["res"]
    })
    this.analysis.getStudentInternal(this.usn,this.SelectedYear,this.SelectedSem).subscribe(res=>{
      this.internalDetails = res["res"]})

      setTimeout(()=>{

        data.push(["Subject","Attendance","Marks"])

        for(let attend of this.attendancedetails){
          data.push([attend["courseName"],attend["perc"]])
        }
    
      
        let i =1
        for(let s of this.internalDetails){
          data[i][2] = s['perc']
          i++
        }
        console.log(data)
      this.showColumnChart(data)

        
      }, 5000)

      
  }
  showColumnChart(data){
    this.columnChart={
      chartType:"ColumnChart",
      dataTable:data,
      options:{
        title:'Attendance',
        width:1600,
        height:1000
      }
    }
  }
}
