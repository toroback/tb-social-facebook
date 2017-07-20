var FB = require('fb');

/**
 * Facebook Adapter 
 * @class
 */
class Adapter{
  constructor(client){
    this.client = client;
    this.options = {
      appId       : client.options.appId,
      appSecret   : client.options.appSecret,
      accessToken : client.options.accessToken,
      timeout     : client.options.timeout || 1000
    }
    this.srv = new FB.Facebook(this.options);
  }

  post(post){
    return new Promise((resolve,reject)=>{
      this.srv.api(
          "/me/feed", //144778872215780
          "POST",
          {
              message:post.message,
              link: post.link,              
          },
          function (res) {
            if(!res || res.error) {
              //console.log(!res ? 'error occurred' : res.error);
              reject(res.error);
              return;
            }
            //console.log('Post Id: ' + res.id);
            resolve(res);
          }
      );   
    })
  }
}

module.exports = Adapter;