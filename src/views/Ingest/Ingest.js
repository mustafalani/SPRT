import React from 'react'
import IngestApi from '../../utils/api/IngestApi';

import {useState} from 'react'
import {toast} from 'react-toastify'
//import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'
//import './index.sass'


import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CBadge,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CButton,
} from '@coreui/react'

const ingestServers = window.ingestServers;

const format_tc = (hh, mm, ss, ff) => {
	return (hh < 10 ? '0' + hh : hh.toString())
	    + ':' + (mm < 10 ? '0' + mm : mm.toString())
        + ':' + (ss < 10 ? '0' + ss : ss.toString())
	    + ':' + (ff < 10 ? '0' + ff : ff.toString())
}

const s2tc = (seconds, base) => {
    let hh = Math.trunc((seconds) / 3600)
    let mm = Math.trunc(((seconds) / 60) - (hh*60))
    let ss = Math.trunc((seconds) - (hh*3600) - (mm*60))
    let ff = Math.trunc((seconds*base)- (hh*3600*base) - (mm*60*base) - (ss*base))
    return format_tc(hh, mm, ss, ff)
}

const Timecode = ({value}) => {
    return (
        <span className="timecode">{s2tc(value, 25)}</span>
    )
}

function start(serverIP, onServer, onDev, slug, filenameED, profile, durationID) {
                  const drs = document.getElementById(durationID).querySelectorAll('input[name="duration"]');
                  let duration;
                  for (const dr of drs) {
                      if (dr.checked) {
                          duration = dr.value;
                          break;
                      }
                      else duration = ''
                  }
                  console.log(duration);
                  var ingFileName = document.getElementById(filenameED).value.trim()
                  var pattern = new RegExp(/^[a-zA-Z0-9_-]+$/)
                          if (ingFileName === "") {
                              toast.error("Please enter a valid file name!",{icon: "⚠️"});
                              return false;
                          }

                          else if (!pattern.test( ingFileName ) ) {
                            toast.error('"' + ingFileName +  '" is invalid file name. No special character or spaces are allowed.', {icon: "⚠️"})
                          }
                          else {
                            toast.info("Starting file recording: " + ingFileName + " on " + onServer + " @ " + onDev,{icon: "🔴"})
                            console.log('starting ingest ... ' + serverIP, onServer, onDev, slug, ingFileName, profile)
                            IngestApi.startIngest(serverIP, slug, ingFileName, profile, duration)
                           }

                  }

function stop(serverIP, onServer, onDev, slug, filenameED) {
        var ingFileName = document.getElementById(filenameED).value.trim()
        toast.info("Stopping file recording: " + ingFileName + " on " + onServer + " @ " + onDev, {icon: "✅"})
        IngestApi.stopIngest(serverIP, slug)
        }

function preview(IP, slug, previewImageId) {
        var num = Math.random();
        var imageSrc = "http://"+IP+":7201/api/channels/"+slug+"/thumb.png?"+num
        document.getElementById(previewImageId).src = imageSrc
        }

const Servers = () => {
const [channels, setChannels] = useState([])


  async function loadChannels() {
  const ch = []
  for (const server of ingestServers) {
    if (server.Enabled === true ){
              try {
                ch.push(await IngestApi.getIngestChannels(server.IP));
              } catch(error) {
                //toast.error(server.IP + ' ' + error.message, {icon: "❌"})
                console.log('err-message', error.message)
                console.log('err-stack', error.stack)
                ch.push({"data": { "response": 404, "message": "NA","data": [{}]}});
              }
            }
    }
            //console.log('api', ch)
            return ch
            }

          (async function(){

            let allchannels = await loadChannels();
            function loadallChannels() {
              //if (allchannels.status === 200) {
                //console.log('Server' + key , channels.data.data);
                setChannels(allchannels)
              //}
            }
            loadallChannels()
            //interval = setInterval(loadallChannels, 500)
            //return () => clearInterval(interval)
                        })();

return (
    <>
      <div className="servers-container">
        {ingestServers.map((server, key) => {
            return (
            <div>
            {(function() {
              if (server.Enabled === true ){
                return (
                  <CRow id={key}>
                      {server.Devices.map((device, devID) => {
                      var deviceIsBusy = ''
                      var  fileName = ''
                      var  slug = ''
                      var time = ''
                      var errorLog = ''
                      var filenameID = ''
                      const previewImageId = 'previewImage-'+ key + devID
                      const durationID = 'duration-'+ key + devID
                      //console.log(1, channels)
                      if (typeof (channels[server.ID]) !== 'undefined') {
                      //console.log(2, channels)
                        if (channels[server.ID].data.response !== 404) {
                        //console.log(3, channels[server.ID].data.response)
                        //console.log('ch',ch[0].data.data[0].slug)
                        deviceIsBusy = channels[server.ID].data.data[devID].busy
                        fileName = channels[server.ID].data.data[devID].filename
                        slug = channels[server.ID].data.data[devID].slug
                        time = channels[server.ID].data.data[devID].time
                        errorLog = channels[server.ID].data.data[devID].error_log
                        filenameID = 'filename-' + key + devID
                        }
                        else  {
                        deviceIsBusy = 'ERROR'
                          fileName = ''
                          slug = 'ERROR'
                          time = ''
                          errorLog = ''
                          filenameID = ''
                        }
                        }
                      else  {
                      deviceIsBusy = 'ERROR'
                        fileName = ''
                        slug = 'ERROR'
                        time = ''
                        errorLog = ''
                        filenameID = ''
                      }
                      if (device.Enabled === true ){
                        if (deviceIsBusy === false) {
                          return (
                            <CCol xs="12" sm="6" md="3">
                              <CCard id={devID} style={{border:'0px', background:'unset'}}>
                                <CCardHeader style={{padding:'0px', border:'0px', background:'unset'}}>
                                  <span class='chlabel'><b>{server.Name+' - '}</b>{device.Label}</span> <span class='text-danger'>{errorLog}</span>
                                    <CBadge color='success' className="float-right">IDLE</CBadge>
                                </CCardHeader>
                                <CCardBody style={{padding:'0px', border:'0px', background:'unset'}}>
                                <CInputGroupAppend className='preview-buttons'>
                                  <CButton color="light" onClick={() => preview(server.IP, slug, previewImageId)}>Refresh</CButton>
                                </CInputGroupAppend>
                                  <div id={'preview-'+key+devID}>
                                    <img style={{ width: '100%'}} src={'black-frame.png'} alt="preview" id={previewImageId} className="img-responsive"/>
                                    <div class='timecode-container'><Timecode value=''/></div>
                                  </div>
                                  <CFormGroup className="needs-validation" id={'form-'+key+devID} style={{paddingTop:'5px'}}>
                                    <div>
                                      <CCardFooter style={{padding:'unset', paddingTop:'5px', border:'0px', background:'unset'}}>
                                        <CInputGroup>
                                          <CInput id={filenameID} name="text-input" className="form-control" placeholder="File Name" required />
                                          <CInputGroupAppend>
                                            <CButton className="ml-1 mr-1" variant="outline" color="success" onClick={() => start(server.IP, server.Name, device.ID, slug, filenameID, server.Profile, durationID)}>Start</CButton>
                                            <CButton variant="outline" color="danger">Stop</CButton>
                                          </CInputGroupAppend>
                                        </CInputGroup>
                                        <form>
                                        <CRow className="align-items-center mt-3" id={durationID}>
                                          <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                            <input type="checkbox" value="7200" name="duration" class="btn-check" id={"2h"+durationID}/>
                                            <label class="btn btn-outline-info" for={"2h"+durationID}>2 Hours</label>
                                          </CCol>
                                          <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                            <input type="checkbox" value="14400" name="duration" class="btn-check" id={"4h"+durationID}/>
                                            <label class="btn btn-outline-info" for={"4h"+durationID}>4 Hours</label>
                                          </CCol>
                                          <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                            <input type="checkbox" value="21600" name="duration" class="btn-check" id={"6h"+durationID}/>
                                            <label class="btn btn-outline-info" for={"6h"+durationID}>6 Hours</label>
                                          </CCol>
                                          <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                            <input type="checkbox" value="28800" name="duration" class="btn-check" id={"8h"+durationID}/>
                                            <label class="btn btn-outline-info" for={"8h"+durationID}>8 Hours</label>
                                          </CCol>
                                        </CRow>
                                        </form>
                                      </CCardFooter>
                                    </div>
                                  </CFormGroup>
                                </CCardBody>
                                </CCard>
                            </CCol>
                            )
                        }
                        //else console.log('no device found @ location')
                        }
                    if (deviceIsBusy === true) {
                      return (
                        <CCol xs="12" sm="6" md="3">
                          <CCard id={devID} style={{border:'0px', background:'unset'}}>
                            <CCardHeader style={{padding:'0px', border:'0px', background:'unset'}}>
                              <span class='chlabel'><b>{server.Name+' - '}</b>{device.Label}</span>
                                <CBadge color='warning' className="float-right">BUSY</CBadge>
                            </CCardHeader>
                            <CCardBody style={{padding:'0px', border:'0px', background:'unset'}}>
                              <div id={'preview-'+key+devID}>
                                <img style={{ width: '100%'}} src={"http://"+server.IP+":7201/api/channels/"+slug+"/thumb.png"} alt="boohoo" className="img-responsive"/>
                                <div class='timecode-container'><Timecode value={time}/></div>
                              </div>
                              <CFormGroup id={'form-'+key+devID} style={{paddingTop:'5px'}}>
                                <div>
                                  <CCardFooter style={{padding:'unset', paddingTop:'5px', border:'0px', background:'unset'}}>
                                  <CInputGroup>
                                    <CInput id={'filename-'+key+devID} name="text-input" placeholder={fileName} disabled/>
                                    <CInputGroupAppend>
                                      <CButton className="ml-1 mr-1" variant="outline" color="success" disabled >Start</CButton>
                                      <CButton className="ml-1 mr-1" color="danger" onClick={() => stop(server.IP, server.Name, device.ID, slug, filenameID)}>Stop</CButton>
                                    </CInputGroupAppend>
                                  </CInputGroup>
                                  </CCardFooter>
                                </div>
                              </CFormGroup>
                            </CCardBody>
                            </CCard>
                        </CCol>
                        )
                        }
                    if (deviceIsBusy === 'ERROR') {
                      return (
                        <CCol xs="12" sm="6" md="3">
                          <CCard id={devID} style={{border:'0px', background:'unset'}}>
                            <CCardHeader style={{padding:'0px', border:'0px', background:'unset'}}>
                              <span class='chlabel'><b>{server.Name+' - '}</b>{device.Label}</span>
                                <CBadge color='danger' className="float-right">ERROR</CBadge>
                            </CCardHeader>
                            <CCardBody style={{padding:'0px', border:'0px', background:'unset'}}>
                              <div id={'preview-'+key+devID}>
                                <img style={{ width: '100%'}} src={'nopreview.png'} alt="boohoo" className="img-responsive"/>
                                <div class='timecode-container'><Timecode value=''/></div>
                              </div>
                              <CFormGroup id={'form-'+key+devID} style={{paddingTop:'5px'}}>
                                <div>
                                  <CCardFooter style={{padding:'unset', paddingTop:'5px', border:'0px', background:'unset'}}>
                                  <CInputGroup>
                                    <CInput id={'filename-'+key+devID} name="text-input" placeholder={fileName} disabled/>
                                    <CInputGroupAppend>
                                      <CButton className="ml-1 mr-1" variant="outline" color="success" disabled >Start</CButton>
                                      <CButton variant="outline" color="danger" disabled >Stop</CButton>
                                    </CInputGroupAppend>
                                  </CInputGroup>
                                  <form>
                                  <CRow className="align-items-center mt-3" id={durationID}>
                                    <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                      <input type="checkbox" value="7200" name="duration" class="btn-check" disabled id={"2h"+durationID}/>
                                      <label class="btn btn-outline-info disabled" for={"2h"+durationID}>2 Hours</label>
                                    </CCol>
                                    <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                      <input type="checkbox" value="14400" name="duration" class="btn-check" disabled id={"4h"+durationID}/>
                                      <label class="btn btn-outline-info disabled" for={"4h"+durationID}>4 Hours</label>
                                    </CCol>
                                    <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                      <input type="checkbox" value="21600" name="duration" class="btn-check" disabled id={"6h"+durationID}/>
                                      <label class="btn btn-outline-info disabled" for={"6h"+durationID}>6 Hours</label>
                                    </CCol>
                                    <CCol col="6" sm="4" md="2" xl className="text-center mb-3 mb-xl-0">
                                      <input type="checkbox" value="28800" name="duration" class="btn-check" disabled id={"8h"+durationID}/>
                                      <label class="btn btn-outline-info disabled" for={"8h"+durationID}>8 Hours</label>
                                    </CCol>
                                  </CRow>
                                  </form>
                                  </CCardFooter>
                                </div>
                              </CFormGroup>
                            </CCardBody>
                            </CCard>
                        </CCol>
                        )
                        }
                        })
                        }
                        </CRow>
                  )
                  }
        })()}
        </div>
        )
          })}
      </div>
    </>
  );
};

class ingest extends React.Component {

  render() {
    return (
    <>
    <Servers />
    </>
    )
  }
}

export default ingest
