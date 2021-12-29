var count = 0;

export default function handler(req, res) {
    count++
    res.status(200).send(`You fed me 1 fish and I am still hungry. I have ate ${count} fishes so far.`);
}