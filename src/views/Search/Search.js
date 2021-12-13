import React from 'react'
import FloatingLabelInput from 'react-floating-label-input';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInputGroupAppend,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import MongoDB from '../../utils/api/MongoDB';

const Search = ({value}) => {

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
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="BBSK" label="Billedbeskrivelse:" value={value} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="TITL" label="Titel:" value={value} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="OPHV" label="Reporter:" value={value} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="MEDV" label="Medvirkende:" value={value} required/>
                  </CFormGroup>
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
                    <CButton color="secondary" onClick={() => MongoDB.search()} style={{ width: '100%' }}>Søg</CButton>
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
