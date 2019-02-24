import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRouteGuard } from '../shared/auth/auth-route-guard';

import { DashboardComponent } from './demo/dashboard/dashboard.component';
import { StudentComponent } from './demo/student/student.component';
import { EchartComponent } from './demo/echart/echart.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AppRouteGuard]  },
  { path: 'student', component: StudentComponent, canActivate: [AppRouteGuard] },
  { path: 'echart', component: EchartComponent, canActivate: [AppRouteGuard] },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
