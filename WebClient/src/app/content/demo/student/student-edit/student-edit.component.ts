import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { MockDataService, Student, StudentQueryInput, PagedInput } from '../../../../shared/service-proxy/mockdata.service'

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  isModalVisible: boolean = false;
  validateForm: FormGroup;
  studentModel: Student;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private service: MockDataService,
    private modalService: NzModalService
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      sex: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  show(student: Student = new Student()): void {
    this.studentModel = student;
    this.isModalVisible = true;
  }

  submitForm = ($event, value) => {
    this.service.addStudent(this.studentModel)
      .subscribe((result) => {
        if (result.success) {
          this.modalService.success({
            nzTitle: 'This is a success message',
            nzOnOk: () => this.modalSave.emit(null),
          });
        } else {
          this.modalService.error({
            nzTitle: '保存成功',
            nzContent: result.message
          });
        }
      });
  };

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isModalVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isModalVisible = false;
  }
}
