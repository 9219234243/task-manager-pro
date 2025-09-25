import { Component } from '@angular/core';
import { TaskService } from './tasks/service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TaskService]
})
export class AppComponent {
  title = 'task-manager-pro';
}
