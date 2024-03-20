import React, { useEffect, useContext, useState, useRef } from "react";
import { GlobalStateContext } from "../../GlobalState";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../configs";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";
import { Element } from "../../components/Element";
import { SideListElemet } from "../../components/SideListElemet";

export const Resume = () => {
  const [gblState, dispatch] = useContext(GlobalStateContext);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const videoRef = useRef(null);

  const updateStatus = () => {
    //console.log(videoRef.current.getState().player)
    if (videoRef.current.getState().player.isPaused) return;

    const currentTime = videoRef.current.getState().player.currentTime
    const payload = {
      id: Number(id),
      currentModule,
      currentVideo,
      currentTime
    };

    if(currentTime === videoRef.current.getState().player.duration){
      // implement auto play next video
    }

    const dataClone = {...data}
    dataClone.subModuleList[currentModule].videoList[currentVideo].durationPlayed=(currentTime*1000)

    setData(dataClone)

    axios
      .post(`${baseurl}/update`, payload)
      .then((res) => {
        //console.log(res)
      })
      .catch((err) => {
        //console.log(err)
      });
  };

  const getAccordionContent = () => {
    if (data && data.subModuleList)
      return data.subModuleList.map((subModuleData, index) => {
        return (
          <SideListElemet
            key={index}
            eventKey={String(index)}
            subModuleData={subModuleData}
            isActiveModule={index === currentModule}
            activeVideoIndex={currentVideo}
            moduleIndex={index}
            setters = {{setCurrentVideo,setCurrentModule}}
          />
        );
      });
    else return null;
  };

  useEffect(() => {
    axios
      .get(`${baseurl}/resume/${id}`)
      .then((res) => {
        dispatch({ type: "SET_PLAYLISTDATA", payload: { id, data: res.data } });
        setCurrentVideo(Number(res.data.videoIndex));
        setCurrentModule(Number(res.data.moduleIndex));
        setData(res.data);
        //console.log(videoRef.current.getState())

        videoRef.current.seek(Math.abs(Number(res.data.stoppedAtTime/1000)))
        // setInterval(()=>{
        //   if(videoRef && videoRef.current &&  videoRef.current.play)
        //     videoRef.current.play()
        // },500)
        
      })
      .catch((err) => {
        console.log(err);
      });

    const updateAfterInterval = setInterval(updateStatus, 900);

    return () => {
      clearInterval(updateAfterInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(videoRef.current? videoRef.current.getState().player.currentTime:"")

  return (
    <Container fluid>
      <Row>
        <Col lg={10} md={12} style={{ padding: 0 }}>
          <Player
            src={`${baseurl}/cdn/${getVideoUrl(
              data,
              currentVideo,
              currentModule
            )}`}
            ref={videoRef}
          >
            <BigPlayButton position="center" />
          </Player>
        </Col>
        <Col lg={2} md={12} className="bg-secondary" style={{ padding: 0 }}>
          <Accordion style={{ overflow: "scroll", maxHeight: "100vh" }}>
            {getAccordionContent()}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

const getVideoUrl = (data, videoIndex, moduleIndex) => {
  if (!data) return "";
  const url = data["subModuleList"][moduleIndex]["videoList"][videoIndex][
    "path"
  ].replaceAll("\\", ">");
  return url;
};
