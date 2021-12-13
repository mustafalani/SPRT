import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

import IngestApi from '../../utils/api/IngestApi';

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const fields = [
            { key: 'file_name',
            _style: { width: '40%'}
            },
            { key: 'file_size',
            _style: { width: '20%'}
            },
            { key: 'server',
            _style: { width: '40%'}
            },
]


const ingestServers = window.ingestServers;
const stateVariable = [];

const Files = () => {
  //const [stateVariable, setstateVariable] = useState([])
  useEffect(() => {
      for (const server of ingestServers) {
        if (server.Enabled === true ){
          IngestApi.getFiles(server.IP).then( (response)=>{
            for (const filess of response.data.data) {
              const fileName = filess.fileName
              const fileSize = formatBytes(filess.fileSize)
              stateVariable.push(({"file_name": fileName, "file_size": fileSize, "server": server.Name}))
            }
          })
            .catch((error)=>{
              console.log('err-message', error.message)
              console.log('err-stack', error.stack)
            });
                  }
        }
      }, [])
      console.log('stateVariable', stateVariable)

  return (
    <>
        <CRow>
        <CCol>
          <CCard style={{border:'0px', background:'unset'}}>
            <CCardHeader style={{padding:'0px', border:'0px', background:'unset'}}>
            </CCardHeader>
            <CCardBody style={{border:'1px solid', background:'unset'}}>
            <CDataTable
              items={stateVariable}
              fields={fields}
              tableFilter
              columnFilter
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Files
