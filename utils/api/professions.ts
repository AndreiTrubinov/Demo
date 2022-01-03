import axios from "axios";
import { ILanguageBasedGeneric } from "../lang";
import { tokenStore } from "../stores/tokenStore";
import { expandUrl, newApiAxios } from "./base";

// export interface IProfessions {
//     id: number;
//     code: number;
//     labelfr: string;
//     labelen: string;
//     labelde: string;
// }
export interface IProfessions extends ILanguageBasedGeneric {}

export function getProfessions(): Promise<IProfessions[]> {
    return new Promise<IProfessions[]>((resolve, reject) => {
        tokenStore.callWhenTokenAvaible((token) =>
            newApiAxios()
                .get(expandUrl("/professions/all/"))
                .then((resp) => {
                    if (typeof resp.data !== "undefined") {
                        if (resp.data.success === true) {
                            return resolve(resp.data.professions);
                        } else {
                            return reject(
                                "getProfessions request failed with success false"
                            );
                        }
                    } else {
                        // console.log('resp.data was undefined', resp.data);
                        return reject("resp.data was undefined");
                    }
                }, reject)
        );
    });
}
