import axios from "axios";
import { INationality } from "../tender";
import { expandUrl } from "./base";

export function getNationalities(): Promise<INationality[]> {
    return new Promise<INationality[]>((resolve, reject) => {
        axios.get(expandUrl("/nationalities/all/")).then((resp) => {
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
