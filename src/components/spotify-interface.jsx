import { useEffect, useRef, useState } from 'react'
import * as spotify from '../api/spotify'
import '../css/components/spotify-interface.scss'

// localStorage.getItem('audio-player-spotify-login-status')
const SpotifyInterface = () => {
  const [loginStatus, setLoginStatus] = useState(false)
  const responseDataRef = useRef()

  return (
    <div id='spotify-nav'>
      <div className='container'>
        <div>Spotify integration</div>
        { !loginStatus && <button onClick={ spotify.authorization }>Login to Spotify</button> }
        { loginStatus && <>Logged in as *** <button>Logout</button></> }
      </div>
    </div>
  )
}

export default SpotifyInterface