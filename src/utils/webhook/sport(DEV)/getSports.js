exports = function(payload) {
  const results =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");
  let arg = payload.query.arg;
  let bbsk = payload.query.bbsk;
  let titl = payload.query.titl;
  let medv = payload.query.medv;
  let keyw = payload.query.keyw;
  let reporter = payload.query.reporter;
  let udat = payload.query.udat;
  let tapeNo = payload.query.tapeno;
  // if (payload.body) {
    // $mustData = JSON.parse(payload.body.text());
    //return ($mustData);
  // }
  // else $mustData = []
  //let arg1 = 'ved peter graulund';
  //let arg2 = 'AGF';
  //let arg3 = '20071129';
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
      _:0,

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
  return results.aggregate(calledAggregation).toArray();
};
