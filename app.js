var express = require('express');
var app = express();

//sql connectivity
const Db = require('./db.js');

const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const utils = require('./utils');

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
 
//------------------API's--------------------

// validate the user credentials
app.get('/signin', async function (req, res) {
    const bearerTokenId = req.header('authorization');
    const tokenId = bearerTokenId && bearerTokenId.split(' ')[1]
    // utils.googleAuth(tokenId);
    const verify = await utils.googleAuth(tokenId);
    console.log("result",typeof verify);
    // return 400 status if username/password is not exist
    if (typeof verify === "object") {
        return res.json(verify);
    }else{
        return res.status(401).json({
            error: true,
            message: "Invalid token"
          });
    }
    
    // return 401 status if the credential is not match.
    // async function validateLogin(user,usertype){
    //   const count = await Db.isUserExists(user,usertype);
    //   console.log('after await', count);
    //   if (!count){
    //     return res.status(402).json({
    //       error: true,
    //       message: "Username does not exist. Signup required."
    //     });
    //   }
    //   const record = await Db.getRecord(user,usertype);
    //   if (pwd !== record['password']){
    //     return res.status(401).json({
    //       error: true,
    //       message: "Username or Password is wrong."
    //     });
    //   }
    //   const token = utils.generateToken(user, record['name'], record['userId']);
    //   const userObj = utils.getCleanUser(user, record['name'], record['userId']);
    //   return res.json({ user: userObj, token });
    // }
    // validateLogin(user,usertype);
    
  });



var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
   Db.connectDb();
})