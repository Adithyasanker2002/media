import { Modal,Form,FloatingLabel,Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { deleteCategoryapi, getAllCategoriesApi, removeVideoApi, saveCategoriesApi, UpdateCategoryapi } from '../services/allApi';
import VideoCard from './VideoCard';

const Category = ({setDeleteResponseFromCategory,deleteresponseFromView}) => {
  const [allCategories,setAllCategories]=useState([])
  const [categoryName,setCatergoryName]=useState("")
  const [show, setShow] = useState(false);
  useEffect(()=>{
    getAllCategories()
  },[deleteresponseFromView])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSaveCategory=  async() =>{
 if(categoryName){
const categoryDetails ={categoryName,allVideos:[]}
try{
  const result = await saveCategoriesApi (categoryDetails)
  alert("Category Created")
  getAllCategories()
  handleClose()
}catch(err){
  console.log(err);
  
}
 }else{
  alert("Please Provide a Name To Your Category")
 }
  }
  const getAllCategories = async()=>{
  try{
    const result = await getAllCategoriesApi()
    if(result.status>=200 && result.status<300){
      setAllCategories(result.data)
    }

  }catch(err){
    console.log(err);
    
  }
  }
  console.log(allCategories);
  const removeCategory = async(id)=>{
    try{
      await deleteCategoryapi(id)
      getAllCategories()
    }catch(err){
      console.log(err);
      
    }
  }
  const dragOverCategory =(e)=>{
    e.preventDefault()
  }
  const videoCardDropOverCategory = async (e,categoryDetails)=>{
    console.log("Inside videoCardDropOver");
    // console.log(categoryDetails);
    const videodetails = JSON.parse(e.dataTransfer.getData("videodetails"))
    console.log(videodetails);
    // update category by add video to its allvideos
categoryDetails.allVideos.push(videodetails)
console.log(categoryDetails);

await UpdateCategoryapi(categoryDetails)
getAllCategories()
const result =  await removeVideoApi(videodetails.id)
setDeleteResponseFromCategory(result)

    
    // console.log(categoryDetails);
    
    
  }
  const categoryVideoDragStarted =(e,dragVideoDetails,categoryDetails)=>{
    console.log("Inside categoryVideoDragStarted ");
    let dragData = {video:dragVideoDetails,categoryDetails}
    e.dataTransfer.setData("dragData",JSON.stringify(dragData))
    
  }


  // 
  
  return (
    <>
    <div className="d-flex justify-content-around align-items-center">
      <h3>All Categories</h3>
      <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
    </div>
    {/* Display Category */}
    <div className='container-fluid mt-3'>
      {/* single category view */}
      {
        allCategories?.length>0?
         allCategories?.map(categoryDetails=>(
          <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>videoCardDropOverCategory(e,categoryDetails)} key={categoryDetails?.id} className="border rounded p-3 mb-3"> 
          <div className="d-flex justify-content-between">
            <h5>{categoryDetails.categoryName}</h5>
            <button  onClick={()=>removeCategory(categoryDetails?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
          </div>
          {/* display catergory video */}
          <div className="row mt-2">
            {
              categoryDetails?.allVideos?.length>0&&
              categoryDetails?.allVideos.map(videos=>(
                <div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,videos,categoryDetails)} key={videos.id} className="col-lg-4">
              {/* videocard */}
              <VideoCard insideCategory={true} displayData={videos}/>
            </div>
              ))
            }
          </div>
        </div>
         ))
        :
        <div className='fw-bolder text-danger fs-5'>No Categories were added yet!!</div>
      }
    

      

    </div>
    <Modal centered show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Category Name">

             <Form.Control onChange={e=>setCatergoryName(e.target.value)} type="text" placeholder="Category Name" />

          </FloatingLabel></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} className='btn btn-info' variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Category