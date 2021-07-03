var exp = require('express')
const axios = require("axios");
var router = exp.Router();
var player_stats_api_url = "https://cricapi.com/api/playerStats?apikey=trOrgsLWVAY6F1Z3CmQXTIeUNOk1&pid=";
var player_lookup_url = "https://cricapi.com/api/playerFinder?apikey=trOrgsLWVAY6F1Z3CmQXTIeUNOk1&name=";

const redis = require("redis");
const redisPort = 6379
const client = redis.createClient(redisPort);
client.on("error", (err) => {console.log(err);})

const fetch = require('node-fetch'); //node-fetch
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
router.use(exp.urlencoded({extended: true}));

router.get('/ps4a', function(req, res, next) {
  res.render('ps4', { title: 'PS4 Part A' });
});

router.route('/ps4b')
  .get(function (req, res) {
    res.send('PS 4 part B')
  })
  .post(function (req, res) {
    fetch(player_stats_api_url+"35320")
    .then(res => res.json())
    .then(json => {
        res.render('p4',{title: 'PS4 Part B', json_obj: json});
    })
  })

router.route('/ps4c')
  .get(function (req, res) {
    res.send('PS 4 part C')
  })
  .post(function (req, res) {
    (async () => {
      const player = await fetch(player_stats_api_url+"35320").then(response => response.json());
      res.render('p4',{title: 'PS4 Part B', json_obj: player});
   })();
  })

router.get('/form',function(req,res){
  res.render("form.ejs");
});

router.post("/form", (req, res) => {
  const searchTerm = req.body.name + " " + req.body.lastname;; // {first: req.body.name, last: req.body.lastname};
  try {
    client.get(searchTerm, async (err, json) => {
      if (err) throw err;
      if (json) {
        res.status(200).send({
          data: JSON.parse(json),
          message: "data retrieved from the cache"
        });
      }
      else {
        fetch(player_lookup_url+ req.body.name + "%20" + req.body.lastname)
        .then(res => res.json())
        .then(json => {
          if(json.data.length === 0){
            res.render('err_player',{title: "Cannot find player"});
          } else{
            fetch(player_stats_api_url+json.data[0].pid)
            .then(res => res.json())
            .then(json1 => {
              console.log(json1.data);
              client.setex(searchTerm, 15, JSON.stringify(json1.data));
              res.status(200).send({
                data: json1.data,
                message: "was not in the cache, retrieved from an API call"
              });
            })
          }
        })
      }
    });
  } catch(err) {res.status(500).send({message: err.message});}
});

module.exports = router;