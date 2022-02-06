import React from 'react'
import {useState, useEffect} from 'react'
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
  CLabel,
  CCollapse,
  CFade,
  CLink,
  CTooltip,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import MongoQueries from '../../utils/api/mongoQueries';

import settings from '../../utils/api/settings.js';
const fields = settings[0].Fields

var url = window.location.href
var docID = 'Last Inserted Document'

const QuillOptions = {
          toolbar: false
      };

const LastInsertedDocument = () => {

  const [doc, setDoc] = useState([])
  const update = {"_id": ''};
  const setData = {};
  const unsetData = {};

  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(true)

  const [collapse, setCollapse] = useState(true)

  const [danger, setDanger] = useState(false)

// #1
  async function LastInsertedDocument() {

      MongoQueries.LastInsertedDocument().then(function (response) {
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
                      }
                  }  // end of ELSE
              })
  }
// #2
  async function saveDoc() {

      update['set'] = setData
      update['unset'] = unsetData

      MongoQueries.SaveDocument(update).then(function (response) {
                  if(!response.ok){
                      console.log(response);
                      if (response.json.length === 0)
                      toast.error("Something went wrong!");
                  }
                  return response.json();
              })
              .then(function (resultJSON) {
                  if (resultJSON["$undefined"] === true) {
                      toast.error("Something went wrong!");
                      console.log('Something went wrong');
                      return(resultJSON);
                  } else {
                      console.log("Saving... "  );
                      if (resultJSON.modifiedCount.$numberInt > 0) {
                          toast.success("Changes have been successfully saved")

                      } else {
                          toast.info("There are no changes to save in the document")
                      }
                  }
                })
    for (var unset in unsetData) {
      var element = document.getElementById('form-'+unset);
      element.remove()
    }
    //console.log('unset', unsetData)
    //console.log('set', setData)
    //console.log('update', update)
  }
// #3
  async function deleteDocByID() {
      var confirmation_id = document.getElementById('confirm-id').value;
      if (confirmation_id === '') {
        toast.error("Type the document ID to confirm.")
      }
      else if (confirmation_id !== docID) {
        toast.error("Wrong ID!")
      }
      else {
        console.log('good ', confirmation_id)
        MongoQueries.deleteDocument(docID).then(function (response) {
                if(!response.ok){
                    console.log(response);
                    if (response.json.length === 0)
                    toast.error("Something went wrong!");
                }
                return response.json();
                })
                .then(function (resultJSON) {
                if (resultJSON["$undefined"] === true) {
                    toast.error("Something went wrong!");
                    console.log('Something went wrong');
                    return(resultJSON);
                } else {
                    console.log("Deleteing... "  );
                    if (resultJSON.deletedCount.$numberInt > 0) {
                        toast.success("The Document "+docID+" has been deleted")
                        window.open('#/search/','_self');

                    } else {
                        toast.success("The Document "+docID+" can't be deleted")
                    }
                }
                })
                setDanger(!danger)
      }

  }



  const QuillChange = (html, delta, source, editor, key) => {
    if (source !== 'api')
      {
          html = html.replace(/<\/?p>/g, '')
          setData[key] = html
     }
  }

  const removeField = (key) => {
          unsetData[key] = ''
          var element = document.getElementById('card-'+key);
          element.classList.add('to-be-removed');
  }

  const reset = (key) => {
          delete unsetData[key]
          var element = document.getElementById('card-'+key);
          element.classList.remove('to-be-removed');
  }

  async function addNewField (fieldName) {
    //var newField = {[fieldName]:fieldText}
    doc[fieldName] = '{'+fieldName+'}'

    const newDoc = [{...doc}];
      for(let i = newDoc.length - 1; i >= 0; i--){
        let temp, j;
        j = Math.floor(Math.random() * i);
        temp = newDoc[i];
        newDoc[i] = doc[j];
        newDoc[j] = temp;
      }
    setDoc(newDoc[0])
  }

  useEffect(() => {
    LastInsertedDocument()
  }, [])

  function print() {
    console.log('unset', unsetData)
    console.log('set', setData)
    console.log('update', update)
  }

  console.log(doc)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" className="search-form-group">
            <CCardHeader>
              <code> {docID}</code>
              <DocsLink name="search"/>
            </CCardHeader>
            <CCardBody>
                {
                  Object.entries(doc).map(([key, value]) => (
                  <>
                  {(function() {
                    var itemName
                    if (fields[key] !== undefined) {
                      itemName = fields[key]
                    }
                    else {
                      itemName = key
                    }
                    if (key === "_id") {
                      Quill.register({'attributors/attribute/id': key}, true);
                        return (
                          <CFormGroup id={'form-'+key} row>
                          <CCard id={'card-'+key}>
                            <CCardHeader>
                              <CLabel labelFor={key}>{itemName}</CLabel>
                            </CCardHeader>
                            <CCardBody>
                              <CFormGroup>
                                <CCol sm="12" className='QuillHeader'>
                                    <ReactQuill readOnly id={key} modules={QuillOptions} value={value["$oid"]}/>
                                    <br></br>
                                </CCol>
                              </CFormGroup>
                            </CCardBody>

                          </CCard>
                          </CFormGroup>
                        )
                    }
                    if (key !== "_id") {
                      Quill.register({'attributors/attribute/id': key}, true);
                        return (
                          <CFormGroup id={'form-'+key} row>
                          <CCard id={'card-'+key}>
                            <CCardHeader>
                              <CLabel labelFor={key}>{itemName}</CLabel>
                            </CCardHeader>
                            <CCardBody>
                              <CFormGroup>
                                <CCol sm="12" className='QuillHeader'>
                                    <ReactQuill readOnly id={key} modules={QuillOptions} value={value}/>
                                    <br></br>
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

        </CCol>
      </CRow>
      <br></br>
    </>
  )
}

export default LastInsertedDocument
