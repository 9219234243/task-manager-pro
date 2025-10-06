import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private taskService :TaskService) { }
  title!: string;
  description!:string;
  status!:string;

  statuses:string[]=[];

  @ViewChild('myForm') form! : NgForm;

  ngOnInit(): void {
        this.statuses=this.taskService.statuses;
  }

  onSubmit(){
     this.title=this.form.value.title;
    // this.description=this.form.value.description;
     this.status=this.form.value.status;
    console.log(this.title +" :: "+this.description +" :: "+this.status);
    this.taskService.addTask({
          id:Math.random(),
          title: this.title,
          description: this.description,
          status: this.status
    });
    this.form.reset();
  }

  back(){
    this.taskService.goBack();
  }

  isInvalid(field: NgModel): any {
  return field.invalid && (field.touched || field.dirty);
}


}
