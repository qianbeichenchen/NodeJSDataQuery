const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false})
const app = express();


app.use(cors());
app.use(bodyParser.json())


let studentList = [
    {name: "张三", age: 7, id: 1, sex: 0, class: 1},
    {name: "平平", age: 6, id: 2, sex: 0, class: 1},
    {name: "果果", age: 8, id: 3, sex: 0, class: 2}
];
let classList = [
    {id: 1, name: '一年级1班'},
    {id: 2, name: '一年级2班'},
    {id: 3, name: '二年级1班'},
]
/**
 * studentList用来查询数据
 * batchUpdate 接口批量处理
 * add/delete/update 单个处理，如学生表修改了两条记录，会调两次update 新增了三条记录，会调三次insert接口，但是批量处理是发一次请求，传回数组项
 */
app.get("/studentList", (req, res) => {
    res.json(studentList);
});

app.post("/student/batchUpdate", (req, res) => {
    let obj = []
    const resultArray = req.body
    resultArray.forEach((item, index) => {
        obj[index] = {
            succeed: true
        }
        if (item.type === 'update') {
            let _index = item.sourceIndex
            studentList[_index] = item.dataItem
        } else if (item.type === 'insert') {
            studentList.push(item.dataItem)
            obj[index].data = item.dataItem
        } else if (item.type === 'delete') {
            let _index = item.sourceIndex
            studentList.splice(_index, 1)
        }

    })
    res.json(obj);
});
app.post("/student/add", (req, res) => {
    studentList.push(req.body)
    res.json({succeed:true});
});
app.post("/student/update", (req, res) => {
    studentList.forEach((item, index) => {
        if (item.id == req.body.id) {
            studentList[index] = req.body
        }
    })
    res.json({succeed:true});
});
app.delete("/student/delete", (req, res) => {
    studentList.forEach((item, index) => {
        if (item.id == req.body[0].id) {
            studentList.splice(index,1)
        }
    })
    res.json({succeed:true});
});

app.get("/classList", (req, res) => {
    res.json(classList);
});
app.post("/class/batchUpdate", (req, res) => {
    let obj = []
    const resultArray = req.body
    resultArray.forEach((item, index) => {
        obj[index] = {
            succeed: true
        }
        if (item.type === 'update') {
            let _index = item.sourceIndex
            classList[_index] = item.dataItem
        } else if (item.type === 'insert') {
            classList.push(item.dataItem)
            obj[index].data = item.dataItem
        } else if (item.type === 'delete') {
            let _index = item.sourceIndex
            classList.splice(_index, 1)
        }

    })
    res.json(obj);
});

app.listen("3000", () => {
    console.log("=========服务启动了，在3000端口=========");
});

