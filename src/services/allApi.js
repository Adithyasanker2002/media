// saveVideoApi - post 
import commonAPI from "./commonApi";
import serverURL from "./serverURL";
export const savevideoApi= async(videoDetails)=>{
    return await commonAPI("POST",`${serverURL}/Uploadvideos`,videoDetails)
}

// getvidoesApi get http rqt called vie wcomponet when component displaeyesd inside itsuse effects
export const getallvideoapi = async ()=>{
    return await commonAPI("GET",`${serverURL}/Uploadvideos`,"")
}
// saveHistoryApi post http request called videocard component when we play video
export const saveHistoryApi= async(history)=>{
    return await commonAPI("POST",`${serverURL}/History`,history)
}
// deletehistoryapi- delete rqst to              called by hsitory component when user click on delete button


export const deletehistoryapi = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/History/${id}`,{})
}
// remove video api - delete http reqt called videocard component when user click on delete button

export const removeVideoApi = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/Uploadvideos/${id}`,{})
}

// 
export const saveCategoriesApi = async (catergoryDetails)=>{
    return await commonAPI("POST",`${serverURL}/Categories`,catergoryDetails)
}
// create all 
export const getAllCategoriesApi = async ()=>{
    return await commonAPI("GET",`${serverURL}/Categories`,{})
}

// delete category
export const deleteCategoryapi = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/Categories/${id}`,{})
}
// updatecategory Api
export const UpdateCategoryapi = async (categoryDetails)=>{
    return await commonAPI("PUT",`${serverURL}/Categories/${categoryDetails.id}`,categoryDetails)
}