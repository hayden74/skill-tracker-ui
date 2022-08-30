import Spinner from 'react-bootstrap/Spinner'

function DefaultSpinner ({ text }) {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">${text}</span>
    </Spinner>
  )
}

export default DefaultSpinner