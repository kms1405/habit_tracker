const Task = require("../models/tasks");

module.exports.showHistoryController = async function (req, res) {
    date = req.query.date
    if (!date) {
        var date = new Date(); 
    } else {
        date = new Date(date);
    }

    end = new Date(date)
    date.setDate(date.getDate() - 7);

    // console.log("end date",end, "start date",date)

    const lastSevenDayReport = await Task.find({
        createdAt: {
            $gte: new Date(date.setHours(00, 00, 00)),
            $lt: new Date(end.setHours(23, 59, 59)),
        },
    });

    function groupBy(list) {
        const map = new Map();
        list.forEach((item) => {
            date_element=item.createdAt.toString().split(" ")
            key = date_element[0] + " " + date_element[1] + " " + date_element[2] + " " +date_element[3]
            const collection = map.get(key)
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    all_reports = groupBy(lastSevenDayReport);
    return res.render("show_history", {
        heading: "Last seven days report",
        posts: all_reports
    })
}


