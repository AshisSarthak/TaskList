let mongoose = require('mongoose');
let taskSchema = new mongoose.Schema({
    name: String,
    desc: String,
    status: Number
});
module.exports = mongoose.model('TaskModel', taskSchema);