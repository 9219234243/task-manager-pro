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
  loading:boolean=false;
  constructor(private activatedRoute :ActivatedRoute, private taskService : TaskService) { }

  ngOnInit(): void {
    this.loading=true;
    this.taskId=this.activatedRoute.snapshot.paramMap.get('id');
    //this.task=this.taskService.getFetchedTasks().find(x=> x.id==this.taskId)
    this.taskService.getTasks().subscribe(data => {
           this.task = data.find(x=>x.id==this.taskId) 
         });
    this.loading=false;
  }

back(){
    this.taskService.goBack();
  }

getStatusClass(status: string): string {
  return 'status-' + status.toLowerCase().replace(/\s+/g, '-');
}


}
