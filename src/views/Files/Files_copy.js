import React, {useState} from 'react'
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

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['file_name','file_size', 'server']


const ingestServers = window.ingestServers;

const Files = () => {
  
  const [allFiles, setallFiles] = useState([])
  const [filesData, setfilesData] = useState([])
  async function loadFiles() {
  const data = []
  for (const server of ingestServers) {
    if (server.Enabled === true ){
              try {
                data.push(await IngestApi.getFiles(server.IP));
              } catch(error) {
                console.log('err-message', error.message)
                console.log('err-stack', error.stack)
                data.push({"data": { "response": 404, "message": "NA","data": [{}]}});
              }
            }
    }
            //console.log('api', data)
            return data
            }

          (async function(){
            const fdata = []
            let getFiles = await loadFiles();
            function loadallFiles() {
              //if (allchannels.status === 200) {
                //console.log('Server' + key , channels.data.data);
                setallFiles(getFiles)
                //console.log('allFiles', allFiles)
                for (const server of ingestServers) {
                  if (server.Enabled === true ){
                    if (typeof (allFiles[server.ID]) !== 'undefined') {
                      if (allFiles[server.ID].data.response !== 404) {
                        //console.log('allFiles', allFiles[server.ID].data.data)
                        for (const filess of allFiles[server.ID].data.data) {
                          const fileName = filess.fileName
                          const fileSize = formatBytes(filess.fileSize)
                          fdata.push({"file_name": fileName, "file_size": fileSize, "server": server.Name})
                        }
                      }
                    }
                  }
                }
                setfilesData(fdata)
              //}
            }

            //console.log('filesData', filesData)

            const interval = setInterval(loadallFiles(), 5000)
            return () => clearInterval(interval)
                        })();

  return (
    <>
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Combined All dark Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={filesData}
              fields={fields}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Files
