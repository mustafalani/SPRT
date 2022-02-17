exports = function(payload,response) {
  const results =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");
  let body = payload.body;
  let data = JSON.parse(body.text());

  let arg = data.arg;

  let DOCN = data.DOCN
  let TITL = data.TITL
  let UDAT = data.UDAT
  let RDAT = data.RDAT
  let BAGR = data.BAGR
  let BBSK = data.BBSK
  let MEDV = data.MEDV
  let OPHV = data.OPHV
  let KEYW = data.KEYW
  let LOKA = data.LOKA
  let BNNA = data.BNNA
  let BNTA = data.BNTA
  let BNFA = data.BNFA
  let LYDA = data.LYDA
  let ID = data.ID
  let STAT = data.STAT
  let BNTB = data.BNTB
  let BNFB = data.BNFB
  let LYDB = data.LYDB
  let BNNC = data.BNNC
  let BNTC = data.BNTC
  let BNFC = data.BNFC
  let LYDC = data.LYDC
  let TVST = data.TVST

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
      FAKEID:0,
      score: {
        '$meta': 'searchScore'
      },
      highlight: {
        '$meta': 'searchHighlights'
      }
    }
  }, {$limit: 1000}]
  if (UDAT){
      console.log("UDAT: " + UDAT);
      let udatStage = {
          "wildcard": {
              "query": UDAT,
              "path": "UDAT",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(udatStage);
    }
  if (BBSK){
      console.log("BBSK: " + BBSK);
      let bbskStage = {
          "wildcard": {
              "query": BBSK,
              "path": "BBSK",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(bbskStage);
    }
  if (TITL){
      console.log("BBSK: " + TITL);
      let titlStage = {
          "wildcard": {
              "query": TITL,
              "path": "TITL",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(titlStage);
    }
  if (MEDV){
      console.log("MEDV: " + MEDV);
      let medvStage = {
          "text": {
              "query": MEDV,
              "path": "MEDV",
              "fuzzy": {},
          }};
      calledAggregation[0].$search.compound.filter.push(medvStage);
    }
  if (KEYW){
      console.log("KEYW: " + KEYW);
      let keywStage = {
          "phrase": {
              "query": KEYW,
              "path": "KEYW"
          }};
      calledAggregation[0].$search.compound.filter.push(keywStage);
    }
  if (OPHV){
      console.log("OPHV: " + OPHV);
      let reporterStage = {
          "phrase": {
              "query": OPHV,
              "path": "OPHV"
          }};
      calledAggregation[0].$search.compound.filter.push(reporterStage);
    }
  if (BNNA){
      console.log("Tape Number: " + BNNA);
      let tapeNoStage = {
          "autocomplete": {
              "query": BNNA,
              "path": "BNNA"
          }};
      calledAggregation[0].$search.compound.filter.push(tapeNoStage);
    }
  if (DOCN){
      console.log("document number: " + DOCN);
      let docnStage = {
          "phrase": {
              "query": DOCN,
              "path": "DOCN"
          }};
      calledAggregation[0].$search.compound.filter.push(docnStage);
    }
  return results.aggregate(calledAggregation).toArray();
};
