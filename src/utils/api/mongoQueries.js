import settings from './settings.js';

const login_url = settings[0].MongoDB.login_url
const app_id = settings[0].MongoDB.app_id

const server = settings[0].MongoDB.server
const secret = settings[0].MongoDB.secret
const update = settings[0].MongoDB.webhooks.update
const getDoc = settings[0].MongoDB.webhooks.getDoc
const insert = settings[0].MongoDB.webhooks.insert
const deleteOne = settings[0].MongoDB.webhooks.delete

export default class MongoQueries {

  static authenticate() {
    const webUrl = login_url+app_id+'/auth/providers/local-userpass/login'
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const data = {
      "username" : username,
      "password" : password
    };

    var res = fetch(webUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res
  }

  static FindDocByID(docID) {

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------

        let webUrl = server+'/'+getDoc+'?secret='+secret
        //console.log(webUrl)

        //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc

        const data = {
          "_id" : docID
        };

        var res = fetch(webUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        return res
  }

  static SaveDocument(docData) {

    //----------------- MODIFY WEBHOOK_URL BELOW ------------------------


    let webUrl = server+'/'+update+'?secret='+secret
    //console.log(webUrl)

    //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc

    const data = docData

    var res = fetch(webUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res

  }
  static insertDocument(docData) {

    //----------------- MODIFY WEBHOOK_URL BELOW ------------------------


    let webUrl = server+'/'+insert+'?secret='+secret
    //console.log(webUrl)

    //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc

    const data = docData

    var res = fetch(webUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res

  }

  static deleteDocument(docID) {

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------

        let webUrl = server+'/'+deleteOne+'?secret='+secret
        //console.log(webUrl)

        //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc

        const data = {
          "_id" : docID
        };

        var res = fetch(webUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        return res
  }

}
