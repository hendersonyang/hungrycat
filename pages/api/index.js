export default function handler(req, res) {
    res.status(200).send(`I AM VERY HUNGRY CAT! FEED ME FISH BY GOING TO /feed.\n\n\nAmount fed may bounce around, as the data is being synced from multiple servers every 10 seconds.\n\nA creation by Magical Cat. Open source on github: https://github.com/hendersonyang/hungrycat`);
}