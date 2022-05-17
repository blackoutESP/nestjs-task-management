import { Controller, Get, Post, Response } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { TasksService } from './tasks.service';
import { v4 } from 'uuid';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Post()
    postTask(title: string, description: string): Task {
        let taskId = 0;
        console.log(title);
        console.log(description);
        const task: Task = {
            id: v4(),
            title: title,
            description: description,
            status: TaskStatus.IN_PROGRESS
        };
        return this.tasksService.postTask(task);
    }
}
