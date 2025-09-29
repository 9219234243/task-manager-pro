import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { FetchedTask, TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TODOS: Todo[] = [
  { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
  { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
  { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
  { userId: 1, id: 4, title: 'et porro tempora', completed: true }
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit,AfterViewInit {
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

        this.loading=true;
        this.taskService.getFetchedTasks().subscribe({next:
          (data) => {
          this.fetchedTasks = data.slice(0, 10);
          this.loading=false;
          },error: (err=>{
              this.loading=false;
               this.errorMessage = 'Failed to fetch tasks. Please try again later.';
              console.error('API Error:', err);
          }),
          complete() {
            console.log("Data fetched successfully.");
          },
        });
        
  }

  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];
  dataSource = new MatTableDataSource<FetchedTask>(TODOS);
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Customize filter to handle boolean and string fields
    this.dataSource.filterPredicate = (data: Todo, filter: string) => {
      const dataStr =
        data.userId +
        ' ' +
        data.id +
        ' ' +
        data.title.toLowerCase() +
        ' ' +
        (data.completed ? 'completed' : 'not completed');
      return dataStr.indexOf(filter) !== -1;
    };
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
