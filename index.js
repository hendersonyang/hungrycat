export default function handler(req, res) {
    res.status(200).send(`I AM VERY HUNGRY CAT! FEED ME FISH BY GOING TO <a href="/feed">/feed</a>.`);
}