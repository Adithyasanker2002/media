import React,{useState} from 'react'
import { Card,Modal } from 'react-bootstrap'
import { removeVideoApi } from '../services/allApi';

const VideoCard = ({displayData,setDeleteVideoResponseFromVideoCard,insideCategory}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // display modal
    setShow(true);
    // store history in json
    const {caption,youTubeLink} = displayData
    const sysDateTime = new Date()
    console.log(sysDateTime);
    

  }
  const removeVideo= async(id)=>{
    try{
     const result = await removeVideoApi(id)
     setDeleteVideoResponseFromVideoCard(result)
    }catch(err){
console.log(err);

    }
  }
  const videoCardStarted=(e,dragvideoDetails)=>{
 console.log("Inside videoCardDragstarted with videoid"+dragvideoDetails?.id);
//  share data using event drag start
  e.dataTransfer.setData("Videodetails",JSON.stringify(dragvideoDetails))
 
  }

  return (
    <>
    <Card draggable={true} onDragStart={e=>videoCardStarted(e,displayData)} style={{ height: '250px' }}>
      <Card.Img onClick={handleShow} variant="top" height={'150px'} src={displayData?.imgUrl} />
      <Card.Body>
        
        <Card.Text className='d-flex justify-content-between'>
          <p>{displayData?.caption}</p>
         { !insideCategory&& <button onClick={()=>removeVideo(displayData?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>}
        </Card.Text>
        
      </Card.Body>
      
    </Card>
    <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe width="100%" height="400" src={`${displayData?.youTubeLink}?autoplay=1`} title="ഇനി Apple ഒന്ന് വിറയ്ക്കും! Snapdragon 8 Elite 🔥പവർ Item!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></Modal.Body>
        
      </Modal>
    </>
  )
}

export default VideoCard