const mongoose = require("../database/index");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    limitDate: {
      type: Date,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const Tasks = mongoose.model('Tasks', TaskSchema);

module.exports = Tasks;