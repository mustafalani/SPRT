exports = function(payload,response) {
  const results =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");
  let body = payload.body;
  let data = JSON.parse(body.text());
  let arg = data.arg;
  let calledAggregation = [
  {
    $search: {
        compound: {
            must: [
            {
              phrase: {
                path: ['TITL', 'BEMK', 'BBSK', 'KEYW'],
                query: arg,
              }
            },],
            filter: []
          },
          highlight: {  path: ['TITL', 'BEMK', 'BBSK', 'KEYW', 'MEDV'] }      // changed from path: TITL
    }
  }, {
    $project: {
      ID:0,
      score: {
        '$meta': 'searchScore'
      },
      highlight: {
        '$meta': 'searchHighlights'
      }
    }
  }, {$limit: 1000}]

  for (var i in data) {
    if (i != '_id' && i != 'arg') {
      let iStage = {
          "wildcard": {
              "query": data[i],
              "path": [i],
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(iStage);
    }
  }

    //response.setStatusCode(200);
    //response.setHeader("Content-Type", "application/json");
    //response.setBody(JSON.stringify(results.aggregate(calledAggregation).toArray()));
    //return data;
  return results.aggregate(calledAggregation).toArray();
};
