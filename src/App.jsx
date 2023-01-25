import AudioPlayer from './components/audio-player'
import SpotifyInterface from './components/spotify-interface'
import './css/App.css'

function App() {

  return (
    <div className="App">
      <SpotifyInterface />
      <AudioPlayer />
    </div>
  )
}

export default App
