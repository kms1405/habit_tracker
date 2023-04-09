const Task = require("../models/tasks");

module.exports.showHistoryController = async function (req, res) {
    date = req.query.date
    if (!date) {
        var date = new Date();
    } else {
        date = new Date(date);
    }

    end = new Date(date)
    date.setDate(date.getDate() - 6);

    const lastSevenDayReport = await Task.find({
        date: {
            $gte: new Date(date.setHours(00, 00, 00)),
            $lt: new Date(end.setHours(23, 59, 59)),
        },
    }).sort({ date: "desc" });

    function groupBy(list) {
        const map = new Map();
        list.forEach((item) => {
            date_element = item.date.toString().split(" ")
            key = date_element[0] + " " + date_element[1] + " " + date_element[2] + " " + date_element[3]
            const collection = map.get(key)
            if (!collection) {
                map.set(key, [item]);
            } else {
                console.log(item.name)
                collection.push(item);
            }
        });
        return map;
    }



    const all_reports = groupBy(lastSevenDayReport);

    const fetch_task = await Task.find({})

    function count_status(task_list) {
        const count_map={};
        task_list.forEach((item => {
            const collection = count_map[item.name]
            if (collection) {
                if (item.status == "Done") {
                    collection[0] += 1
                }
                
                collection[1] += 1
                
            } else {
                
                if (item.status == "Done") {
                    count_map[item.name] = [1,1]
                } else{
                    count_map[item.name] = [0,1]
                }

                
            }

        }))
        return count_map;

    }

    all_task_count = count_status(fetch_task);
    console.log(all_task_count);

    return res.render("show_history", {
        heading: "Task history",
        posts: all_reports,
        task_count:all_task_count
    })
}


