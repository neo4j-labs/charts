import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoaderExampleLoader = () => (
  <div style={{height: 200}}>
    <Dimmer inverted active>
      <Loader size="huge" />
    </Dimmer>
  </div>
)

export default LoaderExampleLoader