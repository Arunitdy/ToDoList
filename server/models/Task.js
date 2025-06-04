const mongoose = require('mongoose');



const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
