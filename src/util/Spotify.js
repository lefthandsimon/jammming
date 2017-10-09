let accessToken;
const clientId = 'b39220e6008c4e9785a3f8383f0aca89';
//const secret = 'ccf8cb5c8d504199a70280eb04c5a9a8';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken: function() {
    if(accessToken)
    {
      return accessToken;
    }  else if (window.location.href.match('/access_token=([^&]*)/') && window.location.href.match('/expires_in=([^&]*)/')){
      accessToken = window.location.href.match('/access_token=([^&]*)/');
      let expiresIn = 3600;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

    }else {
        console.log("NO ACCESS_TOKEN")
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search: function(term){
      console.log("inside spotify search");
      return Spotify.getAccessToken().then(()=> {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}` }}).then(response =>
          {
            return response.json()
          }).then( responseJson =>
            {
              if(!responseJson.tracks){
                return [];
              }else{
                return responseJson.tracks.map(track =>(
                  {
                    ID:track.id,
                    Name: track.name,
                    Artist: track.artists[0].name,
                    Album: track.album.name,
                    URI: track.uri
                  }
                )

                )
              }
            }

          );
        }
      )
    }


}

export default Spotify;
