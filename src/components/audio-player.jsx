import { AiFillCaretRight, AiFillStepBackward, AiFillStepForward, AiOutlinePause } from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react'
import useSound from 'use-sound'
import test1 from '../assets/test.mp3'
import test2 from '../assets/nightcore_-_try-x9WpVoAC3tk_fmt43.mp3'
import '../css/components/audio-player.scss'

const AudioPlayer = () => {
  const [image, setImage] = useState(false)
  const [currentSong, setCurrentSong] = useState({ track: test1, index: 0 })
  const [queue, setQueue] = useState([test1, test2])
  const [seconds, setSeconds] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [play, { pause, duration, sound }] = useSound(currentSong.track, {
    volume: 0.1,
    onend: () => nextSong(),
  })
  const time = useRef({
    live: { minutes: 0, seconds: '00' },
    max: { minutes: 0, seconds: '00' }
  })

  useEffect(() => {
    if (duration) {
      const seconds = duration / 1000
      const minutes = Math.floor(seconds / 60)
      const secondsRemaining = Math.floor(seconds % 60)
      time.current.max.minutes = minutes
      time.current.max.seconds = secondsRemaining
    }
  }, [duration])

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]))
        const minutes = Math.floor(sound.seek([]) / 60)
        const seconds = `${ (Math.floor(sound.seek([]) % 60 < 10)) ? 0 : '' }${ Math.floor(sound.seek([]) % 60) }`
        time.current.live.minutes = minutes
        time.current.live.seconds = seconds
      }
    }, 1000)

    return() => clearInterval(interval)
  }, [sound])

  useEffect(() => {
    if (playing) {
      setPlaying(false)
      pause()
    }
    else {
      setPlaying(true)
      play()
    }
  }, [])

  const togglePlay = () => {
    if (playing) {
      setPlaying(false)
      pause()
    }
    else {
      setPlaying(true)
      play()
    }
  }

  const nextSong = () => {
    const currentIndex = currentSong.index
    // If this line would be removed it would create an audio bug where the previous track would just keep going
    if (playing) togglePlay()
    // If index is equal to or bigger than queue length -> reset the index
    const newIndex = (currentIndex >= queue.length - 1)
    ? 0
    : currentIndex + 1
    setCurrentSong({ track: queue[newIndex], index: newIndex })
  }

  const previousSong = () => {
    const currentIndex = currentSong.index
    if (playing) togglePlay()
    const newIndex = (currentIndex == 0)
    ? queue.length - 1
    : currentIndex - 1
    setCurrentSong({ track: queue[newIndex], index: newIndex })
  }

  const addToQueue = (event) => {
    setQueue([...queue, event.target.value])
    event.target.value = ''
    console.log(queue)
  }

  return (
    <>
    <div className="audio-player">
      <header>
        <div className='image-container'>
          {
            image ? <img src='#' className='image' /> : <div className='image'>M</div>
          }
        </div>
      </header>
      <div id='controls'>
        <div id='buttons'>
          <button>
            <AiFillStepBackward />
          </button>
          <button onClick={ togglePlay }>
            { playing ?
              <AiOutlinePause /> :
              <AiFillCaretRight />
            }
          </button>
          <button onClick={ nextSong }>
            <AiFillStepForward />
          </button>
        </div>
        <div id='indicator'>
          <span>{ time.current.live.minutes }:{ time.current.live.seconds }</span>
          <input
            className='timeline'
            type='range'
            default='0'
            min='0'
            max={ duration / 1000 }
            value={ seconds }
            onChange={(e) => {
              sound.seek([e.target.value])
            }}
          />
          <span>{ time.current.max.minutes }:{ time.current.max.seconds }</span>
        </div>
      </div>
    </div>

    {/* <div id='add-source'>
      <input id='' type='file' name='source_input' accept='audio/*, .mp3' onChange={ addToQueue } />
    </div> */}

    <div id='playlist'>
      { queue.map((source, index) => (
        <div key={index} className='playlist-item'>
          <span> { index < 10 && 0 }{ index + 1 } </span>
          source
        </div>
      )) }
    </div>
    </>
  )
}

export default AudioPlayer