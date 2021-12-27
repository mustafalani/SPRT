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
var docID = url.substring(url.lastIndexOf('/') + 1);

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

  const [doc, setDoc] = useState([])
  const update = {"_id": docID};
  const setData = {};
  const unsetData = {};

  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(true)

  const [collapse, setCollapse] = useState(true)

  const [danger, setDanger] = useState(false)

// #1
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
    getDocByID()
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
                    var itemName
                    if (fields[key] !== undefined) {
                      itemName = fields[key]
                    }
                    else {
                      itemName = key
                    }
                    if (key !== "_id" && key!== "DOCN") {
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
                                    <ReactQuill id={key} modules={QuillOptions} value={value} onChange={(html, delta, source, editor) => {QuillChange(html, delta, source, editor, key)}}/>
                                    <br></br>
                                </CCol>
                              </CFormGroup>
                            </CCardBody>
                            <CCardFooter className='deleteFieldsButtonContainer'>
                            <CTooltip content="restore">
                                <span className='ql-formats'>
                                  <CLink className="card-header-action quill-actions" onClick={() => reset(key)}>
                                    <CIcon name={'cil-sync'} />
                                  </CLink>
                                </span>
                              </CTooltip>
                              <CTooltip content="delete">
                                <span className='ql-formats'>
                                  <CLink className="card-header-action quill-actions" onClick={() => removeField(key)}>
                                    <CIcon name={'cil-delete'} />
                                  </CLink>
                                </span>
                              </CTooltip>
                            </CCardFooter>
                          </CCard>
                          </CFormGroup>
                        )
                      }
                    })()}
                  </>
                  ))
                }
                  <CFade className="row" in={showCard}>
                    <CCard>
                      <CCardHeader>
                        Add a new field
                        <div className="card-header-actions">
                          <CLink className="card-header-action">
                            <CIcon name="cil-settings" />
                          </CLink>
                          <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                            <CIcon name={collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
                          </CLink>
                          <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                            <CIcon name="cil-x-circle" />
                          </CLink>
                        </div>
                      </CCardHeader>
                      <CCollapse show={!collapsed}>
                        <CCardBody>
                          {
                            Object.entries(fields).map(([key, value]) => (
                                <>
                                {(function() {
                                  if (!(key in doc)) {
                                    return (
                                    <CButton id={key} onClick={() => addNewField(key)} color="secondary" style={{ margin: '2px' }} variant="outline" size="sm">{value}</CButton>
                                    )
                                  }
                                })()}
                              </>
                            ))
                          }
                        </CCardBody>
                      </CCollapse>
                    </CCard>
                  </CFade>
            </CCardBody>
            <CCardFooter className='editButtonContainer'>
              <CButton color="danger" onClick={() => getDocByID()} style={{ width: '30%' }}>Discard Changes</CButton> <CButton color="secondary" onClick={() => saveDoc()} style={{ width: '30%' }}>Save</CButton>
                <br></br>
                <br></br>
            </CCardFooter>
            <CFade className="row" in={showCard}>
              <CCard borderColor="danger">
                <CCardHeader>
                  Danger Zone
                  <div className="card-header-actions">
                    <CLink className="card-header-action" onClick={() => setCollapse(!collapse)}>
                      <CIcon name={collapse ? 'cil-chevron-bottom':'cil-chevron-top'} />
                    </CLink>
                    <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                      <CIcon name="cil-x-circle" />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={!collapse}>
                  <CCardBody>
                    <h4>Delete this document</h4>
                    <h5><CIcon style={{color: '#ffc107', width:'2rem', height:'2rem' }} name={'cil-warning'} /> Once you delete a document, there is no going back. Please be certain.</h5>
                    <CCardFooter className='editButtonContainer'>
                    <CButton color="danger" onClick={() => setDanger(!danger)}>Delete this document</CButton>
                    <CModal
                      show={danger}
                      onClose={() => setDanger(!danger)}
                      color="danger"
                    >
                      <CModalHeader closeButton>
                        <CModalTitle><CIcon style={{color: '#ffc107', width:'2rem', height:'2rem' }} name={'cil-warning'} /> Are you sure?</CModalTitle>
                      </CModalHeader>
                      <CModalBody style={{textAlign:'left'}}>
                      <p>This action cannot be undone. This will permanently delete the document <span style={{color: 'red' }}> {docID}</span>.</p><p>Please type the document ID to confirm.</p>
                      <CFormGroup>
                        <CInput id="confirm-id" required />
                      </CFormGroup>
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="danger" onClick={() => deleteDocByID()}>I understand, Delete This Document.</CButton>{' '}
                      </CModalFooter>
                    </CModal>
                    </CCardFooter>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
        </CCol>
      </CRow>
      <br></br>
    </>
  )
}

export default Edit
