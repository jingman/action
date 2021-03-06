import React from 'react'
import styled from '@emotion/styled'
import RaisedButton from '../../../../components/RaisedButton'
import IconLabel from '../../../../components/IconLabel'

const StyledButton = styled(RaisedButton)({
  marginLeft: 16, // #gutter
  minWidth: 32,
  paddingLeft: 0,
  paddingRight: 0
})

const AcknowledgeButton = (props) => (
  <StyledButton aria-label={'Clear this notification'} {...props}>
    <IconLabel icon='check' />
  </StyledButton>
)

export default AcknowledgeButton
