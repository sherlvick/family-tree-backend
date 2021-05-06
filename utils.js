const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (token) => {
    // let ticket = await new Promise(
    //     function(resolve,reject){
    //         client.verifyIdToken({
    //             idToken: token,
    //             audience: process.env.GOOGLE_CLIENT_ID
    //             },
    //             function (err,login) {
    //                 console.log("ds",err);
    //                 if(login){
    //                     const payload = login.getPayload();
    //                     resolve(payload);
    //                     console.log("payload:",payload);
    //                     next();
    //                 }else{
    //                     reject("invalid token");
    //                 }
                    
    //             }
    //         )
    //     }
    // );
    // return ticket
    try {
      const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      return payload
    //   const {sub, email, name, picture} = payload;
      
    //   return {"userId":sub, "email":email, "fullname":name, "picture":picture};
     }
      catch(error){
        return error.message
      };

    // const ticket = await client.verifyIdToken({
    //     idToken: token,
    //     audience: process.env.GOOGLE_CLIENT_ID,
    //     });
    //     return ticket.getPayload();




};

module.exports = {googleAuth};