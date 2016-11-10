var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locationsDB');

var locationSchema = mongoose.Schema(
    {
      location : Object
    })

    var point = mongoose.model('point', locationSchema);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function()
    {
      console.log('Connected');
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('journeys.html', { root: 'public' });
});

router.post('/location', function(req, res, next)
{
  console.log("POST Location Route");

var newlocation = new location(req.body);
console.log(newlocation);

newlocation.save(function(err, post)
{
  if(err) return console.error(err);
  console.log(post);
  res.sendStatus(200);
});

})

router.get('/location', function(req, res, next)
{
  console.log("In the GET route?");
  point.find(function(err,locationList)
  {
    if(err) return console.error(err);
    else
    {
      console.log(locationList);
      res.json(locationList);
    }
  })
})

module.exports = router;
