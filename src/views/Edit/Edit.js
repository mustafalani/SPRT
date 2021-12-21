import React from 'react'
import {useState, useEffect} from 'react'
import FloatingLabelInput from 'react-floating-label-input';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CFormGroup,
  CRow,
  CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import MongoQueries from '../../utils/api/mongoQueries';

var url = window.location.href
var docID = url.substring(url.lastIndexOf('/') + 1);
//var _document = {}

const QuillOptions = {
          toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      [{'color': []}],
                      [{'background': []}],
                      ['link', 'video'],
                      ['clean'],
                      ['code-block']
                    ],
      };

const Edit = () => {

const QuillData = {"_id": docID};

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


async function saveDoc() {

    MongoQueries.SaveDocument(QuillData).then(function (response) {
                if(!response.ok){
                    console.log(response);
                    if (response.json.length === 0)
                    toast.error("Something Went Wrong!");
                }
                return response.json();
            })
            .then(function (resultJSON) {
                if (resultJSON["$undefined"] === true) {
                    toast.error("Something Went Wrong!");
                    console.log('Something Went Wrong');
                    return(resultJSON);
                } else {
                    console.log("Saving... "  );
                    if (resultJSON.modifiedCount.$numberInt > 0) {
                        toast.success("Changes Have been Successfully Saved")
                        console.log('it is not zero')
                    } else {
                        toast.info("There are no changes to save in the document")
                        console.log('it is zero')
                    }
                }  // end of ELSE
})
}



const QuillChange = (html, delta, source, editor, key) => {
  if (source !== 'api')
    {
        html = html.replace(/<\/?p>/g, '')
        QuillData[key] = html
   }
}

useEffect(() => {
  getDocByID()
}, [])

console.log(doc)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="9" className="search-form-group">
            <CCardHeader>
              Editing Document
              <small style={{color: 'blue' }}> {docID}</small>
              <DocsLink name="search"/>
            </CCardHeader>
            <CCardBody>
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
                    if (key !== "_id" && key!== "DOCN") {
                      Quill.register({'attributors/attribute/id': key}, true);
                        return (
                          <CFormGroup row>
                          <CCard>
                            <CCardHeader>
                              <CLabel labelFor={key}>{itemName}</CLabel>
                            </CCardHeader>
                            <CCardBody>
                              <CFormGroup>
                                <CCol sm="12" className='QuillHeader'>
                                    <ReactQuill id={key} modules={QuillOptions} value={value} onChange={(html, delta, source, editor) => {QuillChange(html, delta, source, editor, key)}}/>
                                </CCol>
                              </CFormGroup>
                            </CCardBody>
                          </CCard>
                          </CFormGroup>
                        )
                      }
                    })()}
                  </>
                  ))
                }
            </CCardBody>
            <CCardFooter>
              <CButton color="danger" onClick={() => getDocByID()} style={{ width: '30%' }}>Discard Changes</CButton> <CButton color="secondary" onClick={() => saveDoc()} style={{ width: '30%' }}>Save</CButton>
            </CCardFooter>
        </CCol>
      </CRow>
    </>
  )
}

export default Edit
