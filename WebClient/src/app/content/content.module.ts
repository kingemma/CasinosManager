import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { ContentRoutingModule } from './/content-routing.module';

import { DashboardComponent } from './demo/dashboard/dashboard.component';
import { StudentComponent } from './demo/student/student.component';
import { StudentEditComponent } from './demo/student/student-edit/student-edit.component';
import { EchartComponent } from './demo/echart/echart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    ContentRoutingModule
  ],
  declarations: [
    DashboardComponent,
    StudentComponent,
    StudentEditComponent,
    EchartComponent
  ]
})
export class ContentModule { }
