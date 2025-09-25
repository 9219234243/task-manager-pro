import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  taskId:any;
  task:any;
  constructor(private activatedRoute :ActivatedRoute, private taskService : TaskService) { }

  ngOnInit(): void {
    this.taskId=this.activatedRoute.snapshot.paramMap.get('id');
    this.task=this.taskService.getTasks().find(x=> x.id==this.taskId)
  }

}
