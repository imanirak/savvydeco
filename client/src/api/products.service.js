import savvyAPI from "./axios.config";

const getAllProducts = async ()=>{
    return await savvyAPI.get('/')
}

export {getAllProducts}