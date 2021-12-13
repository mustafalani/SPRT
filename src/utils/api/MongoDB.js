import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css';
export default class MongoDB {

  static search() {
        const moment = window.moment;
        let txt = "";
        let counter = "Ingen resultater";
        let searchString = document.getElementById("fritext").value;
        console.log(searchString);

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------
        let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-bvzmi/service/sport/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-DEVELOPMENT->sprt-bvzmi
        //let webhook_url = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sprt-zzhhc/service/SPRT-SEARCH/incoming_webhook/search?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc



        let webUrl = webhook_url;

        //let runtime = document.getElementById("runtime").value;
        let BBSK = document.getElementById("BBSK").value;
        let TITL = document.getElementById("TITL").value;
        let MEDV = document.getElementById("MEDV").value;
        let KEYW = document.getElementById("KEYW").value;
        let OPHV = document.getElementById("OPHV").value;
        let UDAT = document.getElementById("UDAT").value;
        let BNNA = document.getElementById("BNNA").value;
        // if (genre!= 'All') will be used for TV stations
        const data = {
          "arg" : searchString,
          "BBSK" : BBSK,
          "TITL" : TITL,
          "MEDV" : MEDV,
          "KEYW" : KEYW,
          "OPHV" : OPHV,
          "UDAT" : UDAT,
          "BNNA" : BNNA
        };

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
                        txt += `<div class="alert alert-danger" role="alert">Sadly you have an error. Status: <b>${response.status}</div>`;
                        if (response.json.length === 0)
                            txt+=`<div class="alert alert-warning" role="alert">Make sure to search for some type of result. Don't leave your search box empty!</div>`;
                        document.getElementById("results").innerHTML = txt;
                        document.getElementById("counter").innerHTML = counter;
                        throw Error(response.statusText);
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
                console.log(items)
                let obje = items["_id"];
                dataTable +=
                      `<tr>
                        <th scope="row" field="_id">_id</th>
                        <td>${obje["$oid"]}</td>
                      </tr>`
                for (var key in items) {
                  var itemName = key
                  if (key !== "_id" && key !== "highlight" && key !== "score" && key!== "DOCN" && key!== "TITL" && key!== "UDAT" && key!== "IDAT" && key!== "RDAT") {
                        if (key === "OPHV") {
                          itemName = "Reporter"
                        }

                        if (key === "BEMK") {
                          itemName = "Bemærk"
                        }

                        if (key === "BAGR") {
                          itemName = "Baggrund"
                        }

                        if (key === "BBSK") {
                          itemName = "Billedbeskrivelse"
                        }

                        if (key === "MEDV") {
                          itemName = "Medvirkende"
                        }

                        if (key === "KEYW") {
                          itemName = "Emneord"
                        }

                        if (key === "LOKA") {
                          itemName = "Lokalitet"
                        }

                        if (key === "BNTA") {
                          itemName = "Båndtype"
                        }

                        if (key === "BNNA") {
                          itemName = "Båndnummer"
                        }

                        if (key === "BNFA") {
                          itemName = "Båndformat"
                        }

                        if (key === "LYDA") {
                          itemName = "Lyd"
                        }

                        if (key === "TVST") {
                          itemName = "TV Station"
                        }

                        if (key === "STAT") {
                          itemName = "Stat"
                        }
                        let obje = items["_id"]
                      dataTable += `
                            <tr>
                              <div id="msg-${[key]}-${obje["$oid"]}"></div>
                              <th scope="row" docid="${obje["$oid"]}" field="${[key]}">${itemName} <div class="d-none"><button id="Save-${[key]}-${obje["$oid"]}" type="button" class="btn btn-primary action-btn" onclick="saveOne('${[key]}-${obje["$oid"]}','${[key]}','${obje["$oid"]}')">Save</button><button id="Undo-${[key]}-${obje["$oid"]}" type="button" class="btn btn-primary action-btn" onclick="undo('${[key]}-${obje["$oid"]}')">Undo</button></div></th>
                              <td id="${[key]}-${obje["$oid"]}" class="editable"><span>${items[key]}<span></td>
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
                          <div><button id="Edit-${obje["$oid"]}" type="button" class="btn btn-primary action-btn" onclick="window.open('#/edit/${obje["$oid"]}', '_blank');">Edit This Document in New Window</div>
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
  }
