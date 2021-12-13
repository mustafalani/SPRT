import settings from './settings.js';

export default class MongoQueries {

  static FindDocByID(docID) {
        var url = window.location.href;
        const moment = window.moment;

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------
        const server = settings[0].MongoDB.server
        const secret = settings[0].MongoDB.secret
        const getDoc = settings[0].MongoDB.webhooks.getDoc

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
  }}
