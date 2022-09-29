import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';
import { TasksController } from './tasks.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Task])],
	controllers: [TasksController],
	providers: [TaskService]

})
export class TasksModule { }
