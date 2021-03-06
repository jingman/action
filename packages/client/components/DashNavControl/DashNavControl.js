import PropTypes from 'prop-types'
import React from 'react'
import LinkButton from '../LinkButton'
import IconLabel from '../IconLabel'

const DashNavControl = (props) => {
  const {icon, label, onClick} = props
  return (
    <LinkButton aria-label={label} onClick={onClick} palette='midGray'>
      <IconLabel icon={icon} label={label} />
    </LinkButton>
  )
}

DashNavControl.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default DashNavControl
