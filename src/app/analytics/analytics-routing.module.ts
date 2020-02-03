import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { Statement2Component } from './statement2/statement2.component';


const routes: Routes = [
{
  path:'',
  redirectTo:'/analytics',
  pathMatch:'full'
},
{
  path:'',
  component:AnalyticsComponent,
  children:[
    {
      path:'statement2',
      component:Statement2Component
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
