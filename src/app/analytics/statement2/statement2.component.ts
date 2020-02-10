import { Component, OnInit, ɵConsole } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-statement2',
  templateUrl: './statement2.component.html',
  styleUrls: ['./statement2.component.css'],
})
export class Statement2Component implements OnInit {
  columnChart:GoogleChartInterface
  column:GoogleChartInterface
  a:String[] = []
  semester:String[] = []
  event;
  email:any;
  user:any;
  usn;
  title;
  SelectedYear;
  SelectedSem;
  attendance:String[]=[]
  attendancedetails:String[] =[]
  internalDetails:String[] = []
  UE;
  course;
  courseAttendance:String[] = []
  present;
  total;
  u;
  eid;
  deptName;
  facultyattend:String[] =[]
  faculty:String[]=[]
  result:String[] = []
  fname;
  empId;
  facultyatt:String[] = []
  facultyUE:String[] =[]
  constructor(private analysis:AnalyticsService) { }
  ngOnInit() {
    this.analysis.get_academic_years().subscribe(res=>{
      this.a = res['academicyear'];
    })
    this.email = localStorage.getItem("user")
    this.user = JSON.parse(this.email)
    this.u = this.user['roles']
    console.log(this.u)
    this.analysis.getSemester().subscribe(res=>{
      this.semester = res['semester']
    })


    if(this.u == 'STUDENT'){
    this.analysis.getUsnByEmail(this.user["user"]).subscribe(res=>{
      this.usn = res["usn"]
    })
  }


  if(this.u.includes('FACULTY')){
    this.analysis.getFacultyId(this.user["user"]).subscribe(res=>{
      this.eid = res["res"]
    })
  }
}

  search(){
    if(this.u.includes('STUDENT')){
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
      this.showColumnChart(data)

        
      }, 5000)

    }



    if(this.u[2] == "HOD") {
    let patt = new RegExp("[a-zA-z]*");
    let res = patt.exec(this.eid);
    this.deptName =res[0];
    this.analysis.get_dept_faculty(this.deptName).subscribe(res => {
      this.faculty = res['res']
    })
    }
    if(this.u.includes("FACULTY") && this.u.includes('HOD') == false){
      console.log("hello")
      let data = []
      this.analysis.getFacultyAttendance(this.eid,this.SelectedYear,this.SelectedSem).subscribe(res=>{
        this.facultyattend = res["res"]
      })
      this.analysis.getFacultyUE(this.eid,this.SelectedYear,this.SelectedSem).subscribe(res=>{
        this.facultyUE = res['res']
      })
      console.log(this.facultyattend)
      setTimeout(()=>{
        data.push(["Course","Attendance","UE"])
        for(let attend of this.facultyattend){
          data.push([attend["course"],attend["avg"]])
        }
        let i =1
        for(let s of this.facultyUE){
          data[i][2] = s['Avg']
          i++
        }
      this.showColumnChart1(data)
      }, 5000)
    }
  }
  onChartSelect(event:ChartSelectEvent){
     this.UE = event.selectedRowFormattedValues[2]
    this.course = event.selectedRowFormattedValues[0]
    this.analysis.getCourseAttendance(this.course,this.usn).subscribe(res=>{
      this.courseAttendance = res["res"]
    })
    this.present = this.courseAttendance["present"]
    this.total = this.courseAttendance["total"]
  }
  showColumnChart(data){
    this.title = 'Course-wise Attendance %',
    this.columnChart={
      chartType:"ColumnChart",
      dataTable:data,
      options: {
        bar: { groupWidth: "20%" },
        vAxis: {
          title: "Percentage",
        },

        height: 800,
        hAxis: {
          title: "Courses",
          titleTextStyle: {
          }
        },
        chartArea: {
          left: 80,
          right: 100,
          top: 100,
        },
        legend: {
          position: "top",
          alignment: "end"
        },
        seriesType: "bars",
        colors: ["#d3ad5d", "#789d96"],
        fontName: "Times New Roman",
        fontSize: 13,

      }
    }
  }


  showColumnChart1(data){
    this.title = 'Course-wise Attendance %',
    this.column={
      chartType:"ColumnChart",
      dataTable:data,
      options: {
        bar: { groupWidth: "20%" },
        vAxis: {
          title: "Percentage",
        },

        height: 800,
        hAxis: {
          title: "Courses",
          titleTextStyle: {
          }
        },
        chartArea: {
          left: 80,
          right: 100,
          top: 100,
        },
        legend: {
          position: "top",
          alignment: "end"
        },
        seriesType: "bars",
        colors: ["#d3ad5d", "#789d96"],
        fontName: "Times New Roman",
        fontSize: 13,

      }
    }
  }
  getAttendanceGraph(eptId){
    let data1 = []
      this.analysis.getFacultyAttendance(eptId,this.SelectedYear,this.SelectedSem).subscribe(res=>{
        this.facultyatt = res["res"]
      })
      setTimeout(()=>{
        data1.push(["Course","Attendance"])
        for(let attend of this.facultyatt){
          data1.push([attend["course"],attend["avg"]])
        }
      this.showColumnChart1(data1)
      }, 5000)

  }
}
