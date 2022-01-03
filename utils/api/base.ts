
import axios from "axios";
import { tokenStore } from "../stores/tokenStore";
import { refreshToken } from "./auth";

export const baseApiUrl = "http://localhost:8888/webapi"
// export const baseApiUrl = "http://dev.epropal.com:8888/webapi"
export const baseMediaUrl = "http://dev.epropal.com:8888"

export function expandUrl(path: string) : string {
    return baseApiUrl + path;
}

export function newApiAxios() {
    const newApiInstance = axios.create({
        baseURL: baseApiUrl,
        headers: {'Authorization': 'Bearer ' + tokenStore.getToken()}
        // withCredentials: true
    })
    // newApiInstance.interceptors.request.use((config)=>{
    //     config.headers['Authorization'] = 'Bearer ' + tokenStore.getToken();
    //     console.log("config", config);
    //     return config;
    //     //return {...config, headers: {'Authorization': 'Bearer ' + tokenStore.getToken()}}
    //   }, (error) => {
    //     console.log("Interceptor Request Error" + error)
    //   });
    
    // newApiInstance.interceptors.response.use(function (response) {
    //     return response;
    // }, function (error) {
    //     if (401 === error.response?.status) {
    //         refreshToken()
    //         return Promise.reject(error);
    //     } else {
    //         return Promise.reject(error);
    //     }
    // });
    return newApiInstance;
}





export interface simpleObservableType {
    emitNewValue: (newValue: any) => void;
    getValue: () => any;
    subscribe: (key: string, fn: (value: any) => void) => void;
    unsubscribe: (key: string) => void;
}

export function createSimpleObservableValue(initialValue: any) {
    let privateValue = initialValue;
    let subscribers: { [key: string]: any } = {};
    function emitToSubscribers(newValue: any){
        privateValue = newValue;
        for (const subscriber of Object.values(subscribers)) {
            if (typeof subscriber === 'function') {
                subscriber(newValue);
            }
        }
    }

    return {
        emitNewValue: (newValue) => {
            emitToSubscribers(newValue);
        },
        getValue: () => privateValue,
        subscribe: (key, fn) => {
            subscribers[key] = fn;
        },
        unsubscribe: (key) => {
            subscribers[key] = undefined;
        }
    } as simpleObservableType;

}


// axios.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       if (error.response) {
//         if (error.response.status === 401) {
//           // Do something, call refreshToken() request for example;
//           // return a request
//           return axios_instance(config);
//         }
  
//         if (error.response.status === ANOTHER_STATUS_CODE) {
//           // Do something 
//           return Promise.reject(error.response.data);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );

