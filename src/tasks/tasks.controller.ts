import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Controller('tasks')
export class TasksController {

	constructor(private taskService: TaskService) {
	}

	@Get()
	async getAll(): Promise<Task[]> {
		return this.taskService.findAll();
	}

	@Get(':id')
	async getById(@Param('id') id: number): Promise<Task> {
		return this.taskService.findOne(id);
	}

	@Post()
	async create(@Body() task: Task): Promise<Task> {
		return this.taskService.createTask(task);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
		task.id = id;
		this.taskService.update(task);
		return this.taskService.findOne(task.id);
	}

	@Delete(':id')
	async delete(@Param('id') id: number) {
		this.taskService.remove(id);
	}

}
