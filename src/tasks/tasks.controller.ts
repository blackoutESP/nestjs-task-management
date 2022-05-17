import { Body, Controller, Delete, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Task, TaskStatus } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    @Get()
    getAllTasks(@Res() response: Response): any {
        const tasks = this.tasksService.getAllTasks();
        return response.status(200).json({ok: true, data: [tasks]});
    }

    /*
    @Body(key?: string)
    req.body / req.body[key]
    */
    @Post()
    postTask(@Req() request: Request, @Res() response: Response, @Body() body): Response {
        const serviceResponse = this.tasksService.postTask(body);
        const errorMessage = serviceResponse === null ? 'Task already exists...': '';
        return serviceResponse !== null ? response.status(201).json({ok: true, data: [serviceResponse]}) : response.status(200).json({ok: false, data: [], error: [errorMessage]});
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
