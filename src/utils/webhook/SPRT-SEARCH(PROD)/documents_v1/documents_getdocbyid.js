exports = function(payload,response) {
  const results =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");
  let body = payload.body;
  let data = JSON.parse(body.text());
  const query = { "_id": BSON.ObjectId(data._id) }

  let arg = data.arg;
  let _id = data._id

  return results.find(query).toArray();
};
