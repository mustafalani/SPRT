import React from 'react'
import {useState, useEffect} from 'react'
import FloatingLabelInput from 'react-floating-label-input';
import CookiesHelper from '../../utils/CookiesHelper';
import jwt_decode from "jwt-decode";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInputGroupAppend,
  CRow,
  CInputRadio,
  CLabel,
  CInput,
  CPopover,
  CCollapse,
  CFade,
  CLink,
  CTooltip,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import CIcon from '@coreui/icons-react'
import MongoQueries from '../../utils/api/mongoQueries';
//import MongoDB from '../../utils/api/MongoDB';

const access_token = CookiesHelper.getCookie('access_token')
const decoded_access_token = jwt_decode(access_token);

const Search = ({value}) => {

const searchOptions = {
    "arg": "phrase",
    "BBSK": "phrase",
    "TITL": "phrase",
    "BAGR": "phrase",
    "OPHV": "phrase",
    "MEDV": "phrase"
}

const [collapsed_arg, setCollapsed_arg] = React.useState(true)
const [collapsed_BBSK, setCollapsed_BBSK] = React.useState(true)
const [collapsed_TITL, setCollapsed_TITL] = React.useState(true)
const [collapsed_BAGR, setCollapsed_BAGR] = React.useState(true)
const [collapsed_OPHV, setCollapsed_OPHV] = React.useState(true)
const [collapsed_MEDV, setCollapsed_MEDV] = React.useState(true)
const [showCard, setShowCard] = React.useState(true)

function handleOptions(textField,searchOption) {
  searchOptions[textField] = searchOption
}

function print() {
  console.log(searchOptions)
}

const refreshPage = ()=>{
     window.location.reload();
  }

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" className="search-form-group">
          <CCard>
            <CCardHeader>
              Søgning med
              <small> SPRT</small>
              <DocsLink name="search"/>
            </CCardHeader>
            <CCardBody>

              <CFormGroup row>
                <div>
                   <CCol xs="12" sm="12" className="search-form-group">
                      <CFade className="row" in={showCard}>
                         <div className="search-field-card">
                            <CCardBody style={{ 'padding': 'unset'}}>
                            <FloatingLabelInput className='FloatingLabelInput' id="fritext" label="Fritekst:" value={value} required/>
                            <div className="search-config-icon">
                               <CLink className="card-header-action" onClick={() => setCollapsed_arg(!collapsed_arg)}>
                                  <CIcon name={collapsed_arg ? 'cil-settings':'cil-settings'} />
                               </CLink>
                            </div>
                            <div class="search-options-radio">
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="arg-radio1" name="arg" onChange={() => handleOptions('arg','phrase')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="arg-radio1">Exact</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="arg-radio2" name="arg" onChange={() => handleOptions('arg','and','arg_near',1000)}/>
                                  <CLabel variant="custom-checkbox" htmlFor="arg-radio2">And</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="arg-radio3" name="arg" onChange={() => handleOptions('arg','text')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="arg-radio3">Any</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="arg-radio4" name="arg" onChange={() => handleOptions('arg','fuzzy')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="arg-radio4">Fuzzy</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="arg-radio5" name="arg" onChange={() => handleOptions('arg','wildcard')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="arg-radio5">Wildcard</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" style={{ 'marginRight': '2.5rem'}} inline>
                               <CInputRadio custom id="arg-radio6" name="arg" onChange={() => handleOptions('arg','near')}/>
                               <CLabel variant="custom-checkbox" htmlFor="arg-radio6">Near</CLabel>
                               </CFormGroup>
                            </div>
                            <br></br>
                            <CCollapse className='search-options-config' show={!collapsed_arg}>
                              <CTooltip className="tooltip-box" content="Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2.">
                                <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxEdits</p>
                              </CTooltip>
                              <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzymaxEdits" name="fuzzymaxEdits" onChange={e => handleOptions('arg_fuzzy_maxEdits',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.">
                                 <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.prefixLength</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e => handleOptions('arg_fuzzy_prefixLength',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.">
                                 <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxExpansions</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e => handleOptions('arg_fuzzy_maxExpansions',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words.">
                                 <p style={{ display: 'inline-block', cursor: 'help'}}>Near.distance</p>
                                 </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="Near" name="arg" onChange={e =>
                               handleOptions('arg_near',e.target.value)}/>
                               </CFormGroup>
                            </CCollapse>
                            </CCardBody>
                         </div>
                      </CFade>
                   </CCol>
                </div>
              </CFormGroup>

              <CFormGroup row>
                <div>
                   <CCol xs="12" sm="12" className="search-form-group">
                      <CFade className="row" in={showCard}>
                         <div className="search-field-card">
                            <CCardBody style={{ 'padding': 'unset'}}>
                            <FloatingLabelInput className='FloatingLabelInput' id="BBSK" label="Billedbeskrivelse:" value={value} required/>
                            <div className="search-config-icon">
                               <CLink className="card-header-action" onClick={() => setCollapsed_BBSK(!collapsed_BBSK)}>
                                  <CIcon name={collapsed_BBSK ? 'cil-settings':'cil-settings'} />
                               </CLink>
                            </div>
                            <div class="search-options-radio">
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BBSK-radio1" name="BBSK" onChange={() =>handleOptions('BBSK','phrase')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BBSK-radio1">Exact</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BBSK-radio2" name="BBSK" onChange={() =>handleOptions('BBSK','and')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BBSK-radio2">And</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BBSK-radio3" name="BBSK" onChange={() =>handleOptions('BBSK','text')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BBSK-radio3">Any</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BBSK-radio4" name="BBSK" onChange={() =>handleOptions('BBSK','fuzzy')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BBSK-radio4">Fuzzy</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BBSK-radio5" name="BBSK" onChange={() =>handleOptions('BBSK','wildcard')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BBSK-radio5">Wildcard</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" style={{ 'marginRight': '2.5rem'}} inline>
                               <CInputRadio custom id="BBSK-radio6" name="BBSK" onChange={() =>handleOptions('BBSK','near')}/>
                               <CLabel variant="custom-checkbox" htmlFor="BBSK-radio6">Near</CLabel>
                               </CFormGroup>
                            </div>
                            <br></br>
                            <CCollapse className='search-options-config' show={!collapsed_BBSK}>
                              <CTooltip className="tooltip-box" content="Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxEdits</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzymaxEdits" name="fuzzymaxEdits" onChange={e =>handleOptions('BBSK_fuzzy_maxEdits',e.target.value)}/>
                               </CFormGroup><CTooltip className="tooltip-box" content="Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.prefixLength</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('BBSK_fuzzy_prefixLength',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxExpansions</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('BBSK_fuzzy_maxExpansions',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words. The default is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Near.distance</p>
                               </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="Near" name="BBSK" onChange={e =>handleOptions('BBSK_near',e.target.value)}/>
                               </CFormGroup>
                            </CCollapse>
                            </CCardBody>
                         </div>
                      </CFade>
                   </CCol>
                </div>
              </CFormGroup>

              <CFormGroup row>
                <div>
                   <CCol xs="12" sm="12" className="search-form-group">
                      <CFade className="row" in={showCard}>
                         <div className="search-field-card">
                            <CCardBody style={{ 'padding': 'unset'}}>
                            <FloatingLabelInput className='FloatingLabelInput' id="TITL" label="Titel:" value={value} required/>
                            <div className="search-config-icon">
                               <CLink className="card-header-action" onClick={() => setCollapsed_TITL(!collapsed_TITL)}>
                                  <CIcon name={collapsed_TITL ? 'cil-settings':'cil-settings'} />
                               </CLink>
                            </div>
                            <div class="search-options-radio">
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="TITL-radio1" name="TITL" onChange={() =>handleOptions('TITL','phrase')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="TITL-radio1">Exact</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="TITL-radio2" name="TITL" onChange={() =>handleOptions('TITL','and')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="TITL-radio2">And</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="TITL-radio3" name="TITL" onChange={() =>handleOptions('TITL','text')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="TITL-radio3">Any</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="TITL-radio4" name="TITL" onChange={() =>handleOptions('TITL','fuzzy')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="TITL-radio4">Fuzzy</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="TITL-radio5" name="TITL" onChange={() =>handleOptions('TITL','wildcard')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="TITL-radio5">Wildcard</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" style={{ 'marginRight': '2.5rem'}} inline>
                               <CInputRadio custom id="TITL-radio6" name="TITL" onChange={() =>handleOptions('TITL','near')}/>
                               <CLabel variant="custom-checkbox" htmlFor="TITL-radio6">Near</CLabel>
                               </CFormGroup>
                            </div>
                            <br></br>
                            <CCollapse className='search-options-config' show={!collapsed_TITL}>
                              <CTooltip className="tooltip-box" content="Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxEdits</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzymaxEdits" name="fuzzymaxEdits" onChange={e =>handleOptions('TITL_fuzzy_maxEdits',e.target.value)}/>
                               </CFormGroup><CTooltip className="tooltip-box" content="Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.prefixLength</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('TITL_fuzzy_prefixLength',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxExpansions</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('TITL_fuzzy_maxExpansions',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words. The default is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Near.distance</p>
                               </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="Near" name="TITL" onChange={e =>handleOptions('TITL_near',e.target.value)}/>
                               </CFormGroup>
                            </CCollapse>
                            </CCardBody>
                         </div>
                      </CFade>
                   </CCol>
                </div>
              </CFormGroup>

              <CFormGroup row>
                <div>
                   <CCol xs="12" sm="12" className="search-form-group">
                      <CFade className="row" in={showCard}>
                         <div className="search-field-card">
                            <CCardBody style={{ 'padding': 'unset'}}>
                            <FloatingLabelInput className='FloatingLabelInput' id="BAGR" label="Baggrund:" value={value} required/>
                            <div className="search-config-icon">
                               <CLink className="card-header-action" onClick={() => setCollapsed_BAGR(!collapsed_BAGR)}>
                                  <CIcon name={collapsed_BAGR ? 'cil-settings':'cil-settings'} />
                               </CLink>
                            </div>
                            <div class="search-options-radio">
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BAGR-radio1" name="BAGR" onChange={() =>handleOptions('BAGR','phrase')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BAGR-radio1">Exact</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BAGR-radio2" name="BAGR" onChange={() =>handleOptions('BAGR','and')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BAGR-radio2">And</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BAGR-radio3" name="BAGR" onChange={() =>handleOptions('BAGR','text')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BAGR-radio3">Any</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BAGR-radio4" name="BAGR" onChange={() =>handleOptions('BAGR','fuzzy')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BAGR-radio4">Fuzzy</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="BAGR-radio5" name="BAGR" onChange={() =>handleOptions('BAGR','wildcard')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="BAGR-radio5">Wildcard</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" style={{ 'marginRight': '2.5rem'}} inline>
                               <CInputRadio custom id="BAGR-radio6" name="BAGR" onChange={() =>handleOptions('BAGR','near')}/>
                               <CLabel variant="custom-checkbox" htmlFor="BAGR-radio6">Near</CLabel>
                               </CFormGroup>
                            </div>
                            <br></br>
                            <CCollapse className='search-options-config' show={!collapsed_BAGR}>
                              <CTooltip className="tooltip-box" content="Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxEdits</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzymaxEdits" name="fuzzymaxEdits" onChange={e =>handleOptions('BAGR_fuzzy_maxEdits',e.target.value)}/>
                               </CFormGroup><CTooltip className="tooltip-box" content="Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.prefixLength</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('BAGR_fuzzy_prefixLength',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxExpansions</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('BAGR_fuzzy_maxExpansions',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words. The default is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Near.distance</p>
                               </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="Near" name="BAGR" onChange={e =>handleOptions('BAGR_near',e.target.value)}/>
                               </CFormGroup>
                            </CCollapse>
                            </CCardBody>
                         </div>
                      </CFade>
                   </CCol>
                </div>
              </CFormGroup>

              <CFormGroup row>
                <div>
                   <CCol xs="12" sm="12" className="search-form-group">
                      <CFade className="row" in={showCard}>
                         <div className="search-field-card">
                            <CCardBody style={{ 'padding': 'unset'}}>
                            <FloatingLabelInput className='FloatingLabelInput' id="OPHV" label="Reporter:" value={value} required/>
                            <div className="search-config-icon">
                               <CLink className="card-header-action" onClick={() => setCollapsed_OPHV(!collapsed_OPHV)}>
                                  <CIcon name={collapsed_OPHV ? 'cil-settings':'cil-settings'} />
                               </CLink>
                            </div>
                            <div class="search-options-radio">
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="OPHV-radio1" name="OPHV" onChange={() =>handleOptions('OPHV','phrase')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="OPHV-radio1">Exact</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="OPHV-radio2" name="OPHV" onChange={() =>handleOptions('OPHV','and')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="OPHV-radio2">And</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="OPHV-radio3" name="OPHV" onChange={() =>handleOptions('OPHV','text')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="OPHV-radio3">Any</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="OPHV-radio4" name="OPHV" onChange={() =>handleOptions('OPHV','fuzzy')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="OPHV-radio4">Fuzzy</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="OPHV-radio5" name="OPHV" onChange={() =>handleOptions('OPHV','wildcard')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="OPHV-radio5">Wildcard</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" style={{ 'marginRight': '2.5rem'}} inline>
                               <CInputRadio custom id="OPHV-radio6" name="OPHV" onChange={() =>handleOptions('OPHV','near')}/>
                               <CLabel variant="custom-checkbox" htmlFor="OPHV-radio6">Near</CLabel>
                               </CFormGroup>
                            </div>
                            <br></br>
                            <CCollapse className='search-options-config' show={!collapsed_OPHV}>
                              <CTooltip className="tooltip-box" content="Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxEdits</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzymaxEdits" name="fuzzymaxEdits" onChange={e =>handleOptions('OPHV_fuzzy_maxEdits',e.target.value)}/>
                               </CFormGroup><CTooltip className="tooltip-box" content="Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.prefixLength</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('OPHV_fuzzy_prefixLength',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxExpansions</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('OPHV_fuzzy_maxExpansions',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words. The default is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Near.distance</p>
                               </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="Near" name="OPHV" onChange={e =>handleOptions('OPHV_near',e.target.value)}/>
                               </CFormGroup>
                            </CCollapse>
                            </CCardBody>
                         </div>
                      </CFade>
                   </CCol>
                </div>
              </CFormGroup>

              <CFormGroup row>
                <div>
                   <CCol xs="12" sm="12" className="search-form-group">
                      <CFade className="row" in={showCard}>
                         <div className="search-field-card">
                            <CCardBody style={{ 'padding': 'unset'}}>
                            <FloatingLabelInput className='FloatingLabelInput' id="MEDV" label="Medvirkende:" value={value} required/>
                            <div className="search-config-icon">
                               <CLink className="card-header-action" onClick={() => setCollapsed_MEDV(!collapsed_MEDV)}>
                                  <CIcon name={collapsed_MEDV ? 'cil-settings':'cil-settings'} />
                               </CLink>
                            </div>
                            <div class="search-options-radio">
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="MEDV-radio1" name="MEDV" onChange={() =>handleOptions('MEDV','phrase')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="MEDV-radio1">Exact</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="MEDV-radio2" name="MEDV" onChange={() =>handleOptions('MEDV','and')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="MEDV-radio2">And</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="MEDV-radio3" name="MEDV" onChange={() =>handleOptions('MEDV','text')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="MEDV-radio3">Any</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="MEDV-radio4" name="MEDV" onChange={() =>handleOptions('MEDV','fuzzy')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="MEDV-radio4">Fuzzy</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio custom id="MEDV-radio5" name="MEDV" onChange={() =>handleOptions('MEDV','wildcard')}/>
                                  <CLabel variant="custom-checkbox" htmlFor="MEDV-radio5">Wildcard</CLabel>
                               </CFormGroup>
                               <CFormGroup variant="custom-radio" style={{ 'marginRight': '2.5rem'}} inline>
                               <CInputRadio custom id="MEDV-radio6" name="MEDV" onChange={() =>handleOptions('MEDV','near')}/>
                               <CLabel variant="custom-checkbox" htmlFor="MEDV-radio6">Near</CLabel>
                               </CFormGroup>
                            </div>
                            <br></br>
                            <CCollapse className='search-options-config' show={!collapsed_MEDV}>
                              <CTooltip className="tooltip-box" content="Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxEdits</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzymaxEdits" name="fuzzymaxEdits" onChange={e =>handleOptions('MEDV_fuzzy_maxEdits',e.target.value)}/>
                               </CFormGroup><CTooltip className="tooltip-box" content="Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.prefixLength</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('MEDV_fuzzy_prefixLength',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Fuzzy.maxExpansions</p>
                              </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="fuzzyprefixLength" name="fuzzyprefixLength" onChange={e =>handleOptions('MEDV_fuzzy_maxExpansions',e.target.value)}/>
                               </CFormGroup>
                               <CTooltip className="tooltip-box" content="Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words. The default is 0.">
                               <p style={{ display: 'inline-block', cursor: 'help'}}>Near.distance</p>
                               </CTooltip>
                               <CFormGroup variant="custom-radio" style={{ width: 70, padding:5 ,margin:0}} inline>
                               <CInput type="number" className="search-near-number" id="Near" name="MEDV" onChange={e =>handleOptions('MEDV_near',e.target.value)}/>
                               </CFormGroup>
                            </CCollapse>
                            </CCardBody>
                         </div>
                      </CFade>
                   </CCol>
                </div>
              </CFormGroup>

              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="KEYW" label="Emneord:" value={value} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="UDAT" label="Udsendelsesdato:" placeholder="YYYYMMDD" value={value} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="BNNA" label="Båndnummer:" value={value} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol>
                  <CInputGroupAppend>
                    <CButton color="secondary" onClick={() => MongoQueries.Search(searchOptions)} style={{ width: '100%' }}>Søg</CButton>
                  </CInputGroupAppend>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol>
                  <CInputGroupAppend>
                    <CButton color="danger" onClick={refreshPage} style={{ width: '100%' }}>Rens alle felter</CButton>
                  </CInputGroupAppend>
                </CCol>
              </CFormGroup>

            </CCardBody>
            <div class="col-md">
                <div className='d-flex justify-content-center align-items-center'>
                    <div class="text-center">
                        <h3 id="counter" className="font-weight-bold text-center "></h3>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                        <div id="results"></div>
                  </div>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Search
