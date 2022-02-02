import React from 'react'
import {useState, useEffect} from 'react'
import MongoQueries from '../../utils/api/mongoQueries';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'

const Charts = () => {

  const [colCounter, setColCounter] = useState([])

  async function collectionCount() {

      MongoQueries.collectionCount().then(function (response) {
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
                          setColCounter(resultJSON)
                          console.log(colCounter.$numberLong);
                      }
                  }  // end of ELSE
              })
  }

  useEffect(() => {
    collectionCount()
  }, [])

  return (
    <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          Documents Counter
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                ],
                data: [colCounter.$numberLong]
              }
            ]}
            labels={['db.collection.count']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  )
}

export default Charts
