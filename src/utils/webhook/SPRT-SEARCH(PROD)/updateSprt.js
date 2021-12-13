exports = function(payload,response) {
  const results =  context.services.get("mongodb-atlas").db("TV3").collection("SPRT");
  let body = payload.body;
  let data = JSON.parse(body.text());
  let arg = data.arg;
  let bbsk = data.bbsk;
  let titl = data.titl;
  let medv = data.medv;
  let keyw = data.keyw;
  let reporter = data.reporter;
  let udat = data.udat;
  let tapeNo = data.tapeno;
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
  if (udat){
      console.log("UDAT: " + udat);
      let udatStage = {
          "wildcard": {
              "query": udat,
              "path": "UDAT",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(udatStage);
    }
  if (bbsk){
      console.log("BBSK: " + bbsk);
      let bbskStage = {
          "wildcard": {
              "query": bbsk,
              "path": "BBSK",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(bbskStage);
    }
  if (titl){
      console.log("BBSK: " + titl);
      let titlStage = {
          "wildcard": {
              "query": titl,
              "path": "TITL",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(titlStage);
    }
  if (medv){
      console.log("MEDV: " + medv);
      let medvStage = {
          "text": {
              "query": medv,
              "path": "MEDV",
              "fuzzy": {},
          }};
      calledAggregation[0].$search.compound.filter.push(medvStage);
    }
  if (keyw){
      console.log("KEYW: " + keyw);
      let keywStage = {
          "phrase": {
              "query": keyw,
              "path": "KEYW"
          }};
      calledAggregation[0].$search.compound.filter.push(keywStage);
    }
  if (reporter){
      console.log("OPHV: " + reporter);
      let reporterStage = {
          "phrase": {
              "query": reporter,
              "path": "OPHV"
          }};
      calledAggregation[0].$search.compound.filter.push(reporterStage);
    }
  if (tapeNo){
      console.log("Tape Number: " + tapeNo);
      let tapeNoStage = {
          "autocomplete": {
              "query": tapeNo,
              "path": "BNNA"
          }};
      calledAggregation[0].$search.compound.filter.push(tapeNoStage);
    }

    //response.setStatusCode(200);
    //response.setHeader("Content-Type", "application/json");
    //response.setBody(JSON.stringify(results.aggregate(calledAggregation).toArray()));
    //return data;
  return results.aggregate(calledAggregation).toArray();
};
