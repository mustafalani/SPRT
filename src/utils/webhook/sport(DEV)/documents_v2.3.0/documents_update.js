//db.collection.updateOne(filter, update, options)
exports = function(payload,response) {
  const sprtDocs =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");

  let body = payload.body;
  let data = JSON.parse(body.text());

  const query = { "_id": BSON.ObjectId(data._id) }
  //return query;

  let set = data.set
  let unset = data.unset
  let update

  if (Object.keys(set).length === 0) {
    update = {
    "$unset": unset
    };
  }
  else if (Object.keys(unset).length === 0) {
    update = {
    "$set": set,
    };
  }
  else {
    update = {
    "$set": set,
    "$unset": unset
    };
  }


  const options = { "upsert": false };


  return new Promise((resolve, reject) => {
    sprtDocs.updateOne(query, update, options).then ((response) => {
      resolve (response);
    })
  })
};
