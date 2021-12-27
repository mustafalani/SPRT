//db.collection.deleteOne(filter, update, options)
exports = function(payload,response) {
  const sprtDocs =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");

  let body = payload.body;
  let data = JSON.parse(body.text());

  const query = { "_id": BSON.ObjectId(data._id) }
  //return query;


  return new Promise((resolve, reject) => {
    sprtDocs.deleteOne(query).then ((response) => {
      resolve (response);
    })
  })
};
