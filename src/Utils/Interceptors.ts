import axios from "axios";
import store from "../Redux/Store";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {
    if (store.getState().authState.token) {
        request.headers.Authorization = "Bearer " + store.getState().authState.token;
    }
    return request;
})

export default tokenAxios;


//or alternatively for each function sent to the server,
//This option includes all the actions that need to be updated and there is no need to update anything else
// class Interceptors{

//     public create():void{
//         axios.interceptors.request.use(requestObject=>{
//             if(store.getState().authState.token){
//                 requestObject.headers.Authorization= "Bearer " + store.getState().authState.token;
//             }

//             return requestObject;

//         });
// // axios.interceptors.response.use(responseObject=>{
// //     if(responseObject.status===401||responseObject.status===403){
// //         window.location.href="/login";
// //     }return responseObject;
// // })
//     }

// }

// const interceptors = new Interceptors();
// export default interceptors;

