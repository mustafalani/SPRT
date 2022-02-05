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

        //----------------- MODIFY WEBHOOK_URL BELOW ------------------------
        //let webhook_url = "https://eu-central-1.aws.data.mongodb-api.com/app/sprt-bvzmi/endpoint/documents/update?secret=uHi6L3zGigVv6V2";//<-DEVELOPMENT->sprt-bvzmi
        let webhook_url = "https://eu-central-1.aws.data.mongodb-api.com/app/sprt-zzhhc/endpoint/documents/update?secret=uHi6L3zGigVv6V2";//<-PRODUCTION->sprt-zzhhc


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
                        Toastify({
                        text: "Something went wrong!",
                        offset: {
                          x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                          y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                        duration: 3000,
                        style: {
                                  background: "red",
                                },
                        }).showToast();
                    }
                    return response.json();
                })
                .then(function (resultJSON) {
                    if (resultJSON["$undefined"] === true) {
                      Toastify({
                      text: "Nothing Changed!",
                      offset: {
                        x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                        y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                      },
                      duration: 3000,
                      style: {
                                background: "yellow",
                              },
                      }).showToast();
                    } else {
                        if (resultJSON.modifiedCount.$numberInt !== '0') {
                            Toastify({
                            text: "Data Saved Successfully!",
                            offset: {
                              x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                              y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                            },
                            duration: 3000,
                            style: {
                                      background: "green",
                                    },
                            }).showToast();

                        } else {
                          Toastify({
                          text: "No Data has been saved!",
                          offset: {
                            x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                          },
                          duration: 3000,
                          style: {
                                    background: "yellow",
                                  },
                          }).showToast();
                        }
                    }  // end of ELSE
                  })

      doc.parentElement.className = "ql-container ql-bubble ql-container-save-blinking-bg";
      var prevSiblings = doc.previousElementSibling;
      prevSiblings.firstChild.className = "d-none"
      prevSiblings.lastChild.className = "d-none"
    }
