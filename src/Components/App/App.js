import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';



class App extends Component {
  constructor (){
    super();
    //this.state = {searchResults: [{name: '1', artist: 'artist1', album: 'album1', id: '1', uri: '1'}, {name: '2', artist: 'artist2', album: 'album2', id: '2', uri: '2'}, {name: '3', artist: 'artist3', album: 'album3', id: '3', uri: '3'}], playlistName: 'Simon\'s Playlist', playlistTracks: [{name: '4', artist: 'artist4', album: 'album4', id: '4', uri: '4'}, {name: '5', artist: 'artist5', album: 'album5', id: '5', uri: '5'}, {name: '6', artist: 'artist6', album: 'album6', id: '6', uri: '6'}]};
    this.state = {searchResults: [], playlistName: 'New Playlist', playlistTracks: []};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    // this is the least worst way I find to handle the redirect and loss of application state
    Spotify.getAccessToken();
  }

  addTrack(track){
    let containsTrack = false;
    let playlistIndex = this.state.playlistTracks.length -1;
    while(playlistIndex >= 0)
    {
      if(track.id === this.state.playlistTracks[playlistIndex].id){
        containsTrack = true;
        break;
      }
      playlistIndex--;
    }
    if(!containsTrack)
    {
      let playlistUpdate = this.state.playlistTracks;
      playlistUpdate.push(track);
      this.setState({playlistTracks: playlistUpdate});

    }
  }

  removeTrack(track){
    let playlistIndex = this.state.playlistTracks.length -1;
    let currentPlaylistTracks =  this.state.playlistTracks;
    while(playlistIndex >= 0)
    {
      if(track.id === this.state.playlistTracks[playlistIndex].id){
        currentPlaylistTracks.splice(playlistIndex,1)
        this.setState({playlistTracks: currentPlaylistTracks });
        break;
      }
      playlistIndex--;
    }
  }

  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: "New Playlist"});
    this.setState({searchResults: []})
    this.setState({playlistTracks: []})
  }

  search(term){
    Spotify.search(term).then(response => {
      this.setState({searchResults: response })
    }


    );

  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} tracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}



export default App;
