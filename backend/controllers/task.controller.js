import Task from '../models/task.model';
import Config from '../helpers/config'

export default {

    // Create a task.
    async createTask(req, res) {

        try {
            const task = await Task.create(req.body);
            return res.send({ status: Config.STATUS_CODE.SUCCESS, data: task });
        } catch (error) {

            return res.status(500).send(error);
        }
    },
    // Get all tasks.
    async getTasks(req, res) {
        try {
            const task = await Task.find();
            return res.send({ status: Config.STATUS_CODE.SUCCESS, data: task });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    // Update a task.
    async updateTask(req, res) {

        const id = req.body.id;
        const status = req.body.status;

        try {
            const task = await Task.findOneAndUpdate({ _id: id }, { status: status }, { new: true });
            return res.send({ status: Config.STATUS_CODE.SUCCESS, data: task });
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    // Update multiple documents.
    async updateTasks(req, res) {

        const currentStatus = req.body.currentStatus;
        const newStatus = req.body.newStatus;
        try {
            const tasks = await Task.updateMany({ status: currentStatus }, { status: newStatus });
            return res.send({ status: Config.STATUS_CODE.SUCCESS, data: tasks });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}