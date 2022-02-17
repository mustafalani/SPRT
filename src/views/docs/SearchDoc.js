import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import {Link} from "react-router-dom";

const SearchDoc = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  return (
    <>
      <CCard>
        <CCardHeader>
          Documentation
        </CCardHeader>
        <CCardBody>
          <p className="h3">Searching: </p>
          <p>SPRT Search offers two search functions, the Quick and the Advanced search, as well as a range of indexes and projection operators to locate data within the SPRT database.</p>
          <p className="h4">Quick Search <code>(Fritekst)</code>:</p>
          <p>This is a 'Google' type search using strings or keywords that will retrieve results
          containing one or more of the strings & keywords you enter into the <code>Fritekst </code>Search field.</p>
          <p>The search query will run aginst the fields: <code>['TITL', 'BEMK', 'BBSK', 'KEYW']</code>only.</p>
          <p className="h4">Fritekst Search Operators :</p>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio custom id="radio1" checked />
            <CLabel variant="custom-checkbox" htmlFor="radio">Exact</CLabel>
          </CFormGroup>
          <p>The default search operator which should return results that contain one or more texts matches the entered string exactly, i.e terms (words) in the string must be exactly in the same position as the query in order to be considered a match.</p>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio custom id="radio2" checked />
            <CLabel variant="custom-checkbox" htmlFor="radio">And</CLabel>
          </CFormGroup>
          <p>Similar to the <code>Exact</code> operator except for the distance between terms and their position, it allows more reorganization of the terms and more distance between the terms to satisfy the query. Exact matches are scored higher.</p>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio custom id="radio1" checked />
            <CLabel variant="custom-checkbox" htmlFor="radio">Any</CLabel>
          </CFormGroup>
          <p>Unlike the <code>Exact</code> and the <code>And</code> operators, if there are multiple terms in a string, the <code>Any</code> operator looks for a match for each term separately.</p>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio custom id="radio1" checked />
            <CLabel variant="custom-checkbox" htmlFor="radio">Fuzzy</CLabel>
          </CFormGroup>
          <p>Find strings which are similar to the search term or terms based on the <code>Any</code> operator.</p>
          <CFormGroup inline>
            <CIcon name={'cil-settings'} />
            <CLabel> Fuzzy.maxEdits <code>(Optional)</code></CLabel> Maximum number of single-character edits required to match the specified search term. Value can be 1 or 2. The default value is 2. Uses
          </CFormGroup>
          <CFormGroup inline>
            <CIcon name={'cil-settings'} />
            <CLabel>Fuzzy.prefixLength<code>(Optional)</code></CLabel> Number of characters at the beginning of each term in the result that must exactly match. The default value is 0.
          </CFormGroup>
          <CFormGroup inline>
            <CIcon name={'cil-settings'} />
            <CLabel>Fuzzy.maxExpansions<code>(Optional)</code></CLabel> The maximum number of variations to generate and search for. This limit applies on a per-token basis. The default value is 50.
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio custom id="radio1" checked />
            <CLabel variant="custom-checkbox" htmlFor="radio">Near</CLabel>
          </CFormGroup>
          <p>Find terms taht matche the terms in the string but withing the specified distance. When this operator is selected <code>Near.distance</code> must be specified.</p>
          <CFormGroup inline>
            <CIcon name={'cil-settings'} />
            <CLabel> Near.distance :</CLabel> Allowable distance between words in the query string. Lower value allows less positional distance between the words and greater value allows more reorganization of the words.
          </CFormGroup>

          <p className="h4">Advanced Search :</p>
          <p>The Advanced Search allows you to narrow the focus of the search by including details such as:</p>

          <p>Billedbeskrivelse<code>[BBSK]</code></p>
          <p>Titel<code>[TITL]</code></p>
          <p>Baggrund<code>[BAGR]</code></p>
          <p>Reporter<code>[OPHV]</code></p>
          <p>Medvirkende<code>[MEDV]</code></p>
          <p>Emneord<code>[KEYW]</code></p>
          <p>Udsendelsesdato<code>[UDAT]</code></p>
          <p>Båndnummer<code>['BNNA', 'BNNB', 'BNNC', 'BNND', 'BNNE', 'BNNF', 'BNNG', 'BNNH', 'BNNI', 'BNNJ', 'BNNK', 'BNNL', 'BNNM', 'BNNN']</code></p>

          <p className="h4">Search Results :</p>
          <p>The results will be sorted by relevance, i.e. results corresponding to all
          search terms first then in decreasing relevance. For example, a search
          using the keywords “ved, peter and graulund” first will retrieve results
          containing all three words, then will retrieve results containing two of
          them, and finally will retrieve results containing all results with just one
          of the keywords.
          </p>
        </CCardBody>
      </CCard>
    </>
  )
}

export default SearchDoc
