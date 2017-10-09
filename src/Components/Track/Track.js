import React from 'react';

import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }



  render(){
    let trackAction;
    if(this.props.fromSearch){
        trackAction = <a className="Track-action" onClick={this.addTrack}>+</a>
    }else{
        trackAction = <a className="Track-action" onClick={this.removeTrack}>-</a>
    }
    return (
      <div className="Track">
        <div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div>
      {trackAction}


</div>)
  }
}
export default Track;