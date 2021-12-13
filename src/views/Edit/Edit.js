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
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import MongoQueries from '../../utils/api/mongoQueries';

var url = window.location.href
var docID = url.substring(url.lastIndexOf('/') + 1);
//var _document = {}

const Edit = ({value}) => {

const [doc, setDoc] = useState([])

async function getDocByID() {

    MongoQueries.FindDocByID(docID).then(function (response) {
                if(!response.ok){
                    console.log(response);
                    if (response.json.length === 0)
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (resultJSON) {
                if (resultJSON["$undefined"] === true) {
                    console.log('NO FETCH RESULT');
                    return(resultJSON);
                } else {
                    console.log("FETCHED RESULT... "  );
                    if (resultJSON.length !== 0) {
                        console.log("Fetched array has " + resultJSON.length + " entries");
                        console.log(resultJSON);
                        setDoc(resultJSON[0])
                    } else {
                        console.log("Fetched array has " + resultJSON.length + " entries");
                        setDoc(resultJSON[0])
                    }
                }  // end of ELSE
})
}

useEffect(() => {
  getDocByID()
}, [])

console.log(doc)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="9" className="search-form-group">
          <CCard>
            <CCardHeader>
              Edit Document
              <small style={{color: 'blue' }}> {docID}</small>
              <DocsLink name="search"/>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                    <FloatingLabelInput id="TITL" label="Titel:" value={doc.TITL} required/>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
                {
                  Object.entries(doc).map(([key, value]) => (
                  <>
                  {(function() {
                    var itemName = ''
                    if (key === "TITL")
                      {
                      itemName = "Titel"
                      }

                      else if (key === "UDAT")
                      {
                      itemName = "Udsendelsesdato"
                      }

                      else if (key === "OPHV")
                      {
                      itemName = "Reporter"
                      }

                      else if (key === "BEMK") {
                      itemName = "Bemærk"
                      }

                      else if (key === "BAGR") {
                      itemName = "Baggrund"
                      }

                      else if (key === "BBSK") {
                      itemName = "Billedbeskrivelse"
                      }

                      else if (key === "MEDV") {
                      itemName = "Medvirkende"
                      }

                      else if (key === "KEYW") {
                      itemName = "Emneord"
                      }

                      else if (key === "LOKA") {
                      itemName = "Lokalitet"
                      }

                      else if (key === "BNTA") {
                      itemName = "Båndtype"
                      }

                      else if (key === "BNNA") {
                      itemName = "Båndnummer"
                      }

                      else if (key === "BNFA") {
                      itemName = "Båndformat"
                      }

                      else if (key === "LYDA") {
                      itemName = "Lyd"
                      }

                      else if (key === "TVST") {
                      itemName = "TV Station"
                      }

                      else if (key === "STAT") {
                      itemName = "Stat"
                      }
                      else {(itemName = key)}
                    if (key !== "_id" && key!== "TITL" && key!== "DOCN") {
                        return (
                          <CFormGroup row>
                            <CCol sm="12">
                              <CFormGroup class="search-form-control" style={{ fontSize: 18 }}>
                                <FloatingLabelInput id={key} label={itemName} value={value} required/>
                              </CFormGroup>
                            </CCol>
                          </CFormGroup>
                        )
                      }
                    })()}
                  </>
                  ))
                }
              <CFormGroup row>
                <CCol>
                  <CInputGroupAppend>
                    <CButton color="secondary" onClick={() => MongoQueries.FindDocByID(docID)} style={{ width: '100%' }}>Save</CButton>
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

export default Edit
