const micro = require('micro');
const fetch = require('node-fetch');
const PORT  = process.env.PORT || '8000'
const ENDPOINT = "https://reddit.com/r/dadjokes.json";

const filterOutLink = (j) => j.data.selftext.indexOf('http') === -1;
const filterUpVotes = (j) => j.data.ups >= 10;

/**
 * @api {get} / getJoke
 * @apiName GetJoke
 * @apiSuccess (Success_200) {String} data the hello world data
 */

const server = micro(async (req, res) => {
  const { data: { children: jokes } } = await fetch(ENDPOINT).then(response => response.json());
  
  return jokes
    .filter(filterOutLink)
    .filter(filterUpVotes)
    .map(joke => ({ title: joke.data.title, selftext: joke.data.selftext }))
    .slice(0,3)
})

server.listen(PORT)