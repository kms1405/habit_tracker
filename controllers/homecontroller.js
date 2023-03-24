const Task = require("../models/tasks");


homeController = async function (req,res) {

    const findResult = await Task.find({
        createdAt: {
          $gte: new Date(new Date().setHours(00, 00, 00)),
          $lt: new Date(new Date().setHours(23, 59, 59)),
        },
      });


    return res.render("home",{
        heading:"Today works",
        posts:findResult
    })

}

module.exports = homeController;