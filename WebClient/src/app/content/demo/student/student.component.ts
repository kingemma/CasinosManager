import { Component, OnInit, ViewChild } from '@angular/core';
import { MockDataService, Student, StudentQueryInput, PagedInput } from '../../../shared/service-proxy/mockdata.service'
import { StudentEditComponent } from './student-edit/student-edit.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  loading: boolean = false;
  start: number = 1;

  pagedInput: PagedInput = new PagedInput();
  queryInput: StudentQueryInput = new StudentQueryInput();
  @ViewChild('studentEditModal') studentEditModal: StudentEditComponent;

  constructor(private service: MockDataService) {

  }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false): void {

    if (reset) {
      this.queryInput.page = 1;
    }
    this.loading = true;
    this.queryInput.page = this.pagedInput.page;
    this.queryInput.pageSize = this.pagedInput.pageSize;
    this.service.getPagedList(this.queryInput)
      .subscribe(result => {
        this.loading = false;
        this.start = (this.pagedInput.page - 1) * this.pagedInput.pageSize + 1;
        this.students = result.data;
        this.pagedInput.total = result.total;
        console.log(this.pagedInput.total);
      })
  }

  resetForm():void{
    this.queryInput.name = "";
    this.queryInput.createFrom = null;
    this.queryInput.createTo = null;
  }

  add(): void {
    this.studentEditModal.show();
  }

  edit(student): void {
    this.studentEditModal.show(student);
  }
}
