import React,{ useState } from "react"
import { Modal,Button,Form,FloatingLabel } from "react-bootstrap"
import { savevideoApi } from "../services/allApi"


const Add = ({setAddResponseFromHome}) => {
  const [invalidYoutubeLink,setInvalidYoutubeLink] = useState(false)
  const [videoDetails, setVideoDetail]= useState({
    caption:"",imgUrl:"",youTubeLink:""
  })
  console.log(videoDetails);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const extractingEmbedLinkFromYoutubeLink =(userInputYoutubeLink)=>{
  if(userInputYoutubeLink.includes("https://www.youtube.com/watch?v=")){
      console.log(userInputYoutubeLink.split("v=")[1].slice(0,11));
      const videoId=userInputYoutubeLink.split("v=")[1].slice(0,11)
      setInvalidYoutubeLink(false)
      setVideoDetail({...videoDetails,youTubeLink:`https://www.youtube.com/embed/${videoId}`})
      
    }else{
      setInvalidYoutubeLink(true)
      setVideoDetail({...videoDetails,youTubeLink:""})
    }
  }
  const handleUploadVideo= async ()=>{
    const {caption,imgUrl,youTubeLink} = videoDetails
    if(caption && imgUrl && youTubeLink){
      // alert("Proceed to store video details Permenantly")
      try{
        const result = await savevideoApi(videoDetails)
        console.log(result);
        if(result.status>=200 && result.status<300){
          alert("Video uploaded successfully!!!")
          handleClose()
          // pass result to view component
          setAddResponseFromHome(result)
        }else{
          console.log(result);
          
        }
        
      }catch(err){
        console.log(err);
        
      }
    }else{
      alert("Please fill form!!!")
    }
  }

  return (
    <>
    <div className="d-flex align-items-center">
      <h5>Upload New Video</h5>
      <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <FloatingLabel
        controlId="floatingInput"
        label="Video Caption"
        className="mb-3"
      >
        <Form.Control onChange={e=>setVideoDetail({...videoDetails,caption:e.target.value})} type="text" placeholder="Video Caption" />
      </FloatingLabel>
      <FloatingLabel className="mb-3" controlId="floatingInput" label="Video Image URL">
        <Form.Control onChange={e=>setVideoDetail({...videoDetails,imgUrl:e.target.value})} type="text" placeholder="Video Image URL"/>
      </FloatingLabel>
      <FloatingLabel  controlId="floatingInput" label="Video Youtube Link">
        <Form.Control onChange={e=>extractingEmbedLinkFromYoutubeLink(e.target.value)}  type="text" placeholder="Video Youtube Link" />
      </FloatingLabel>
      {invalidYoutubeLink && <div className="text-danger fw-bolder mt-5">Invalid Youtube Link..Please try again</div>
      }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUploadVideo} className="btn btn-info" variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add










