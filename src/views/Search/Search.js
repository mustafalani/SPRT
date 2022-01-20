import React from 'react'
import {useState, useEffect} from 'react'
import FloatingLabelInput from 'react-floating-label-input';
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
  CInput
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import MongoDB from '../../utils/api/MongoDB';



const Search = ({value}) => {

const searchOptions = {
    "arg": "phrase",
    "BBSK": "phrase",
    "TITL": "phrase",
    "BAGR": "phrase",
    "OPHV": "phrase",
    "MEDV": "phrase"
}

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
        <CCol xs="12" sm="9" className="search-form-group">
          <CCard>
            <CCardHeader>
              Søgning med
              <small> SPRT</small>
              <DocsLink name="search"/>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="fritext" label="Fritekst:" value={value} required/>
                  </CFormGroup>
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
                    <CFormGroup variant="custom-radio" style={{ 'margin-right': 5}} inline>
                      <CInputRadio custom id="arg-radio4" name="arg" onChange={() => handleOptions('arg','near')}/>
                      <CLabel variant="custom-checkbox" htmlFor="arg-radio4">Near</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ width: 70, padding:0 }} inline>
                      <CInput type="number" className="search-near-number" id="Near" name="arg" onChange={e => handleOptions('arg_near',e.target.value)} placeholder="words"/>
                    </CFormGroup>
                  </div>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="BBSK" label="Billedbeskrivelse:" value={value} required/>
                  </CFormGroup>
                  <div class="search-options-radio">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BBSK-radio1" name="BBSK" onChange={() => handleOptions('BBSK','phrase')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BBSK-radio1">Exact</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BBSK-radio2" name="BBSK" onChange={() => handleOptions('BBSK','and')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BBSK-radio2">And</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BBSK-radio3" name="BBSK" onChange={() => handleOptions('BBSK','text')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BBSK-radio3">Any</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BBSK-radio4" name="BBSK" onChange={() => handleOptions('BBSK','fuzzy')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BBSK-radio4">Fuzzy</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ 'margin-right': 5}} inline>
                      <CInputRadio custom id="BBSK-radio5" name="BBSK" onChange={() => handleOptions('BBSK','near')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BBSK-radio5">Near</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ width: 70, padding:0 }} inline>
                      <CInput type="number" className="search-near-number" id="BBSK-Near" name="BBSK" onChange={e => handleOptions('BBSK_near',e.target.value)} placeholder="words"/>
                    </CFormGroup>
                  </div>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="TITL" label="Titel:" value={value} required/>
                  </CFormGroup>
                  <div class="search-options-radio">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="TITL-radio1" name="TITL" onChange={() => handleOptions('TITL','phrase')}/>
                      <CLabel variant="custom-checkbox" htmlFor="TITL-radio1">Exact</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="TITL-radio2" name="TITL" onChange={() => handleOptions('TITL','and')}/>
                      <CLabel variant="custom-checkbox" htmlFor="TITL-radio2">And</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="TITL-radio3" name="TITL" onChange={() => handleOptions('TITL','text')}/>
                      <CLabel variant="custom-checkbox" htmlFor="TITL-radio3">Any</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="TITL-radio4" name="TITL" onChange={() => handleOptions('TITL','fuzzy')}/>
                      <CLabel variant="custom-checkbox" htmlFor="TITL-radio4">Fuzzy</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ 'margin-right': 5}} inline>
                      <CInputRadio custom id="TITL-radio5" name="TITL" onChange={() => handleOptions('TITL','near')}/>
                      <CLabel variant="custom-checkbox" htmlFor="TITL-radio5">Near</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ width: 70, padding:0 }} inline>
                      <CInput type="number" className="search-near-number" id="TITL-Near" name="TITL" onChange={e => handleOptions('TITL_near',e.target.value)} placeholder="words"/>
                    </CFormGroup>
                  </div>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="BAGR" label="Baggrund:" value={value} required/>
                  </CFormGroup>
                  <div class="search-options-radio">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BAGR-radio1" name="BAGR" onChange={() => handleOptions('BAGR','phrase')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BAGR-radio1">Exact</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BAGR-radio2" name="BAGR" onChange={() => handleOptions('BAGR','and')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BAGR-radio2">And</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BAGR-radio3" name="BAGR" onChange={() => handleOptions('BAGR','text')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BAGR-radio3">Any</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="BAGR-radio4" name="BAGR" onChange={() => handleOptions('BAGR','fuzzy')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BAGR-radio4">Fuzzy</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ 'margin-right': 5}} inline>
                      <CInputRadio custom id="BAGR-radio5" name="BAGR" onChange={() => handleOptions('BAGR','near')}/>
                      <CLabel variant="custom-checkbox" htmlFor="BAGR-radio5">Near</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ width: 70, padding:0 }} inline>
                      <CInput type="number" className="search-near-number" id="BAGR-Near" name="BAGR" onChange={e => handleOptions('BAGR_near',e.target.value)} placeholder="words"/>
                    </CFormGroup>
                  </div>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="OPHV" label="Reporter:" value={value} required/>
                  </CFormGroup>
                  <div class="search-options-radio">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="OPHV-radio1" name="OPHV" onChange={() => handleOptions('OPHV','phrase')}/>
                      <CLabel variant="custom-checkbox" htmlFor="OPHV-radio1">Exact</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="OPHV-radio2" name="OPHV" onChange={() => handleOptions('OPHV','and')}/>
                      <CLabel variant="custom-checkbox" htmlFor="OPHV-radio2">And</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="OPHV-radio3" name="OPHV" onChange={() => handleOptions('OPHV','text')}/>
                      <CLabel variant="custom-checkbox" htmlFor="OPHV-radio3">Any</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="OPHV-radio4" name="OPHV" onChange={() => handleOptions('OPHV','fuzzy')}/>
                      <CLabel variant="custom-checkbox" htmlFor="OPHV-radio4">Fuzzy</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ 'margin-right': 5}} inline>
                      <CInputRadio custom id="OPHV-radio5" name="OPHV" onChange={() => handleOptions('OPHV','near')}/>
                      <CLabel variant="custom-checkbox" htmlFor="OPHV-radio5">Near</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ width: 70, padding:0 }} inline>
                      <CInput type="number" className="search-near-number" id="OPHV-Near" name="OPHV" onChange={e => handleOptions('OPHV_near',e.target.value)} placeholder="words"/>
                    </CFormGroup>
                  </div>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="MEDV" label="Medvirkende:" value={value} required/>
                  </CFormGroup>
                  <div class="search-options-radio">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="MEDV-radio1" name="MEDV" onChange={() => handleOptions('MEDV','phrase')}/>
                      <CLabel variant="custom-checkbox" htmlFor="MEDV-radio1">Exact</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="MEDV-radio2" name="MEDV" onChange={() => handleOptions('MEDV','and')}/>
                      <CLabel variant="custom-checkbox" htmlFor="MEDV-radio2">And</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="MEDV-radio3" name="MEDV" onChange={() => handleOptions('MEDV','text')}/>
                      <CLabel variant="custom-checkbox" htmlFor="MEDV-radio3">Any</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="MEDV-radio4" name="MEDV" onChange={() => handleOptions('MEDV','fuzzy')}/>
                      <CLabel variant="custom-checkbox" htmlFor="MEDV-radio4">Fuzzy</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ 'margin-right': 5}} inline>
                      <CInputRadio custom id="MEDV-radio5" name="MEDV" onChange={() => handleOptions('MEDV','near')}/>
                      <CLabel variant="custom-checkbox" htmlFor="MEDV-radio5">Near</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" style={{ width: 70, padding:0 }} inline>
                      <CInput type="number" className="search-near-number" id="MEDV-Near" name="MEDV" onChange={e => handleOptions('MEDV_near',e.target.value)} placeholder="words"/>
                    </CFormGroup>
                  </div>
                </CCol>
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
                    <CButton color="secondary" onClick={() => MongoDB.search(searchOptions)} style={{ width: '100%' }}>Søg</CButton>
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
