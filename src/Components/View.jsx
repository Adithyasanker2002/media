// rafce
import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getallvideoapi, savevideoApi, UpdateCategoryapi } from '../services/allApi'

const View = ({addResponseFromHome,deleteresponseFromCategory,setDeleteResponseFromView}) => {
  const [deleteVideoResponseFromVideoCard,setDeleteVideoResponseFromVideoCard] = useState("")
  const [allvideos,setallvideos]=useState([])
  useEffect(()=>{
    getallvideos()
  },[addResponseFromHome,deleteVideoResponseFromVideoCard,deleteresponseFromCategory,setDeleteResponseFromView])
  console.log(allvideos);
  
  const getallvideos = async()=>{
    try{
const result = await getallvideoapi()
if(result.status>=200 && result.status<300){
  console.log(result);
  if(result.status>=200&& result.status<300){
    setallvideos(result.data)
  }
  
}
    }catch(err){
      console.log(err);
      
    }
  } 
  const dragOverView= (e)=>{
    e.preventDefault()
  }
  const categortVideoDropOverView = async(e)=>{
    console.log("Inside categortVideoDropOverView");
    const {video,categoryDetails} = JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video,categoryDetails);
    const updatedCategoryVideoList= categoryDetails?.allvideos?.filter(item=>item.id!=video?.id)
    const updatedCategory ={...categoryDetails,allvideos:updatedCategoryVideoList}
    console.log(updatedCategory);
    const result = await UpdateCategoryapi(updatedCategory)
    setDeleteResponseFromView(result)
    await savevideoApi(video)
    getallvideos()

    
    
    
  }
  return (
    <>
    <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categortVideoDropOverView(e)}>
  {
    allvideos?.length>0?
    allvideos?.map(video=>(
      <Col key={video?.id} className='mb-2' sm={12} md={6} lg={3}>
      <VideoCard setDeleteVideoResponseFromVideoCard={setDeleteVideoResponseFromVideoCard} displayData={video} />
      </Col>
    ))
:
<div className='fw-bolder text-danger fs-5'>No videos are uploaded yet</div>
  }
     
    </Row>

    </>
  )
}

export default View