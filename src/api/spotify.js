const spotifyBaseUrl = 'http://accounts.spotify.com'

export const authorization = async () => {
  const client_id = import.meta.env.VITE_CLIENT_ID
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI
  console.log(client_id, redirect_uri)

  const response = fetch(
    `${spotifyBaseUrl}/authorize?` +
    `response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&show_dialog=false`
  ).then(response => response.json()).then(data => console.log(data))
  const authenticationDetails = {}

  return authenticationDetails
}

export const tokenRequest = () => {
  const response = fetch(`${spotifyBaseUrl}/api/token`)
  const token = ''

  return token
}

export const getTrack = async (searchTerm) => {
  const trackDetails = {}
  return trackDetails
}

export const checkResponse = () => {
  const spotifyResponse = (window.location.search.includes('?code=')) ? window.location.search : false
  return spotifyResponse
}