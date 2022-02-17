import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import {Link} from "react-router-dom";

const Typography = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Documentation
        </CCardHeader>
        <CCardBody>
          <div className="bd-example">
            <p><Link to={"/doc/search"} className="h5">Searching: </Link>Quick Search, Advanced Search, Results View, Detailed view, Search Tips</p>
            <p><Link to={"/doc/edit"} className="h5">Edit Document</Link></p>
            <p><Link to={"/doc/insert"} className="h5">Insert Document</Link></p>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Typography
