import axios from "axios";
import { expandUrl } from "./base";
import { IAddress } from "./geo";

export interface ICompany {
    name: string;
    siret: string;
    address: IAddress;
}

export interface ISearchResult {
    name: string;
    siret: string;
    address: string;
}

const checkedInsee: { [key: string]: ISearchResult[] } = {};

export function searchInsee(
    searchTerm: string,
    useCache = true
): Promise<ISearchResult[]> {
    if (searchTerm.length === 0) return Promise.reject("searchTerm vide");
    return new Promise<ISearchResult[]>((resolve, reject) => {
        if (useCache) {
            if (typeof checkedInsee[searchTerm] !== "undefined") {
                // console.log("resolving insee searchTerm from cache with value", checkedInsee[searchTerm]);
                return resolve(checkedInsee[searchTerm]);
            }
        }
        axios
            .get(expandUrl("/company/search/datasource/insee"), {
                params: { searchTerm },
            })
            .then((resp) => {
                if (typeof resp.data !== "undefined") {
                    if (resp.data.success === true) {
                        checkedInsee[searchTerm] = resp.data.data;
                        // console.log("resolving insee searchTerm from api with value", resp.data.data);

                        return resolve(resp.data.data);
                    } else {
                        // console.log("insee searchTerm request failed with success false", resp.data);
                        if (resp.data.message === "Aucun élément trouvé")
                            return resolve([]);

                        return reject(
                            "insee searchTerm request failed with success false"
                        );
                    }
                } else {
                    // console.log('resp.data was undefined', resp.data);
                    return reject("resp.data was undefined");
                }
            }, reject);
    });
}
