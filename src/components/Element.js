import React, { useState } from "react";

export const Element = ({ videoData, bgColor , videoIndex, moduleIndex, setters, isActive}) => {
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
    const dp = Math.round(Number(videoData.durationPlayed)/(1000*60))
    const dt = Math.round(Number(videoData.duration)/(1000*60))
    return dp + "/" + dt + " mins"
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
      {videoData.name.substring(0, videoData.name.length - 4)} <span style={{fontWeight:"bolder",fontSize:"12px", border:"1px solid purple",borderRadius:"15%",backgroundColor:"#CF9FFF",padding:"2px"}}>{getMiniVideoInfo()}</span>
    </p>
  );
};
