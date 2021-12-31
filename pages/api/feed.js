const MongoClient = require('mongodb').MongoClient
const axios = require("axios")

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
        oldCount = count
    }
}, 10000)

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    count++
    res.status(200).send(`You fed me 1 fish and I am still hungry. I have ate ${count} fishes so far.`);
}