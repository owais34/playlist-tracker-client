import React, { useEffect, useContext } from "react";
import { Card, Container, Row ,Button, Badge, ProgressBar} from "react-bootstrap";
import NaiveBar from "../../components/NaiveBar";
import { GlobalStateContext } from "../../GlobalState";
import axios from "axios";
import VideoLogo from '../../images/VideoIcon.jpg'
import './Home.css'
import { baseurl } from "../../configs";
import { Link } from "react-router-dom";

function Home() {
  const [gblState, dispatch] = useContext(GlobalStateContext);

  useEffect(() => {
      axios
        .get(`${baseurl}/homeData`)
        .then((res) =>{ 
          dispatch({ type: "SET_HOMEDATA", payload: res.data })
        })
        .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Container>
      <NaiveBar />
      <Row
        className="justify-content-center pt-4"
        style={{ position: "relative", top: "56px" }}
      >
        {gblState.homePageData.map((playlist, index) => {
          return (
            <Card style={{ width: "18rem" , margin:'1rem'}} className="animate" key={index}>
              <Card.Img variant="top" src={VideoLogo}/>
              <Card.Body>
                <Card.Title>{playlist.name}</Card.Title>
                <Card.Text>Total duration <Badge bg="secondary">{playlist.duration}</Badge></Card.Text>
                <ProgressBar now={playlist.progress} label={`${playlist.progress}%`} />
                <Link to={`resume/${index}`}>
                <Button variant="primary" style={{marginTop:"0.5rem"}}>Resume {'>'}</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
}

export default Home;
