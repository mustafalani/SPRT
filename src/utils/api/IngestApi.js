import axios from "axios";
import {toast} from 'react-toastify'

const settings = window.Settings;

const INGEST_API_PORT = settings.ingestApi.Port;

export default class IngestApi {

  static getIngestChannels(serverIP) {
    return axios.get("http://"+serverIP+":"+INGEST_API_PORT+"/api/channels", {method: "GET", mode: 'no-cors'}, {timeout: 1})
    }

  static startIngest(serverIP, slug, ingFileName, profile, duration) {

        const query = {
            url: "http://"+serverIP+":"+INGEST_API_PORT+"/api/channels/"+slug,
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: {
                "action": "start",
                "profile" : profile,
                "filename": ingFileName,
                "duration": duration
            }
        }
        axios(query).then((response) => {

            if (response.data.response >= 400){
                toast.error(response.data.message, {icon: "❌"})
            }

        }).catch((err) => {
            toast.error(err, {icon: "❌"})
        })
    }

  static stopIngest(serverIP, slug) {
        const query = {
            url: "http://"+serverIP+":"+INGEST_API_PORT+"/api/channels/"+slug,
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: {"action": "stop"}
        }
        axios(query).then((response) => {

            if (response.data.response >= 400){
                toast.error(response.data.message, {icon: "❌"})
            }
        }).catch((err) => {
            toast.error(err, {icon: "❌"})
        })
    }

  static getFiles(serverIP) {
    return axios.get("http://"+serverIP+":"+INGEST_API_PORT+"/api/files", {method: "GET", mode: 'no-cors'}, {timeout: 1})
    }

}
