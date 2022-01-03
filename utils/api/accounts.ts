import axios from "axios";
import { IUser } from "../account";
import { tokenStore } from "../stores/tokenStore";
import { newApiAxios, expandUrl } from "./base";
import { ICompany } from "./company";


export function getMe() {
    const p = new Promise<IUser>((resolve, reject) => {
        if (typeof window !== "undefined") {
            if(tokenStore.getRequireLogin()) {
                reject("Login Required");
            } else {
                tokenStore.callWhenTokenAvaible((token) =>
                    newApiAxios()
                        .get("/accounts/me/")
                        .then((resp) => {
                            if (resp.data.success) {
                                window.me = resp.data.data;
                                resolve(resp.data.data);
                            } else {
                                reject(resp);
                            }
                        }, reject)
                );
            }
        } else {
            console.error("getMe should run client side only");
            reject("getMe should run client side only");
        }
    });
    return p;
}

const checkedEmails: { [key: string]: boolean } = {};

export function getIsEmailAvaible(
    email: string,
    useCache = true
): Promise<boolean> {
    if (email.length === 0) return Promise.reject("email vide");
    return new Promise<boolean>((resolve, reject) => {
        if (useCache) {
            if (typeof checkedEmails[email] !== "undefined") {
                console.log(
                    "resolving email from cache with value",
                    checkedEmails[email]
                );
                return resolve(checkedEmails[email]);
            }
        }
        axios
            .get(expandUrl("/accounts/isemailavaible/" + email))
            .then((resp) => {
                if (resp.data.success === true) {
                    if (typeof resp.data.isAvaible !== "undefined") {
                        checkedEmails[email] = resp.data.isAvaible;
                        console.log(
                            "resolving email from api with value",
                            resp.data.isAvaible
                        );

                        return resolve(resp.data.isAvaible);
                    } else {
                        console.log(
                            "resp.data.isAvaible was undefined",
                            resp.data
                        );
                        return reject("resp.data.isAvaible was undefined");
                    }
                } else {
                    console.log(
                        "email avaibility request failed with success false",
                        resp.data
                    );

                    return reject(
                        "email avaibility request failed with success false"
                    );
                }
            }, reject);
    });
}

export interface IRegisterEntrepriseParams {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    mobile: string;
    landline: string;
    company: ICompany;
}

export function registerEntreprise(params: IRegisterEntrepriseParams) {
    const originalRequestPromise = axios.post(
        expandUrl("/accounts/register/entreprise/"),
        params
    );
    // do not chain
    originalRequestPromise.then((resp) => {
        console.log("registersuccess", resp);
    });
    originalRequestPromise.then((resp) => {
        // promiseSetRecoil(tokenStore, data)
        // tokenStore.setToken(resp.data['access_token'])
    });
    return originalRequestPromise; // should be original promise not chained
}

export interface IRegisterAgencyParams {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    mobile: string;
    landline: string;
    company: ICompany;
    business_sectors: number[];
}

export function registerAgency(params: IRegisterAgencyParams) {
    const originalRequestPromise = axios.post(
        expandUrl("/accounts/register/agency/"),
        params
    );
    // do not chain
    originalRequestPromise.then((resp) => {
        console.log("registersuccess", resp);
    });
    originalRequestPromise.then((resp) => {
        // promiseSetRecoil(tokenStore, data)
        // tokenStore.setToken(resp.data['access_token'])
    });
    return originalRequestPromise; // should be original promise not chained
}
