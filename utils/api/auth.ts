import axios from "axios";
import { meStore } from "../stores/meStore";
import { tokenStore } from "../stores/tokenStore";
import { expandUrl } from "./base";
import { ICompany, ISearchResult } from "./company";
import { IAddress } from "./geo";

export function login(email: string, password: string) {
    const request = axios.post(
        expandUrl("/auth/login"),
        { email, password },
        { withCredentials: true }
    );
    // do not chain
    request.then((resp) => {
        console.log("loginsuccess", resp);
    });
    request.then((resp) => {
        // promiseSetRecoil(tokenStore, data)
        tokenStore.setToken(resp.data["access_token"]);
    });
    return request; // should be original promise not chained
}

export function logout() {
    const request = axios.post(
        expandUrl("/auth/logout"),
        {},
        { withCredentials: true }
    );
    tokenStore.clearToken();
    // window.me = undefined;

    // do not chain
    // request.then((resp) => {
    //     console.log("loginsuccess", resp);
    // });
    // request.then((resp) => {
    
    // }).catch((err) => console.error(err)).finally(() => tokenStore.clearToken);
    return request; // should be original promise not chained
}

export function refreshToken() {
    const p = new Promise<string>((resolve, reject) => {
        const request = axios.post(
            expandUrl("/auth/refresh"),
            {},
            { withCredentials: true, timeout: 100000 }
        );
        // carefull with chaining
        request
            .then((resp) => {
                console.log("refresh response", resp);
                // promiseSetRecoil(tokenStore, data)
                if (resp.data["success"]) {
                    tokenStore.setToken(resp.data["access_token"]);
                    resolve(resp.data["access_token"]);
                } else {
                    tokenStore.clearTokenAndRequireLogin();
                    reject();
                }
            })
            .catch((error) => {
                tokenStore.clearTokenAndRequireLogin();
                reject(error);
                //console.log('refreshToken error', err.response.status);
                // if (error.response) {
                //     // The request was made and the server responded with a status code
                //     // that falls out of the range of 2xx
                //     console.log('error.response.data', error.response.data);
                //     console.log('error.response.status', error.response.status);
                //     console.log('error.response.headers', error.response.headers);
                // } else if (error.request) {
                //     // The request was made but no response was received
                //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //     // http.ClientRequest in node.js
                //     console.log('error.request', error.request);
                // } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log('error.message', error.message);
                // }
                // console.log(error.config);

                // try {
                //     //console.log('error.toJSON()', error.toJSON());
                //     console.log(`error.response`, error.response)
                //     if (error.response.status === 401) {
                //         // you need to login
                //         return tokenStore.clearTokenAndRequireLogin();
                //     }
                // } catch (wrappererror) {
                //     console.log("error object keyes were", Object.keys(error));
                //     console.log("error object", wrappererror);
                // }
                
            });
    });
    return p;

    //return request.catch; // should be original promise not chained
}
