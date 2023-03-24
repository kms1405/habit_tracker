const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    comment: {
        type:String,
        required:true
    },
    day_of_week: {
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

taskSchema.index( { "name": 1, "day_of_week": 1 }, { unique: true } )
const Task = mongoose.model("Task",taskSchema);

module.exports = Task;