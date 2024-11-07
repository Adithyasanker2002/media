import React from 'react'
import { Link } from 'react-router-dom'
import { deletehistoryapi } from '../services/allApi'

const History = () => {
  const removeHistory = async (id)=>{
    try{
      await deletehistoryapi(id)
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div style={{paddingTop:'100px'}}>
      <div className='container d-flex justify-content-between'>
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
        </div>
        <table className='container my-5 table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Caption</th>
              <th>Link</th>
              <th>Time Stamp</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Caption</td>
              <td><a target='_blank' href="https://youtu.be/P6yGr0zhuQI?si=XpfR1rU5s6N2ekPu">https://youtu.be/P6yGr0zhuQI?si=XpfR1rU5s6N2ekPu</a></td>
              <td>9/11/2024, 11:53:43 AM GMT+5:30</td>
              <td><button onClick={()=>removeHistory(videoDetails?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button></td>
            </tr>
          </tbody>

        </table>
    </div>
  )
}

export default History