import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' }, 
    {path:'tasks',component:TaskListComponent},
    {path:'add-task',component:AddTaskComponent},
    {path:'task-detail/:id',component:TaskDetailComponent},
  { path: '**', redirectTo: 'tasks' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
