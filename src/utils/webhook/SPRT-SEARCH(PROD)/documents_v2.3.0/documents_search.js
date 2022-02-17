exports = function(payload,response) {
  const results =  context.services.get("mongodb-atlas").db("TV3").collection("SPRT");
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
  let BAGRSearchOption = SearchOptions.BAGR;
  let OPHVSearchOption = SearchOptions.OPHV;
  let MEDVSearchOption = SearchOptions.MEDV;

  let arg_fuzzy_maxEdits = Number(SearchOptions.arg_fuzzy_maxEdits);
  let BBSK_fuzzy_maxEdits = Number(SearchOptions.BBSK_fuzzy_maxEdits);
  let TITL_fuzzy_maxEdits = Number(SearchOptions.TITL_fuzzy_maxEdits);
  let BAGR_fuzzy_maxEdits = Number(SearchOptions.BAGR_fuzzy_maxEdits);
  let OPHV_fuzzy_maxEdits = Number(SearchOptions.OPHV_fuzzy_maxEdits);
  let MEDV_fuzzy_maxEdits = Number(SearchOptions.MEDV_fuzzy_maxEdits);

  let arg_fuzzy_prefixLength = Number(SearchOptions.arg_fuzzy_prefixLength);
  let BBSK_fuzzy_prefixLength = Number(SearchOptions.BBSK_fuzzy_prefixLength);
  let TITL_fuzzy_prefixLength = Number(SearchOptions.TITL_fuzzy_prefixLength);
  let BAGR_fuzzy_prefixLength = Number(SearchOptions.BAGR_fuzzy_prefixLength);
  let OPHV_fuzzy_prefixLength = Number(SearchOptions.OPHV_fuzzy_prefixLength);
  let MEDV_fuzzy_prefixLength = Number(SearchOptions.MEDV_fuzzy_prefixLength);

  let arg_fuzzy_maxExpansions = Number(SearchOptions.arg_fuzzy_maxExpansions);
  let BBSK_fuzzy_maxExpansions = Number(SearchOptions.BBSK_fuzzy_maxExpansions);
  let TITL_fuzzy_maxExpansions = Number(SearchOptions.TITL_fuzzy_maxExpansions);
  let BAGR_fuzzy_maxExpansions = Number(SearchOptions.BAGR_fuzzy_maxExpansions);
  let OPHV_fuzzy_maxExpansions = Number(SearchOptions.OPHV_fuzzy_maxExpansions);
  let MEDV_fuzzy_maxExpansions = Number(SearchOptions.MEDV_fuzzy_maxExpansions);


  let arg_near = Number(SearchOptions.arg_near);
  let BBSK_near = Number(SearchOptions.BBSK_near);
  let TITL_near = Number(SearchOptions.TITL_near);
  let BAGR_near = Number(SearchOptions.BAGR_near);
  let OPHV_near = Number(SearchOptions.OPHV_near);
  let MEDV_near = Number(SearchOptions.MEDV_near);

  let argSlop;
  let BBSKSlop;
  let TITLSlop;
  let BAGRSlop;
  let OPHVSlop;
  let MEDVSlop;

  let argFuzzy;
  let BBSKFuzzy;
  let TITLFuzzy;
  let BAGRFuzzy;
  let OPHVFuzzy;
  let MEDVFuzzy;

  let argwildcard;
  let BBSKwildcard;
  let TITLwildcard;
  let BAGRwildcard;
  let OPHVwildcard;
  let MEDVwildcard;


  if (argSearchOption == 'and') {
    argSearchOption = "phrase";
    argSlop = 1;
    arg_near = 1000
  }

  if (BBSKSearchOption == 'and') {
    BBSKSearchOption = "phrase";
    BBSKSlop = 1;
    BBSK_near = 1000
  }

  if (TITLSearchOption == 'and') {
    TITLSearchOption = "phrase";
    TITLSlop = 1;
    TITL_near = 1000
  }

  if (BAGRSearchOption == 'and') {
    BAGRSearchOption = "phrase";
    BAGRSlop = 1;
    BAGR_near = 1000
  }

  if (OPHVSearchOption == 'and') {
    OPHVSearchOption = "phrase";
    OPHVSlop = 1;
    OPHV_near = 1000
  }

  if (MEDVSearchOption == 'and') {
    MEDVSearchOption = "phrase";
    MEDVSlop = 1;
    MEDV_near = 1000
  }

  if (argSearchOption == 'near') {
    argSearchOption = "phrase";
    argSlop = 1;
  }

  if (BBSKSearchOption == 'near') {
    BBSKSearchOption = "phrase";
    BBSKSlop = 1;
  }

  if (TITLSearchOption == 'near') {
    TITLSearchOption = "phrase";
    TITLSlop = 1;
  }

  if (BAGRSearchOption == 'near') {
    BAGRSearchOption = "phrase";
    BAGRSlop = 1;
  }

  if (OPHVSearchOption == 'near') {
    OPHVSearchOption = "phrase";
    OPHVSlop = 1;
  }

  if (MEDVSearchOption == 'near') {
    MEDVSearchOption = "phrase";
    MEDVSlop = 1;
  }

  if (argSearchOption == 'fuzzy') {
    argSearchOption = "text";
    argFuzzy = 1;
  }

  if (BBSKSearchOption == 'fuzzy') {
    BBSKSearchOption = "text";
    BBSKFuzzy = 1;
  }

  if (TITLSearchOption == 'fuzzy') {
    TITLSearchOption = "text";
    TITLFuzzy = 1;
  }

  if (BAGRSearchOption == 'fuzzy') {
    BAGRSearchOption = "text";
    BAGRFuzzy = 1;
  }

  if (OPHVSearchOption == 'fuzzy') {
    OPHVSearchOption = "text";
    OPHVFuzzy = 1;
  }

  if (MEDVSearchOption == 'fuzzy') {
    MEDVSearchOption = "text";
    MEDVFuzzy = 1;
  }
  //
  if (argSearchOption == 'wildcard') {
    argSearchOption = "wildcard";
    argwildcard = true;
  }

  if (BBSKSearchOption == 'wildcard') {
    BBSKSearchOption = "wildcard";
    BBSKwildcard = true;
  }

  if (TITLSearchOption == 'wildcard') {
    TITLSearchOption = "wildcard";
    TITLwildcard = true;
  }

  if (BAGRSearchOption == 'wildcard') {
    BAGRSearchOption = "wildcard";
    BAGRFuzzy = true;
  }

  if (OPHVSearchOption == 'wildcard') {
    OPHVSearchOption = "wildcard";
    OPHVwildcard = true;
  }

  if (MEDVSearchOption == 'wildcard') {
    MEDVSearchOption = "wildcard";
    MEDVwildcard = true;
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
  if (argFuzzy == 1) {
        calledAggregation[0].$search.compound.must[0].text.fuzzy = {};
        if (arg_fuzzy_maxEdits) {
          calledAggregation[0].$search.compound.must[0].text.fuzzy.maxEdits = arg_fuzzy_maxEdits
        }
        if (arg_fuzzy_prefixLength) {
          calledAggregation[0].$search.compound.must[0].text.fuzzy.prefixLength = arg_fuzzy_prefixLength
        }
        if (arg_fuzzy_maxExpansions) {
          calledAggregation[0].$search.compound.must[0].text.fuzzy.maxExpansions = arg_fuzzy_maxExpansions
        }
        }
  if (argSlop == 1) {
        calledAggregation[0].$search.compound.must[0].phrase.slop = arg_near;
        }
  if (argwildcard == true) {
        calledAggregation[0].$search.compound.must[0].wildcard.allowAnalyzedField = argwildcard;
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
        if (BBSK_fuzzy_maxEdits) {
          bbskStage.text.fuzzy.maxEdits = BBSK_fuzzy_maxEdits
        }
        if (BBSK_fuzzy_prefixLength) {
          bbskStage.text.fuzzy.prefixLength = BBSK_fuzzy_prefixLength
        }
        if (BBSK_fuzzy_maxExpansions) {
          bbskStage.text.fuzzy.maxExpansions = BBSK_fuzzy_maxExpansions
        }
        }
      if (BBSKSlop == 1) {
        bbskStage.phrase.slop = BBSK_near;
        }
      if (BBSKwildcard == true) {
        bbskStage.wildcard.allowAnalyzedField = BBSKwildcard;
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
        if (TITL_fuzzy_maxEdits) {
          titlStage.text.fuzzy.maxEdits = TITL_fuzzy_maxEdits
        }
        if (TITL_fuzzy_prefixLength) {
          titlStage.text.fuzzy.prefixLength = TITL_fuzzy_prefixLength
        }
        if (TITL_fuzzy_maxExpansions) {
          titlStage.text.fuzzy.maxExpansions = TITL_fuzzy_maxExpansions
        }
        }
      if (TITLSlop == 1) {
        titlStage.phrase.slop = TITL_near;
        }
      if (TITLwildcard == true) {
        titlStage.wildcard.allowAnalyzedField = TITLwildcard;
        }
      calledAggregation[0].$search.compound.filter.push(titlStage);
    }
  if (BAGR){
      let bagrStage = {
          [BAGRSearchOption]: {
              "query": BAGR,
              "path": "BAGR",
          }};
      if (BAGRFuzzy == 1) {
        bagrStage.text.fuzzy = {};
        if (BAGR_fuzzy_maxEdits) {
          bagrStage.text.fuzzy.maxEdits = BAGR_fuzzy_maxEdits
        }
        if (BAGR_fuzzy_prefixLength) {
          bagrStage.text.fuzzy.prefixLength = BAGR_fuzzy_prefixLength
        }
        if (BAGR_fuzzy_maxExpansions) {
          bagrStage.text.fuzzy.maxExpansions = BAGR_fuzzy_maxExpansions
        }
        }
      if (BAGRSlop == 1) {
        bagrStage.phrase.slop = BAGR_near;
        }
      if (BAGRwildcard == true) {
        bagrStage.wildcard.allowAnalyzedField = BAGRwildcard;
        }
      calledAggregation[0].$search.compound.filter.push(bagrStage);
    }
  if (MEDV){
      let medvStage = {
          [MEDVSearchOption]: {
              "query": MEDV,
              "path": "MEDV",
          }};
      if (MEDVFuzzy == 1) {
        medvStage.text.fuzzy = {};
        if (MEDV_fuzzy_maxEdits) {
          medvStage.text.fuzzy.maxEdits = MEDV_fuzzy_maxEdits
        }
        if (MEDV_fuzzy_prefixLength) {
          medvStage.text.fuzzy.prefixLength = MEDV_fuzzy_prefixLength
        }
        if (MEDV_fuzzy_maxExpansions) {
          medvStage.text.fuzzy.maxExpansions = MEDV_fuzzy_maxExpansions
        }
        }
      if (MEDVSlop == 1) {
        medvStage.phrase.slop = MEDV_near;
        }
      if (MEDVwildcard == true) {
        medvStage.wildcard.allowAnalyzedField = MEDVwildcard;
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
        if (OPHV_fuzzy_maxEdits) {
          reporterStage.text.fuzzy.maxEdits = OPHV_fuzzy_maxEdits
        }
        if (OPHV_fuzzy_prefixLength) {
          reporterStage.text.fuzzy.prefixLength = OPHV_fuzzy_prefixLength
        }
        if (OPHV_fuzzy_maxExpansions) {
          reporterStage.text.fuzzy.maxExpansions = OPHV_fuzzy_maxExpansions
        }
        }
      if (OPHVSlop == 1) {
        reporterStage.phrase.slop = OPHV_near;
        }
      if (OPHVwildcard == true) {
        reporterStage.wildcard.allowAnalyzedField = OPHVwildcard;
        }
      calledAggregation[0].$search.compound.filter.push(reporterStage);
    }
  if (BNNA){
      let tapeNoStage = {
          "phrase": {
              "query": BNNA,
              "path": ['BNNA', 'BNNB', 'BNNC', 'BNND', 'BNNE', 'BNNF', 'BNNG', 'BNNH', 'BNNI', 'BNNJ', 'BNNK', 'BNNL', 'BNNM', 'BNNN']
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
          highlight: {  path: ['TITL', 'BEMK', 'BAGR', 'BBSK', 'KEYW', 'MEDV'] }      // changed from path: TITL
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
        if (BBSK_fuzzy_maxEdits) {
          bbskStage.text.fuzzy.maxEdits = BBSK_fuzzy_maxEdits
        }
        if (BBSK_fuzzy_prefixLength) {
          bbskStage.text.fuzzy.prefixLength = BBSK_fuzzy_prefixLength
        }
        if (BBSK_fuzzy_maxExpansions) {
          bbskStage.text.fuzzy.maxExpansions = BBSK_fuzzy_maxExpansions
        }
        }
      if (BBSKSlop == 1) {
        bbskStage.phrase.slop = BBSK_near;
        }
      if (BBSKwildcard == true) {
        bbskStage.wildcard.allowAnalyzedField = BBSKwildcard;
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
        if (TITL_fuzzy_maxEdits) {
          titlStage.text.fuzzy.maxEdits = TITL_fuzzy_maxEdits
        }
        if (TITL_fuzzy_prefixLength) {
          titlStage.text.fuzzy.prefixLength = TITL_fuzzy_prefixLength
        }
        if (TITL_fuzzy_maxExpansions) {
          titlStage.text.fuzzy.maxExpansions = TITL_fuzzy_maxExpansions
        }
        }
      if (TITLSlop == 1) {
        titlStage.phrase.slop = TITL_near;
        }
      if (TITLwildcard == true) {
        titlStage.wildcard.allowAnalyzedField = TITLwildcard;
        }
      calledAggregation[0].$search.compound.filter.push(titlStage);
    }
  if (BAGR){
      let bagrStage = {
          [BAGRSearchOption]: {
              "query": BAGR,
              "path": "BAGR",
          }};
      if (BAGRFuzzy == 1) {
        bagrStage.text.fuzzy = {};
        if (BAGR_fuzzy_maxEdits) {
          bagrStage.text.fuzzy.maxEdits = BAGR_fuzzy_maxEdits
        }
        if (BAGR_fuzzy_prefixLength) {
          bagrStage.text.fuzzy.prefixLength = BAGR_fuzzy_prefixLength
        }
        if (BAGR_fuzzy_maxExpansions) {
          bagrStage.text.fuzzy.maxExpansions = BAGR_fuzzy_maxExpansions
        }
        }
      if (BAGRSlop == 1) {
        bagrStage.phrase.slop = BAGR_near;
        }
      if (BAGRwildcard == true) {
        bagrStage.wildcard.allowAnalyzedField = BAGRwildcard;
        }
      calledAggregation[0].$search.compound.filter.push(bagrStage);
    }
  if (MEDV){
      let medvStage = {
          [MEDVSearchOption]: {
              "query": MEDV,
              "path": "MEDV",
          }};
      if (MEDVFuzzy == 1) {
        medvStage.text.fuzzy = {};
        if (MEDV_fuzzy_maxEdits) {
          medvStage.text.fuzzy.maxEdits = MEDV_fuzzy_maxEdits
        }
        if (MEDV_fuzzy_prefixLength) {
          medvStage.text.fuzzy.prefixLength = MEDV_fuzzy_prefixLength
        }
        if (MEDV_fuzzy_maxExpansions) {
          medvStage.text.fuzzy.maxExpansions = MEDV_fuzzy_maxExpansions
        }
        }
      if (MEDVSlop == 1) {
        medvStage.phrase.slop = MEDV_near;
        }
      if (MEDVwildcard == true) {
        medvStage.wildcard.allowAnalyzedField = MEDVwildcard;
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
        if (OPHV_fuzzy_maxEdits) {
          reporterStage.text.fuzzy.maxEdits = OPHV_fuzzy_maxEdits
        }
        if (OPHV_fuzzy_prefixLength) {
          reporterStage.text.fuzzy.prefixLength = OPHV_fuzzy_prefixLength
        }
        if (OPHV_fuzzy_maxExpansions) {
          reporterStage.text.fuzzy.maxExpansions = OPHV_fuzzy_maxExpansions
        }
        }
      if (OPHVSlop == 1) {
        reporterStage.phrase.slop = OPHV_near;
        }
      if (OPHVwildcard == true) {
        reporterStage.wildcard.allowAnalyzedField = OPHVwildcard;
        }
      calledAggregation[0].$search.compound.filter.push(reporterStage);
    }
  if (BNNA){
      let tapeNoStage = {
          "phrase": {
              "query": BNNA,
              "path": ['BNNA', 'BNNB', 'BNNC', 'BNND', 'BNNE', 'BNNF', 'BNNG', 'BNNH', 'BNNI', 'BNNJ', 'BNNK', 'BNNL', 'BNNM', 'BNNN']
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
