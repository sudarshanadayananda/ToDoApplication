import express from 'express';
import TaskController from '../controllers/task.controller';

export const taskRouter = express.Router();

taskRouter.route('/')
    .get(TaskController.getTasks);

taskRouter.route('/')
    .post(TaskController.createTask);

taskRouter.route('/')
    .put(TaskController.updateTask);

taskRouter.route('/many')
    .put(TaskController.updateTasks);