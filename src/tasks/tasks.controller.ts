import { Body, Controller, Delete, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Task, TaskStatus } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    @Get()
    getTasks(@Res() response: Response): any {
        const tasks = this.tasksService.get();
        return response.status(200).json({ok: true, data: [tasks]});
    }

    /*
    @Body(key?: string)
    req.body / req.body[key]
    */
    @Post()
    postTask(@Req() request: Request, @Res() response: Response, @Body() body): Response {
        const serviceResponse = this.tasksService.post(body);
        const errorMessage = serviceResponse === null ? 'Task already exists...': '';
        return serviceResponse !== null ? 
                response.status(201).json({ok: true, data: [serviceResponse]}) : 
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }

    @Patch('/:id')
    updateTask(@Res() response: Response, @Body() body): Response<Task> {
        const serviceResponse = this.tasksService.patch(body);
        const errorMessage = serviceResponse === null ? 'HTTP Patch Error.': '';
        return serviceResponse !== null ? 
                response.status(200).json({ok: true, data: [serviceResponse], error: []}) : 
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }

    @Delete()
    deleteTask(): boolean {
        return true;
    }
}
