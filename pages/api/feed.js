const MongoClient = require('mongodb').MongoClient
const axios = require("axios")
const NextCors = require("nextjs-cors")

var count = 0;
var oldCount = 0;

/*
MongoClient(process.env.mongo_1, { useUnifiedTopology: true, useNewUrlParser: true }).connect(async (err, DB) => {
    if (err) throw err;
    console.log("Sucessfully conected to DB!")

    const Database = DB.db('Main')
    const stats = Database.collection('Stats')

    let stat = await stats.findOne({
        type: "global"
    });
    count = stat.count
    setInterval(() => {
        stats.updateOne({
            type: "global"
        }, {
            $set: {
                count: count
            }
        })
    }, 10000)
})
*/

axios.post(`https://counter.hendersonyang.repl.co/currentcount?key=${process.env.key}`).then(res => {
    count = Number(res.data)
    oldCount = Number(res.data)
}).catch(error => {
    count = 0
    oldCount = 0
})
setInterval(() => {
    if (count - oldCount > 0) {
        axios.post(`https://counter.hendersonyang.repl.co/countincrease?increase=${count - oldCount}&key=${process.env.key}`)
        axios.post(`https://counter.hendersonyang.repl.co/currentcount?key=${process.env.key}`).then(res => {
            count = Number(res.data)
            oldCount = Number(res.data)
        }).catch(error => {
            count = 0
            oldCount = 0
        })
    }
}, 10000)

export default function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    count++
    res.status(200).send(`You fed me 1 fish and I am still hungry. I have ate ${count} fishes so far.`);
}