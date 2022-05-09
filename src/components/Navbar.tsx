import React, { Fragment } from 'react'

function Navbar() {
  const title = "Analysis Chart";

  const changeTheme = () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
    }
    else {
        document.body.classList.add('dark')
    }
  }

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href='/'>
          {title}
          </a>

          <button className="btn btn-primary" id="btnSwitch" onClick={changeTheme}>Switch</button>
        </div>
      </nav>
    </Fragment>
  )
}

export default Navbar
