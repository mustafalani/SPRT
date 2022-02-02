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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import MongoQueries from '../../utils/api/mongoQueries';

import settings from '../../utils/api/settings.js';
const fields = settings[0].Fields

var docID = '000000000000';

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

const Insert = () => {

  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(true)

  const QuillData = {};

  const [doc, setDoc] = useState([])



  async function insertDoc() {

      MongoQueries.insertDocument(doc).then(function (response) {
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
                      console.log("Inserting... "  );
                      if (resultJSON.insertedId !== 'undefined') {
                          toast.success("Changes Have been Successfully Saved")
                          var insertedId = resultJSON.insertedId.$oid
                          console.log(insertedId)
                          window.open('/edit/'+insertedId,'_self');

                      } else {
                          toast.info("There are no changes to save in the document")
                      }
                  }
  })
  }



  const QuillChange = (html, delta, source, editor, key) => {
    if (source !== 'api')
      {
          html = html.replace(/<\/?p>/g, '')
          QuillData[key] = html
          doc[key] = html
     }
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

  const removeField = (key) => {
          delete doc[key]
          var element = document.getElementById('form-'+key);
          element.remove()
  }



  console.log(doc)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="9" className="search-form-group">
            <CCardHeader>
              Insert Document
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
                                </CCol>
                              </CFormGroup>
                            </CCardBody>
                            <CCardFooter className='deleteFieldsButtonContainer'>
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
              <CButton color="secondary" onClick={() => insertDoc()} style={{ width: '30%' }}>Save</CButton>
            </CCardFooter>
        </CCol>
      </CRow>
      <br></br>
    </>
  )
}

export default Insert
