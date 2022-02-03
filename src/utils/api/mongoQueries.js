import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import settings from './settings.js';
import CookiesHelper from '../../utils/CookiesHelper';
import CryptoJS from "crypto-js";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login_url = settings[0].MongoDB.login_url
const app_id = settings[0].MongoDB.app_id

const server = settings[0].MongoDB.server
const secret = settings[0].MongoDB.secret
const search = settings[0].MongoDB.webhooks.search
const update = settings[0].MongoDB.webhooks.update
const getDoc = settings[0].MongoDB.webhooks.getDoc
const insert = settings[0].MongoDB.webhooks.insert
const deleteOne = settings[0].MongoDB.webhooks.delete

const fields = settings[0].Fields

const getLastInsertedDocument = settings[0].MongoDB.webhooks.getLastInsertedDocument

const collectionCount = settings[0].MongoDB.webhooks.collectionCount


const user_id = CookiesHelper.getCookie('user_id')
var access_token = CookiesHelper.getCookie('access_token')
if (access_token === undefined) {
  access_token = 'token'
}
const refresh_token = CookiesHelper.getCookie('refresh_token')
const email = CookiesHelper.getCookie('email')
var encryptedPassword = CookiesHelper.getCookie('encryptedPassword')
if (encryptedPassword === undefined) {
  encryptedPassword = 'encryptedPassword'
}
const bytes = CryptoJS.AES.decrypt(encryptedPassword, access_token)
const password = bytes.toString(CryptoJS.enc.Utf8)


export default class MongoQueries {

  static authenticate(username, password) {
    const webUrl = login_url+app_id+'/auth/providers/local-userpass/login'
    const data = {
      "username" : username,
      "password" : password
    };

    return(fetch(webUrl, {
          method: 'POST',
          cros: 'no-cros',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }))
      }


  static Search(searchOptions) {

    function saveOne(fieldID,field,docID,email,password) {
            var doc = document.getElementById(fieldID)
            var quilltext = doc.quill.root.innerHTML.trim();
            var textStg1 = quilltext.replace(/;/g, '').replace(/<p><br><\/p>/g, ';<br>')
            var textStg2 = textStg1.replace(/<\/p><p>/g, ';').replace(/<\/?p>/g, '')

            const data = {
              "email": email,
              "password": password,
              "_id": docID,
              "set": {
                },
              "unset": {
                }
            };
            data.set[field] = textStg2;
            let msg = "";
            console.log(data)

            let webUrl = server+'/'+update+'?secret='+secret

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
                            toast.error("Something went wrong!");
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

    const moment = window.moment;
    let txt = "";
    let counter = "Ingen resultater";

    let webUrl = server+'/'+search+'?secret='+secret

    let searchString = document.getElementById("fritext").value;
    let _SOPT = searchOptions;
    let BBSK = document.getElementById("BBSK").value;
    let TITL = document.getElementById("TITL").value;
    let BAGR = document.getElementById("BAGR").value;
    let MEDV = document.getElementById("MEDV").value;
    let KEYW = document.getElementById("KEYW").value;
    let OPHV = document.getElementById("OPHV").value;
    let UDAT = document.getElementById("UDAT").value;
    let BNNA = document.getElementById("BNNA").value;
    // if (genre!= 'All') will be used for TV stations
    const data = {
      "email": email,
      "password": password,
      "arg" : searchString,
      "BBSK" : BBSK,
      "TITL" : TITL,
      "BAGR" : BAGR,
      "MEDV" : MEDV,
      "KEYW" : KEYW,
      "OPHV" : OPHV,
      "UDAT" : UDAT,
      "BNNA" : BNNA,
      "SearchOptions" : _SOPT
    };
    console.log(data);
    fetch(webUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(function (response) {
                if(!response.ok){
                  return response.json().then(json => {
                    console.log(response);
                    console.log(json.error);
                    txt += `<div class="alert alert-danger" role="alert"><p>Sadly you have an error.</p><p>Status: <b>${response.status} ${json.error}</p></div>`;
                    if (response.json.length === 0)
                        txt+=`<div class="alert alert-warning" role="alert">Make sure to search for some type of result. Don't leave your search box empty!</div>`;
                    document.getElementById("results").innerHTML = txt;
                    document.getElementById("counter").innerHTML = counter;
                    throw Error(response.statusText);
                  })
                }
                return response.json();
            })
            .then(function (resultJSON) {
                if (resultJSON["$undefined"] === true) {
                    console.log('NO FETCH RESULT');
                    txt += `<br><br><br><b><h3>IMPLEMENT FULL TEXT SEARCH AGGREGATION TO SEARCH result COLLECTION</h3></b>`;
                } else {
                    console.log("FETCHED RESULT... "  );
                    if (resultJSON.length !== 0) {
                        console.log("Fetched array has " + resultJSON.length + " entries");
                        counter = "Fundet " + "<span style='color: green'>" + resultJSON.length + "</span>" + " dokumenter"
                        txt = buildresultList(resultJSON);
                    } else {
                        console.log("Fetched array has " + resultJSON.length + " entries");
                        txt += `<br><br><br><b><h3>Sadly you have no search results. Try checking your spelling or changing your search terms.</h3></b>`;
                    }
                }  // end of ELSE

            document.getElementById("results").innerHTML = txt;
            document.getElementById("counter").innerHTML = counter;
            const options = {
                    modules: {
                      toolbar: [
                                  [{ header: [1, 2, false] }],
                                  ['bold', 'italic', 'underline', 'blockquote'],
                                  [{ list: 'ordered' }, { list: 'bullet' }],
                                  [{'color': []}],
                                  [{'background': []}],
                                  ['link', 'video'],
                                  ['clean'],
                                  ['code-block']
                                ],
                    },
                    theme: 'bubble'
                  };
            var tds = document.getElementsByTagName("td");
            var Delta = Quill.import('delta');
            var initializeQuill = function (e){
              var thisID = this
               if(!thisID.quill){
                  console.log(e);
                  this.target = e.currentTarget;
                  this.quill = new Quill(thisID.target, options);
                  this.target.children[0].onclick = function(et) { et.preventDefault(); };
                  this.target.children[0].onblur = function(l) {l.preventDefault()}
                  }
                  this.quill.focus();
                  e.stopPropagation();
                  e.preventDefault();
                  this.quill.getModule("toolbar").container.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                  });
                  var originaltext = thisID.quill.root.innerHTML.trim();
                  // Store accumulated changes
                    var change = new Delta();
                    this.quill.on('text-change', function(delta, oldDelta, source) {
                      change = change.compose(delta);
                      if (change.length() > 0) {
                        var undos = thisID.quill.history.stack.undo.length;
                        if (undos > 0) {
                            thisID.parentElement.className = "ql-container-change-blinking-bg";
                            var prevSiblings = thisID.previousElementSibling;
                            prevSiblings.firstChild.className = "actions-btn"
                            prevSiblings.lastChild.className = "actions-btn"
                        }
                        else {
                          thisID.parentElement.removeAttribute("class")
                          var prevSiblings = thisID.previousElementSibling;
                          prevSiblings.firstChild.className = "d-none"
                          prevSiblings.lastChild.className = "d-none"
                        }

                        //console.log('change', thisID.quill.root.innerHTML.trim());
                      };
                    });

                    // Save periodically
                    setInterval(function() {
                      if (change.length() > 0) {
                        console.log('changes detected', thisID.quill.root.innerHTML.trim());

                        /*
                        Send partial changes
                        $.post('/your-endpoint', {
                          partial: JSON.stringify(change)
                        });

                        Send entire document
                        $.post('/your-endpoint', {
                          doc: JSON.stringify(quill.getContents())
                        });
                        */
                        change = new Delta();
                      }
                    },);
            }

            for(var i = 0; i < tds.length; i++){
              tds[i].onclick = initializeQuill;
            }
        }).catch(function(error){
            console.log('Whoopsie!', error);
        });
    function buildresultList(results){
        // HELPER FUNCTION FOR USER ACTION

        let i = 0;      // for number of result documents returned
        let j = 0;      // for number of highlight entries
        let k = 0;      // for highlight.texts type entries - either "hit" or "text"
        let highlight_length = 0;
        let txt = "";
        console.log(results)
        console.log(results.length)


        for (i; i < results.length; i++) {
            // RECONSTRUCT ARRAY FOR RESULTS TABLE
            let dataTable = "";
            let items = results[i];
            //console.log(items)
            let obje = items["_id"];
            dataTable +=
                  `<code>${obje["$oid"]}</code>`
            for (var key in items) {
              var itemName
              if (key !== "_id" && key !== "highlight" && key !== "score" && key!== "DOCN") {
                    if (fields[key] !== undefined) {
                      itemName = fields[key]
                    }
                    else {
                      itemName = key
                    }
                    let obje = items["_id"]
                  dataTable += `
                        <tr>

                          <th scope="row" docid="${obje["$oid"]}" field="${[key]}">${itemName} <div class="d-none"><button id="Save-${[key]}-${obje["$oid"]}" type="button" class="btn btn-primary action-btn" onclick="saveOne('${[key]}-${obje["$oid"]}','${[key]}','${obje["$oid"]}','${email}','${password}')">Save</button><button id="Undo-${[key]}-${obje["$oid"]}" type="button" class="btn btn-primary action-btn" onclick="undo('${[key]}-${obje["$oid"]}')">Undo</button></div></th>
                          <td id="${[key]}-${obje["$oid"]}" class="editable"><span>${items[key]}<span></td>
                          <td id="msg-${[key]}-${obje["$oid"]}" class="editable"><span><span></td>
                        </tr>`
              }
            }

            highlight_length = results[i].highlight.length;
            // BUILD OUT HIGHLIGHTS FROM  TITL FIELD
            let highlights = "";
            for (j = 0; j < highlight_length; j++) {
              let highlightName = results[i].highlight[j].path

              if (highlightName === "TITL") {
                highlightName = "Titel"
              }

              if (highlightName === "OPHV") {
                highlightName = "Reporter"
              }

              if (highlightName ===  "BEMK") {
                highlightName = "Bemærk"
              }

              if (highlightName ===  "BAGR") {
                highlightName = "Baggrund"
              }

              if (highlightName ===  "BBSK") {
                highlightName = "Billedbeskrivelse"
              }

              if (highlightName ===  "MEDV") {
                highlightName = "Medvirkende"
              }

              if (highlightName ===  "KEYW") {
                highlightName = "Emneord"
              }
              highlights += `<b><span style="color: blue"> ${highlightName} </span></b>`
                for (k = 0; k < results[i].highlight[j].texts.length; k++) {
                    if (results[i].highlight[j].texts[k].type === "hit") {
                        highlights += `<b><span style="background-color: #FFFF00"> ${results[i].highlight[j].texts[k].value} </span></b>`;
                        dataTable = dataTable.replace(/;/g, '<br />');
                    } else {
                        highlights += results[i].highlight[j].texts[k].value;
                    }

                } // end of k
                highlights = highlights.replace(/;/g, '<br />');
                highlights += "<br>"
            }  // end of j
            txt += `
            <div class="accordion" id="searchReasult-${[i]}">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed d-grid gap-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${[i]}" aria-expanded="true" aria-controls="collapse${[i]}">
                      <p><b>Dok. nr. ${[i+1]} af ${results.length}</b></p>
                      <h4><span>Titel:</span><span style="color:green"> ${results[i].TITL }</span></h4>
                      <h5><span>Udsendelsesdato:</span><span style="color:blue"> ${moment(results[i].UDAT, "YYYYMMDD").format('LL')}</span></h5>
                    </button>
                  </h2>
                  <div id="collapse${[i]}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#searchReasult${[i]}">
                    <div class="accordion-body">
                      <div><button id="Edit-${obje["$oid"]}" type="button" class="btn btn-primary action-btn" onclick="window.open('/edit/${obje["$oid"]}', '_blank');">Edit This Document in New Window</div>
                    <div class="callout callout-info">
                    <p>${highlights}</p>
                    </div>
                    <table class="table table-striped table-hover">
                      <tbody>
                        ${dataTable}
                        <tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            `;
            txt += "<hr>";
        }
        return txt;
        }

  }

  static FindDocByID(docID) {

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------

        let webUrl = server+'/'+getDoc+'?secret='+secret
        //console.log(webUrl)

        //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc

        const data = {
          "email": email,
          "password": password,
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

      let webUrl = server+'/'+update+'?secret='+secret

      const data = docData

      data['email'] = email;
      data['password'] = password;

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


    let webUrl = server+'/'+insert+'?secret='+secret

    const data = {
      "email": email,
      "password": password
    }

    data['document'] = docData;

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
          "email": email,
          "password": password,
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

  static LastInsertedDocument() {

    let webUrl = server+'/'+getLastInsertedDocument+'?secret='+secret

    const data = {
      "email": email,
      "password": password
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

  static collectionCount() {
    let webUrl = server+'/'+collectionCount+'?secret='+secret

    const data = {
      "email": email,
      "password": password
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
