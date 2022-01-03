import axios from "axios";
import { tokenStore } from "../stores/tokenStore";
import { IFullTender } from "../tender";
import { newApiAxios, expandUrl } from "./base";
import { ICompany } from "./company";


export function getTenders() {
    const p = new Promise<IFullTender[]>((resolve, reject) => {
        tokenStore.callWhenTokenAvaible((token) => newApiAxios().get('/tenders/list/').then((resp) => {
            if(resp.data.success) {
                resolve(resp.data.tenders)
            } else {
                reject(resp)
            }
            
        }, reject))
    })
    return p
}

export function getTender(tenderid: number | string | string[] | undefined) {
    const p = new Promise<IFullTender>((resolve, reject) => {
        if(typeof tenderid === undefined) {
            return reject("tender id required");
        }
        tokenStore.callWhenTokenAvaible((token) => newApiAxios().get('/tenders/byid/' + tenderid ).then((resp) => {
            if(resp.data.success) {
                resolve(resp.data.tender)
            } else {
                reject(resp.data.message)
            }
            
        }, reject))
    })
    return p
}
