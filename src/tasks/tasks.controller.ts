import { Controller, Delete, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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

    /*
    @Body(key?: string)
    req.body / req.body[key]
    */
    @Post()
    postTask(@Req() request: Request, @Res() response: Response, title: string, description: string, status: TaskStatus): Response {
        const task: Task = {
            id: v4(),
            title: request.body.title,
            description: request.body.description,
            status: request.body.status
        };
        return this.tasksService.postTask(task) ? response.status(201).json({ok: true}) : response.status(200).json({ok: false});
    }

    @Patch()
    updateTask(title: string, description: string, status: TaskStatus): Task {
        return ;
    }

    @Delete()
    deleteTask(): boolean {
        return true;
    }
}
