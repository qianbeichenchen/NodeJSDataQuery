const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false})
const app = express();


app.use(cors());
app.use(bodyParser.json())


let list = [
    {name: "Bert Garrett", age: 10, id: 1, address: 'beijing', sex: 0, class: 1},
    {name: "Judy Gill", age: 33, id: 2, address: 'beijing', sex: 0, class: 1},
    {name: "Paul Garner", age: 22, id: 3, address: 'beijing', sex: 0, class: 2}
];

app.get("/list", (req, res) => {
    res.json(list);    //    将数据返回给服务端
});

app.post('/update', (req, res) => {
    // 得到post请求的数据
    let obj = []
    const resultArray = req.body
    resultArray.forEach((item, index) => {
        if (item.type === 'update') {
            let _index = item.sourceIndex
            list[_index] = item.dataItem

        } else if (item.type === 'insert') {
            list.push(item.dataItem)

        } else if (item.type === 'delete') {
            let _index = item.sourceIndex
            list.splice(_index, 1)
        }
        obj[index] = {
            succeed: true,
            data: item.dataItem
        }

    })
    res.json(obj);
})

app.listen("3000", () => {
    console.log("=========服务启动了，在3000端口=========");
});

