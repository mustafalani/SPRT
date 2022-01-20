import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
      <div>

      </div>
        <span class="text-muted">Søgning med SPRT v1.4.0</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
