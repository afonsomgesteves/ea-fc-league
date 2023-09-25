import React from 'react'
import './styles.css'
import fcLogo from '../../img/fc-logo.png'
import cmsLogo from '../../img/cms-logo.png'
import { UserAuth } from '../../context/AuthContext'

function UserState() {
  const { user, logOut, googleSignIn } = UserAuth()

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  return user ? (
    <div className="logout">
      <p>{user.name}</p>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  ) : (
    <button onClick={handleSignIn}>Sign in with Google</button>
  )
}

const Header = () => {
  return (
    <div className="header">
      <div className="headerName">
        <p>Caixa Mágica FC 24 Cup</p>
        <UserState />
      </div>
      <div className="headerLogosWrapper">
        <div className="headerLogo">
          <img src={fcLogo}></img>
        </div>
        <div className="headerLogo">
          <img src={cmsLogo}></img>
        </div>
      </div>
    </div>
  )
}

export default Header
