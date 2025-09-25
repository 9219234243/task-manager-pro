import { Component, OnInit } from '@angular/core';
import { FetchedTask, TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks :{id:number,title:string,description:string,status:string}[]=[];
  //fetchedTasks:{userId: number;id: number;title: string;completed: boolean;}[]=[];
    fetchedTasks: FetchedTask[] = [];

  loading:boolean=false;
  errorMessage:string="";

  constructor(private taskService :TaskService,private route : Router,private activatedRoute : ActivatedRoute) { }

  /*tasks=[
    {
        title:"Learn Angular basic",description:"Helps to get basic understanding of Angular like component and rendering."
    },
    {
        title:"Basic Hands on Angular",description:"Make you learn create basic angular project."
    }
    ,
    {
        title:"Learn Angular forms and routing",description:"You will be able to make forms and routing."
    }
  ];*/

  

  ngOnInit(): void {
    //this.tasks=this.taskService.tasks;
    this.tasks=this.taskService.getTasks();

          // Fetch from API (first 10)
        // this.taskService.getFetchedTasks().subscribe(data => {
        //   this.fetchedTasks = data.slice(0, 10); // Save fetched tasks
        // });

        // this.loading=true;
        // this.taskService.getFetchedTasks().subscribe({next:
        //   (data) => {
        //   this.fetchedTasks = data.slice(0, 10);
        //   this.loading=false;
        //   },error: (err=>{
        //       this.loading=false;
        //        this.errorMessage = 'Failed to fetch tasks. Please try again later.';
        //       console.error('API Error:', err);
        //   }),
        //   complete() {
        //     console.log("Data fetched successfully.");
        //   },
        // });
        
  }

}
