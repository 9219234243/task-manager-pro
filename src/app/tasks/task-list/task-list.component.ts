import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchedTask, TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

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
  //@ViewChild('addTaskForm') form! : NgForm;

  ngOnInit(): void {
    
    this.loading=true;
    //this.tasks=this.taskService.tasks;
    this.taskService.getTasks().subscribe(data=>{
          this.tasks=data;
    });

    this.statuses=this.taskService.statuses;

          // Fetch from API (first 10)
        // this.taskService.getFetchedTasks().subscribe(data => {
        //   this.fetchedTasks = data.slice(0, 10); // Save fetched tasks
        // });

        
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

        this.loadTasks();
        this.loading=false;
        
  }

  back(){
    this.taskService.goBack();
  }


  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  statuses:string[]=[];


loadTasks() {
  this.todoTasks = this.tasks.filter(t => t.status === 'TO DO');
  this.inProgressTasks = this.tasks.filter(t => t.status === 'In progress');
  this.completedTasks = this.tasks.filter(t => t.status === 'Completed');
}

drop(event: CdkDragDrop<Task[]>, newStatus: 'TO DO' | 'In progress' | 'Completed') {
  alert("drop  called ");
  if (event.previousContainer === event.container) {
    // Reordering within the same list
    // optional: implement move logic if needed
  } else {
    // Moving between lists
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // Update the status of the moved task
    const movedTask = event.container.data[event.currentIndex];
    movedTask.status = newStatus;
  }
}

 getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(t => t.status === status);
  }



  deleteTask(task: Task) {
    if (confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      this.loading=true;
      this.taskService.deleteTask(task.id);
      this.loading=false;
    }
  }

    newTask: Partial<Task> = {
    id:0,
    title: '',
    description: '',
    status: 'TO DO'
  };

    showAddTaskPopup = false;

    openAddTaskPopup() {
    this.newTask.title="tetscvc";
    this.showAddTaskPopup = true;
    this.resetNewTask();
  }

  closeAddTaskPopup() {
    this.showAddTaskPopup = false;
  }

  resetNewTask() {
    this.newTask = {
      title: '',
      description: '',
      status: 'TO DO'
    };
  }
  isEdit=false;

  submit() {
    let taskId=this.newTask.id;
    if(!this.isEdit){
      taskId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id))+1 : 0;
    }
    const taskToAdd: Task = {
      id: taskId!,
      title: this.newTask.title!.trim(),
      description: this.newTask.description!.trim(),
      status: this.newTask.status!
    };
    
    if(this.isEdit){
      this.taskService.editTask(taskToAdd);
      this.isEdit=false;
    }else{
      this.taskService.addTask(taskToAdd);
    }
    this.resetNewTask();
    this.closeAddTaskPopup();
  }

  
  
  editTask(task: Task) {
    this.isEdit=true;
    //alert(`Editing task: ${task.title}`);
    this.newTask.id=task.id;
    this.newTask.title=task.title;
    this.newTask.description=task.description;
    this.newTask.status=task.status;
    this.showAddTaskPopup = true;
  }


  description!:string;
  title!:string;
  status!:string;

    

}
