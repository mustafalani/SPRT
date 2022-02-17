//db.collection.insertOne()
exports = function(payload,response) {
  const sprtDocs =  context.services.get("mongodb-atlas").db("TV3").collection("SPRT");

  let body = payload.body;
  let data = JSON.parse(body.text());

  const document = data.document


  return new Promise((resolve, reject) => {
    sprtDocs.insertOne(document).then ((response) => {
      resolve (response);
    })
  })
};
