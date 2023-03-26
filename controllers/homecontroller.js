const Task = require("../models/tasks");


homeController = async function (req, res) {
  day = req.query.day_of_week || 0

  date = new Date()
  date.setDate(new Date().getDate() - day)

  const findResult = await Task.find({
    date: {
      $gte: new Date(new Date(date).setHours(00, 00, 00)),
      $lt: new Date(new Date(date).setHours(23, 59, 59)),
    },
  }).sort({ time: "asc" });


  const get_days = function () {
    arr = ["Today", "Yesterday"]
    today_date = new Date()
    for (let i = 2; i < 7; i++) {
      today_date.setDate(new Date().getDate() - i)
      curr_day = today_date.toLocaleDateString("en-IN", { weekday: "long" });
      arr.push(curr_day.toString());

    };
    return arr;

  };
  var findTotal = await Task.find({}).select("name status -_id");

  function find_streak() {
    const streak_count = {};

    for (let i = 0; i < findTotal.length; i++) {

      element = findTotal[i];
      if (streak_count[element.name]) {
        let count = streak_count[element.name].total_task;
        streak_count[element.name]["total_task"] = count + 1
        if (element.status == "Done") {
          let count = streak_count[element.name].success;
          streak_count[element.name]["success"] = count + 1
        }

      } else {
        let data = {}
        data["total_task"] = 1
        if (element.status == "Done") {
          data["success"] = 1
        } else {
          data["success"] = 0
        }

        streak_count[element.name] = data

      }
    }

    return streak_count
  }


  var days = get_days()

  return res.render("home", {
    heading: days,
    select_value: day,
    posts: findResult,
    streaks: find_streak()
  })

}

module.exports = homeController;