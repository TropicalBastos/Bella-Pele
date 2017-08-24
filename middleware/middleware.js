'use strict';

var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
path = require('path');
var advicesJson = require(path.join(__dirname,'../serverRes/advices.json'));

//email configurations and prep
//create usable transport object
let transporter = nodemailer.createTransport({
  host:'gmail.com',
  port:465,
  auth:{user:'clinicabellapele1@gmail.com',
        pass:'clinica123'},
  secure:true
});

//middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//constant __dirname holds the current directory
app.use(express.static(path.join(__dirname,"../dist/public")));

module.exports = {

//middleware for validation
validate: function(req,res,next){

  var validated = true;

  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  if(name.length<1 || name.length>99){
    validated = false;
  }

  if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
    validated = false;
  }

  if(message.length < 1){
    validated = false;
  }

  req.validated = validated;

  next();
},
//final middleware for sending email
sendEmail: function(req,res){

  if(req.validated===false){
    res.send({success:'false'});
  }else{

    var response = {success:'true'};

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'clinicabellapele@outlook.com',
        to: 'ian-bastos@live.com',
        subject: req.body.name,
        text: req.body.message,
        html: '<p>'+req.body.message+'</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          response = {success:"false"};
          console.log(error);
        }
        res.send(response);
    });
  }
},

loadAdvices: loadAdvices,

loadOneAdvice:loadOneAdvice

};


function loadAdvices(req,res,next){
  var tempAdvices = [];
  for(var i = 0;i < advicesJson.length; i++){
    tempAdvices[i] = {};
    tempAdvices[i].title = advicesJson[i].title;
  }
  res.advices = tempAdvices;
  next();
}

function loadOneAdvice(req,res,next){
  advicesJson.find((advice)=>{
    if(advice.title===req.params.title){
      res.selectedAdvice = advice;
    }
  });
  next();
}
