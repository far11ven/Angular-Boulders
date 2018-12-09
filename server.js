const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/music-app'));
app.listen(process.env.PORT || 8080);

//PATH LOCATION STARTEGY

app.get('/*', function(req,res){
  const fullPath = path.join(__dirname + '/dist/music-app/index.html');
  console.log(" Fetching from.." + fullPath);
	res.sendFile(fullPath);
})

console.log('Server started running..' + process.env.PORT || 8080);

//Changed to run on Heroku
