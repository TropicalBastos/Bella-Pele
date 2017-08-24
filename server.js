express = require('express');
app = express();
fs = require('fs');
path = require('path');
middleware = require(path.join(__dirname,'/middleware/middleware.js'));
var photos = [];


app.set('view engine','ejs');

app.get('/',middleware.loadAdvices,(req,res)=>{
  res.render('index',{advices:JSON.stringify(res.advices)});
});

app.get('/fotos',(req,res)=>{
  //grab all photos for this page in the res folder
  fs.readdir('public/res',(err,files)=>{
    if(err) console.log(err);
    for(var i = 0;i < files.length;i++){
      if(files[i].match(/^[0-9]+(.jpg|.png)$/)){
        photos.push(files[i]);
      }
    }
    res.render("fotos",{photos:JSON.stringify(photos)});
    photos = [];
  });
});

app.get('/contato',(req,res)=>{
  res.render('contato');
});

app.get('/dica/:title',middleware.loadOneAdvice,(req,res)=>{
  var title = req.params.title;
  res.render('dica',{advice:res.selectedAdvice});
});

//when user sends data trying to contact clinic through contact page
app.post('/send',middleware.validate,middleware.sendEmail);


app.listen(8090,()=>{
  console.log("Server started, listening on port 8090...");
});
