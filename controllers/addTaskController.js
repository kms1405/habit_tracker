const Task = require('../models/tasks')

module.exports.addTaskForm = function (req, res) {
    return res.render("add_task");

};


module.exports.createTask = function (req, res) {
    console.log(req.body)
    const NewTask = new Task({
        name: req.body.name,
        comment: req.body.comment,
        day_of_week: req.body.day_of_week,
        status: req.body.status,
        time: req.body.time,

    });

    NewTask.save().then(() => {
        res.end("secrets");
    }).catch((err) => {
        console.log(err);
    })


};

module.exports.UpdateTask = async function (req, res) {
    params = Object.keys(req.body)
    
    if (params.length < 2) {

        return res.redirect("/")
    } else {
        if (params.includes("mark_done")) {
            for (value in params) {
                if (params[value] != "mark_done") {
                    console.log("mark done")
                    const findResult = await Task.findOneAndUpdate({ _id: params[value] }, { status: "Done" },{new:true});
                }

            }

        } else {
            for (value in params) {
                if (params[value] != "mark_not_done") {
                    console.log("mark not done")
                    const findResult = await Task.findOneAndUpdate({ _id: params[value] }, { status: "Not Done" },{new:true});

                }
            }
        }

        return res.redirect("/");

    }


};