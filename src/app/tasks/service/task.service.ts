import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

export interface FetchedTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Initial static tasks
  private _tasks: Task[] = [
    {
      id: 1, title: "Learn Angular basic", description: "Helps to get basic understanding of Angular like component and rendering.", status: "Completed"
    },
    {
      id: 2, title: "Basic Hands on Angular", description: "Make you learn create basic angular project.", status: "Completed"
    },
    {
      id: 3, title: "Learn Angular forms and routing", description: "You will be able to make forms and routing.", status: "Pending"
    }
  ];

  // BehaviorSubject to hold current tasks state
  private tasksSubject = new BehaviorSubject<Task[]>(this._tasks);

  // Observable for components to subscribe
  tasks$ = this.tasksSubject.asObservable();

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient, private location: Location) {}

  getTasks(): Task[] {
    return this._tasks;
  }

  // Add task and emit updated list
  addTask(task: Task): void {
    this._tasks.push(task);
    this.tasksSubject.next(this._tasks);  // Emit the updated tasks list
  }

  getFetchedTasks(): Observable<FetchedTask[]> {
    return this.http.get<FetchedTask[]>(this.apiUrl);
  }

  goBack(): void {
    this.location.back();
  }
}
