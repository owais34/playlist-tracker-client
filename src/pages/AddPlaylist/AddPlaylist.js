import React,{useState} from "react";
import "./AddPlaylist.css";
import { Container,Card, Row, Col, Button,Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { baseurl } from "../../configs";
import { useNavigate } from "react-router-dom";

function AddPlaylist() {

const [hideLoader, setHideLoader] = useState(true)
const [showToast, setShowToast] = useState(false)
const [toastText, setToastText] = useState("")
const [text, settext] = useState("")
const navigate = useNavigate()

const onClickHandler = (e) => {
    if (!text){
        setToastText("Path cannot be empty")
        setShowToast(true)
        return
    }
        
    setHideLoader(false)
    axios.post(`${baseurl}/add`,{
        "fullPath":text
    })
    .then(res=>{
        navigate("/")
    })
    .catch(e=>{
        setToastText("Path is invalid")
        setHideLoader(true)
        setShowToast(true)
    })
}

const onChange = (e) =>{
    settext(e.target.value)
}



  return (
    <>
    <ToastContainer
          className="p-3"
          position="top-end"
          style={{ zIndex: 1 }}
        >
        <Toast show={showToast} onClose={()=>setShowToast(false)} bg="warning">
        <Toast.Header style={{display:"flex",justifyContent:"space-between"}}>Alert</Toast.Header>
          <Toast.Body>{toastText}</Toast.Body>
        </Toast>
        </ToastContainer>
    <Container className="mt-5 mb-5 d-flex justify-content-center" fluid={true}>
      <Card className="px-1 py-4 ap-card" id="cardForm" hidden={!hideLoader}>
        <Card.Body>
          <Row >
            <Col sm={12}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    className="form-control ap-form-control"
                    type="text"
                    id="fullPath"
                    placeholder="Enter full path to playlist folder"
                    value={text}
                    onChange={onChange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div className="d-flex flex-column text-center px-5 mt-3 mb-4">
            <small className="agree-text"> Example : C:\user\sample</small>
          </div>
          <Row className="px-5">
            <Button variant="primary" onClick={onClickHandler}>Submit</Button>
          </Row>
        </Card.Body>
      </Card>
      <div id="loading" hidden={hideLoader}>
        <div id="success-spinner">
          <div className="loader"></div>
          <h5 className="mt-1" style={{ color: "#5c1422" }}>
            Adding Playlist
          </h5>
        </div>
      </div>
    </Container>
    </>
  );
}

export default AddPlaylist;
