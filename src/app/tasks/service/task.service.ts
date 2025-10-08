import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface FetchedTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

enum TaskStatus {
  ToDo = 'TO DO',
  InProgress = 'In progress',
  Completed = 'Completed'
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}


@Injectable({
  providedIn: 'root'
})

export class TaskService{
    tasks=[
    {
        id:1,title:"Learn Angular basic",description:"Helps to get basic understanding of Angular like component and rendering.",status:"Completed"
    },
    {
        id:2,title:"Basic Hands on Angular",description:"Make you learn create basic angular project.",status:"To Do"
    }
    ,
    {
        id:3,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"In Progress"
    },
    {
        id:4,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"In Progress"
    },{
        id:5,title:"Learn Angular basic",description:"Helps to get basic understanding of Angular like component and rendering.",status:"Completed"
    },
    {
        id:6,title:"Basic Hands on Angular",description:"Make you learn create basic angular project.",status:"To Do"
    }
    ,
    {
        id:7,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"In Progress"
    },
    {
        id:8,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"In Progress"
    },
    {
        id:9,title:"Learn Angular basic",description:"Helps to get basic understanding of Angular like component and rendering.",status:"Completed"
    },
    {
        id:10,title:"Basic Hands on Angular",description:"Make you learn create basic angular project.",status:"To Do"
    }
    ,
    {
        id:11,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"In Progress"
    },
    {
        id:12,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"In Progress"
    }
  ]

  
  getTasks(): Observable<Task[]> {
  return this.tasks$;
  }

  statuses:string[]=[
    "To Do","In Progress","Completed"
  ];



  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient,private location : Location) {}

  getFetchedTasks(): Observable<FetchedTask[]> {
    return this.http.get<FetchedTask[]>(this.apiUrl);
  }


goBack(){
this.location.back();
} 

// Observable state so that any value changes in task json will reflect to all component
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

addTask(task: Task) {
  console.log('Before Add:', this.tasks.length);
  this.tasks.push(task);
  console.log('After Add:', this.tasks.length);
  this.tasksSubject.next([...this.tasks]);
}



deleteTask(taskId:number){
  this.tasks=this.tasks.filter(x=>x.id!==taskId);
  this.tasksSubject.next([...this.tasks]);
}

editTask(updatedTask: Task) {
  const index = this.tasks.findIndex(t => t.id === updatedTask.id);
  console.log("Index  ::  "+index)
  if (index !== -1) {
    this.tasks[index] = { ...updatedTask }; // Replace old task with updated
    this.tasksSubject.next([...this.tasks]); // Notify all subscribers
  }
}


}