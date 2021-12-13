function saveOne(fieldID,field,docID) {

        var doc = document.getElementById(fieldID)
        var quilltext = doc.quill.root.innerHTML.trim();
        var textStg1 = quilltext.replace(/;/g, '').replace(/<p><br><\/p>/g, ';<br>')
        var textStg2 = textStg1.replace(/<\/p><p>/g, ';').replace(/<\/?p>/g, '')

        const data = {"_id": docID};
        data[field] = textStg2;
        let msg = "";
        console.log(data)

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------
        let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-bvzmi/service/sport/incoming_webhook/update?secret=uHi6L3zGigVv6V2";//<-DEVELOPMENT->sprt-bvzmi
        //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/update";//<-PRODUCTION->sprt-zzhhc


        let webUrl = webhook_url;

        fetch(webUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(function (response) {
                    if(!response.ok){
                        console.log(response);
                        msg += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                          <strong>Error!</strong>Sadly you have an error.
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>`
                        if (response.json.length === 0)
                            msg+=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>Warning!</strong>Something went wrong please try again later.
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`;
                        document.getElementById('msg-'+fieldID).innerHTML = msg;
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(function (resultJSON) {
                    if (resultJSON["$undefined"] === true) {
                        msg += `IMPLEMENT FULL TEXT SEARCH AGGREGATION TO SEARCH result COLLECTION`;
                    } else {
                        if (resultJSON.modifiedCount.$numberInt !== '0') {
                            msg += `<div class="alert alert-success alert-dismissible fade show" role="alert">
                              <strong>Success!</strong>Data Saved Successfully.
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`;
                            document.getElementById('msg-'+fieldID).innerHTML = msg;
                        } else {
                            //console.log("Fetched array has " + resultJSON.length + " entries");
                            msg += `<div class="alert alert-info alert-dismissible fade show" role="alert">
                              <strong>Info!</strong>No Data has been saved.
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`;
                            document.getElementById('msg-'+fieldID).innerHTML = msg;
                        }
                    }  // end of ELSE
                  })

      doc.parentElement.className = "ql-container ql-bubble ql-container-save-blinking-bg";
      var prevSiblings = doc.previousElementSibling;
      prevSiblings.firstChild.className = "d-none"
      prevSiblings.lastChild.className = "d-none"
    }
