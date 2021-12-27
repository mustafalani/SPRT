//db.collection.updateOne(filter, update, options)
exports = function(payload,response) {
  const sprtDocs =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");

  let body = payload.body;
  let data = JSON.parse(body.text());

  const query = { "_id": BSON.ObjectId(data._id) }
  //return query;

  let set = {}

  for (var i in data) {
    if (i != '_id') {
    set[i] = data[i];
    }
  }

  const update = {
    "$set": set
    };

  const options = { "upsert": false };


  return new Promise((resolve, reject) => {
    sprtDocs.updateOne(query, update, options).then ((response) => {
      resolve (response);
    })
  })
};
