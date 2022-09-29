import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository, UpdateEvent, UpdateResult } from 'typeorm';
import { Task } from './task';

@Injectable()
export class TaskService {

	// tasks: Task[] = [
	// 	{ id: 1, description: 'Tarefa 1', completed: false },
	// 	{ id: 2, description: 'Tarefa 2', completed: false },
	// 	{ id: 3, description: 'Tarefa 3', completed: false },
	// 	{ id: 4, description: 'Tarefa 4', completed: false },
	// 	{ id: 5, description: 'Tarefa 5', completed: false },
	// 	{ id: 6, description: 'Tarefa 6', completed: false },
	// 	{ id: 7, description: 'Tarefa 7', completed: false },
	// 	{ id: 8, description: 'Tarefa 8', completed: false },
	// 	{ id: 9, description: 'Tarefa 9', completed: false },
	// 	{ id: 10, description: 'Tarefa 10', completed: false },
	// ];

	constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>,
	) { }


	// getAll() {
	// 	return this.tasks;
	// }
	findAll(): Promise<Task[]> {
		return this.taskRepository.find();
	}

	// getById(id: number) {
	// 	const task = this.tasks.find((value) => value.id == id);
	// 	return task;
	// }
	findOne(id: number): Promise<Task> {
		return this.taskRepository.findOneBy({ id });
	}


	// create(task: Task) {
	// 	let lastId = 0;
	// 	if (this.tasks.length > 0) {
	// 		lastId = this.tasks[this.tasks.length - 1].id;
	// 	}
	// 	task.id = lastId + 1;
	// 	this.tasks.push(task);

	// 	return task;
	// }
	createTask(task: Task): Promise<Task> {
		return this.taskRepository.save(task);
	}


	// update(task: Task) {
	// 	const taskArray = this.getById(task.id);

	// 	if (taskArray) {
	// 		taskArray.description = task.description;
	// 		taskArray.completed = task.completed;
	// 	}

	// 	return taskArray;
	// }

	update(task: Task) {
		this.taskRepository
			.createQueryBuilder()
			.update(Task)
			.set({ description: task.description, completed: task.completed })
			.where("id = :id", { id: task.id })
			.execute()

		//return task;
	}
	1
	// delete(id: number) {
	// 	const index = this.tasks.findIndex((value) => value.id == id);
	// 	this.tasks.splice(index, 1);
	// }
	async remove(id: number): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
