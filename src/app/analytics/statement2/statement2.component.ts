import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-statement2',
  templateUrl: './statement2.component.html',
  styleUrls: ['./statement2.component.css']
})
export class Statement2Component implements OnInit {
  a:String[] = []
  constructor(private analysis:AnalyticsService) { }

  ngOnInit() {
    this.analysis.get_academic_years().subscribe(res=>{
      this.a = res[]
    })

  }

}
