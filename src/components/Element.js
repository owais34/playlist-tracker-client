import React, { useState } from "react";

export const Element = ({ bgColor , videoIndex, moduleIndex, setters, isActive, videoData}) => {
  const [bg, setBg] = useState(bgColor);


  const hoverEvent = () =>{
    setBg('#FFD580')
  }
  const exitEvent = () => {
    setBg(bgColor)
  }

  const onClick = () => {
    setters.setCurrentVideo(videoIndex)
    setters.setCurrentModule(moduleIndex)
  }

  const getMiniVideoInfo = () =>{
    let videoDataCopy = {durationPlayed:0,duration:0}
    try{
    videoDataCopy= {...videoData}
    }catch(err){

    }
    const dp = Math.round(Number(videoDataCopy.durationPlayed)/(1000*60))
    const dt = Math.round(Number(videoDataCopy.duration)/(1000*60))
    return dp + "/" + dt + " mins"
  }

  const getVideoName = () => {
    try {
    let name = videoData.name
    name.substring(0, name.length - 4)

    return name
    } catch(err) {
      return ""
    }

  }

  return (
    <p
      style={{
        wordBreak: "break-all",
        padding: "5px",
        backgroundColor: bg,
        margin: "0px",
        border: "1px solid",
        cursor: "pointer"
      }}
      onMouseOver={hoverEvent}
      onMouseLeave={exitEvent}
      onClick={onClick}
    >
      {getVideoName()} <span style={{fontWeight:"bolder",fontSize:"12px", border:"1px solid purple",borderRadius:"15%",backgroundColor:"#CF9FFF",padding:"2px"}}>{getMiniVideoInfo()}</span>
    </p>
  );
};
