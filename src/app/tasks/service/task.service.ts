import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

export interface FetchedTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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
        id:2,title:"Basic Hands on Angular",description:"Make you learn create basic angular project.",status:"Completed"
    }
    ,
    {
        id:3,title:"Learn Angular forms and routing",description:"You will be able to make forms and routing.",status:"Pending"
    }
  ]

  getTasks(){
    return this.tasks;
    //return [];
  }

  addTask(task: {id:number, title: string; description: string; status: string }) {
    this.tasks.push(task);
  }

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient,private location : Location) {}

  getFetchedTasks(): Observable<FetchedTask[]> {
    return this.http.get<FetchedTask[]>(this.apiUrl);
  }


goBack(){
this.location.back();
}

  
}