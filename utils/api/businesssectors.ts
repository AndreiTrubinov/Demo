import { ILanguageBasedGeneric } from './../lang';
import axios from "axios";
import { expandUrl } from "./base";

export interface IBusinessSector extends ILanguageBasedGeneric {
}


export function getBusinessSectors(): Promise<IBusinessSector[]> {
    return new Promise<IBusinessSector[]>((resolve, reject) => {
        axios
            .get(expandUrl("/business_sectors/all/"))
            .then((resp) => {
                if (typeof resp.data !== "undefined") {
                    if (resp.data.success === true) {
                        return resolve(resp.data.sectors);
                    } else {
                        return reject(
                            "getBusinessSectors request failed with success false"
                        );
                    }
                } else {
                    // console.log('resp.data was undefined', resp.data);
                    return reject("resp.data was undefined");
                }
            }, reject);
    });
}
