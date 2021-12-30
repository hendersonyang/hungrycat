var count = 0;
const MongoClient = require('mongodb').MongoClient

MongoClient(process.env.mongo, { useUnifiedTopology: true, useNewUrlParser: true }).connect(async (err, DB) => {
    if (err) throw err;
    console.log("Sucessfully conected to DB!")

    const Database = DB.db('Main')
    const stats = Database.collection('Stats')

    let stat = await stats.findOne({
        type: "global"
    });
    count = stat.count || 0
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

export default function handler(req, res) {
    count++
    res.status(200).send(`You fed me 1 fish and I am still hungry. I have ate ${count} fishes so far.`);
}