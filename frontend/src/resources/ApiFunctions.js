import axios from "axios";
import { SERVICEURL } from "./Const"

const urlAPI = "https://"+SERVICEURL+"/";

export const getPetition=async(path,callback)=>{
    await axios.get(urlAPI+path)
                .then(
                    response=>{
                        callback(response.data);
                    }
                ).catch(error=>{
                    console.log(error);
                })
}
export const postPetition=async(path,data,callback)=>{
    await axios.post(urlAPI+path,data)
                .then(response=>{
                    if(callback!=undefined)
                        callback(response.data)
                }).catch(error=>{
                    console.log(error);
                })
}
export const putPetition=async(path,data,callback)=>{
    await axios.put(urlAPI+path,data)
        .then(response=>{
            if(callback!=undefined){
                callback(response)
            }
        }).catch(error=>{
            if(error.request.status === 401){
                return callback(error.request)
            }else if(error.request.status === 400){
                return callback(error.request)
            }
            console.log(error);
        })
}
export const deletePetition=async(path)=>{
    await axios.delete(urlAPI+path)
    .then(()=>{
    }).catch(error=>{
      console.log(error);
    })
  }

