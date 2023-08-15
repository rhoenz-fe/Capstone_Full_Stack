import PropTypes from 'prop-types'

const notificationStyle = {
  color: '#800080',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  display: 'inline-block',
}

const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }

  return (
    <div className="notif" style={notificationStyle}>
      {notif}
    </div>
  )
}

Notification.propTypes = {
  notif: PropTypes.string.isRequired
}

export default Notification