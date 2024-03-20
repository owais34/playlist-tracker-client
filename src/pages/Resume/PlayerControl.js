import React, { Component } from 'react'

export default class PlayerControl extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      currentModule: 0,
      currentVideo: 0,
      data: null,
      id: 0,
      
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }


  render() {
    return (
      <div>PlayerControl</div>
    )
  }
}
