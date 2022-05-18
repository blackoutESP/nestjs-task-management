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
    postTask(@Req() request: Request, @Res() response: Response, @Body() body: Task): Response {
        const serviceResponse = this.tasksService.post(body);
        const errorMessage = serviceResponse === null ? 'Task already exists...': '';
        return serviceResponse !== null ? 
                response.status(201).json({ok: true, data: [serviceResponse], error: []}) : 
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }

    @Patch('/:id')
    updateTask(@Req() request: Request, @Res() response: Response, @Body() body: Task): Response<Task> {
        const serviceResponse = this.tasksService.patch(body);
        const errorMessage = serviceResponse === null ? 'Entity equal to request.body, not updated.': '';
        return serviceResponse !== null ? 
                response.status(200).json({ok: true, data: [serviceResponse], error: []}) : 
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }

    @Delete('/:id')
    deleteTask(@Req() request: Request, @Res() response: Response): Response {
        const serviceResponse = this.tasksService.delete(request.params.id);
        const errorMessage = serviceResponse === false ? 'Entity not deleted.': '';
        return serviceResponse !== false ? 
                response.status(200).json({ok: true, data: [serviceResponse], error: []}) :
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }
}
