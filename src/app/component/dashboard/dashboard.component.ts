import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];
  
  editTaskValue : string = '';
  addTaskValue : string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];

    
    this.getAllTask();
    
 
  }

  getAllTask(): void {
    this.crudService.getAllTask().subscribe((data) => {
      this.taskArr = data;
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (_res: Task) =>  {
    this.ngOnInit();
    this.addTaskValue = '';
    },
     error: (err) => {
      console.log(err);

    }
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe((_data) => {
      this.ngOnInit();
    })
  }

  deleteTask(ptask: Task) {
    this.crudService.deleteTask(ptask).subscribe((_data) => {
      this.ngOnInit();
    })
  }

  call(ptask : Task) {
    this.taskObj = ptask;
    this.editTaskValue = ptask.task_name;
  }

}
