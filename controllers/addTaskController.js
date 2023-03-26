const Task = require('../models/tasks')

module.exports.addTaskForm = function (req, res) {
    return res.render("add_task",{success_msg:false});

};


module.exports.createTask = function (req, res) {
    const NewTask = new Task({
        name: req.body.name,
        comment: req.body.comment,
        day_of_week: req.body.day_of_week,
        status: req.body.status,
        time: req.body.time,

    });

    NewTask.save().then(() => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    })


};

module.exports.UpdateTask = async function (req, res) {
    params = Object.keys(req.body)
    console.log(req);
    if (params.length < 2) {

        return res.redirect("back")
    } else {
        if (params.includes("mark_done")) {
            for (value in params) {
                if (params[value] != "mark_done") {
                    const findResult = await Task.findOneAndUpdate({ _id: params[value] }, { status: "Done" },{new:true});
                }

            }

        } else if (params.includes("mark_not_done")) {
            for (value in params) {
                if (params[value] != "mark_not_done") {
                    const findResult = await Task.findOneAndUpdate({ _id: params[value] }, { status: "Not Done" },{new:true});

                }
            }
        } else {
            for (value in params) {
                if (params[value] != "none") {
                    const findResult = await Task.findOneAndUpdate({ _id: params[value] }, { status: "none" },{new:true});

                }
            }

        }

        return res.redirect("back");

    }


};