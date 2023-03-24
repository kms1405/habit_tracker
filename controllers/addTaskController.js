const Task = require('../models/tasks')

module.exports.addTaskForm = function (req,res) {
    return res.render("add_task");

};


module.exports.createTask = function (req,res) {
    console.log(req.body)
    const NewTask = new Task({
        name: req.body.name,
        comment:req.body.comment,
        day_of_week:req.body.day_of_week,
        status:req.body.status,
        time:req.body.time,

    });

     NewTask.save().then(()=>{
        res.end("secrets");
    }).catch((err)=>{
        console.log(err);
    })


};


