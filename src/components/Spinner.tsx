import {Fragment} from 'react'

const Spinner = () => {
  return (
    <Fragment>
      <img src={process.env.PUBLIC_URL + '/assets/loader.gif'} alt="loader" style={{ margin: "0 auto", display: "block", width: '300px' }} />
    </Fragment>
  )
}

export default Spinner
