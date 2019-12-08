import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

export default mongoose.model('Task', TaskSchema);