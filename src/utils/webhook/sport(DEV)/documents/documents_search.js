exports = function(payload,response) {
  const results =  context.services.get("mongodb-atlas").db("tv3").collection("sprt");
  let body = payload.body;
  let data = JSON.parse(body.text());

  let arg = data.arg;

  let DOCN = data.DOCN;
  let TITL = data.TITL;
  let UDAT = data.UDAT;
  let RDAT = data.RDAT;
  let BAGR = data.BAGR;
  let BBSK = data.BBSK;
  let MEDV = data.MEDV;
  let OPHV = data.OPHV;
  let KEYW = data.KEYW;
  let LOKA = data.LOKA;
  let BNNA = data.BNNA;
  let BNTA = data.BNTA;
  let BNFA = data.BNFA;
  let LYDA = data.LYDA;
  let ID = data.ID;
  let STAT = data.STAT;
  let BNTB = data.BNTB;
  let BNFB = data.BNFB;
  let LYDB = data.LYDB;
  let BNNC = data.BNNC;
  let BNTC = data.BNTC;
  let BNFC = data.BNFC;
  let LYDC = data.LYDC;
  let TVST = data.TVST;
  let SearchOptions = data.SearchOptions;

  let calledAggregation;


  let argSearchOption = SearchOptions.arg;
  let BBSKSearchOption = SearchOptions.BBSK;
  let TITLSearchOption = SearchOptions.TITL;
  let OPHVSearchOption = SearchOptions.OPHV;
  let MEDVSearchOption = SearchOptions.MEDV;

  let argSlop;
  let BBSKSlop;
  let TITLSlop;
  let OPHVSlop;
  let MEDVSlop;

  let BBSKFuzzy;
  let TITLFuzzy;
  let OPHVFuzzy;
  let MEDVFuzzy;


  if (argSearchOption == 'and') {
    argSearchOption = "phrase";
    argSlop = 1;
  }

  if (BBSKSearchOption == 'and') {
    BBSKSearchOption = "phrase";
    BBSKSlop = 1;
  }

  if (TITLSearchOption == 'and') {
    TITLSearchOption = "phrase";
    TITLSlop = 1;
  }

  if (OPHVSearchOption == 'and') {
    OPHVSearchOption = "phrase";
    OPHVSlop = 1;
  }

  if (MEDVSearchOption == 'and') {
    MEDVSearchOption = "phrase";
    MEDVSlop = 1;
  }

  if (BBSKSearchOption == 'fuzzy') {
    BBSKSearchOption = "text";
    BBSKFuzzy = 1;
  }

  if (TITLSearchOption == 'fuzzy') {
    TITLSearchOption = "text";
    TITLFuzzy = 1;
  }

  if (OPHVSearchOption == 'fuzzy') {
    OPHVSearchOption = "text";
    OPHVFuzzy = 1;
  }

  if (MEDVSearchOption == 'fuzzy') {
    MEDVSearchOption = "text";
    MEDVFuzzy = 1;
  }


  if (arg) {
    calledAggregation = [
  {
    $search: {
        compound: {
            must: [
            {
              [argSearchOption]: {
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
  }, {$limit: 1000}];
  if (argSlop == 1) {
        calledAggregation[0].$search.compound.must[0].phrase.slop = 1000;
        }
  if (UDAT){
      let udatStage = {
          "wildcard": {
              "query": UDAT,
              "path": "UDAT",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(udatStage);
    }
  if (BBSK){
      let bbskStage = {
          [BBSKSearchOption]: {
              "query": BBSK,
              "path": "BBSK",
          }};
      if (BBSKFuzzy == 1) {
        bbskStage.text.fuzzy = {};
        }
      if (BBSKSlop == 1) {
        bbskStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(bbskStage);
    }
  if (TITL){
      let titlStage = {
          [TITLSearchOption]: {
              "query": TITL,
              "path": "TITL",
          }};
      if (TITLFuzzy == 1) {
        titlStage.text.fuzzy = {};
        }
      if (TITLSlop == 1) {
        titlStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(titlStage);
    }
  if (MEDV){
      let medvStage = {
          [MEDVSearchOption]: {
              "query": MEDV,
              "path": "MEDV",
          }};
      if (MEDVFuzzy == 1) {
        medvStage.text.fuzzy = {};
        }
      if (MEDVSlop == 1) {
        medvStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(medvStage);
    }
  if (KEYW){
      let keywStage = {
          "phrase": {
              "query": KEYW,
              "path": "KEYW"
          }};
      calledAggregation[0].$search.compound.filter.push(keywStage);
    }
  if (OPHV){
      let reporterStage = {
          [OPHVSearchOption]: {
              "query": OPHV,
              "path": "OPHV"
          }};
      if (OPHVFuzzy == 1) {
        reporterStage.text.fuzzy = {};
        }
      if (OPHVSlop == 1) {
        reporterStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(reporterStage);
    }
  if (BNNA){
      let tapeNoStage = {
          "autocomplete": {
              "query": BNNA,
              "path": "BNNA"
          }};
      calledAggregation[0].$search.compound.filter.push(tapeNoStage);
    }
  if (DOCN){
      let docnStage = {
          "phrase": {
              "query": DOCN,
              "path": "DOCN"
          }};
      calledAggregation[0].$search.compound.filter.push(docnStage);
    }
  }

  if (!arg) {
    calledAggregation = [
  {
    $search: {
        compound: {
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
  }, {$limit: 1000}];
  if (UDAT){
      let udatStage = {
          "wildcard": {
              "query": UDAT,
              "path": "UDAT",
              "allowAnalyzedField": true,
          }};
      calledAggregation[0].$search.compound.filter.push(udatStage);
    }
  if (BBSK){
      let bbskStage = {
          [BBSKSearchOption]: {
              "query": BBSK,
              "path": "BBSK",
          }};
      if (BBSKFuzzy == 1) {
        bbskStage.text.fuzzy = {};
        }
      if (BBSKSlop == 1) {
        bbskStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(bbskStage);
    }
  if (TITL){
      let titlStage = {
          [TITLSearchOption]: {
              "query": TITL,
              "path": "TITL",
          }};
      if (TITLFuzzy == 1) {
        titlStage.text.fuzzy = {};
        }
      if (TITLSlop == 1) {
        titlStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(titlStage);
    }
  if (MEDV){
      let medvStage = {
          [MEDVSearchOption]: {
              "query": MEDV,
              "path": "MEDV",
          }};
      if (MEDVFuzzy == 1) {
        medvStage.text.fuzzy = {};
        }
      if (MEDVSlop == 1) {
        medvStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(medvStage);
    }
  if (KEYW){
      let keywStage = {
          "phrase": {
              "query": KEYW,
              "path": "KEYW"
          }};
      calledAggregation[0].$search.compound.filter.push(keywStage);
    }
  if (OPHV){
      let reporterStage = {
          [OPHVSearchOption]: {
              "query": OPHV,
              "path": "OPHV",
          }};
      if (OPHVFuzzy == 1) {
        reporterStage.text.fuzzy = {};
        }
      if (OPHVSlop == 1) {
        reporterStage.phrase.slop = 1000;
        }
      calledAggregation[0].$search.compound.filter.push(reporterStage);
    }
  if (BNNA){
      let tapeNoStage = {
          "autocomplete": {
              "query": BNNA,
              "path": "BNNA"
          }};
      calledAggregation[0].$search.compound.filter.push(tapeNoStage);
    }
  if (DOCN){
      let docnStage = {
          "phrase": {
              "query": DOCN,
              "path": "DOCN"
          }};
      calledAggregation[0].$search.compound.filter.push(docnStage);
    }

  }

    //response.setStatusCode(200);
    //response.setHeader("Content-Type", "application/json");
    //response.setBody(JSON.stringify(results.aggregate(calledAggregation).toArray()));
    //return data;
    //return calledAggregation;
  return results.aggregate(calledAggregation).toArray();
};
