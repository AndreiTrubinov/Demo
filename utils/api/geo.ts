import axios from "axios";
import { expandUrl } from "./base";

export interface IAddress {
    streetnumber: string;
    route: string;
    locality: string;
    administrativearealevel2: string;
    administrativearealevel1: string;
    country: string;
    postalcode: string;
    formattedaddress: string;
    lat: number;
    lng: number;
    placeid: string;
}

const checkedAddresses: { [key: string]: IAddress[] } = {};

export function searchAddress(
    searchTerm: string,
    useCache = true
): Promise<IAddress[]> {
    if (searchTerm.length === 0) return Promise.reject("searchTerm vide");
    return new Promise<IAddress[]>((resolve, reject) => {
        if (useCache) {
            if (typeof checkedAddresses[searchTerm] !== "undefined") {
                console.log(
                    "resolving address searchTerm from cache with value",
                    checkedAddresses[searchTerm]
                );
                return resolve(checkedAddresses[searchTerm]);
            }
        }
        axios
            .get(expandUrl("/geo/search/address"), { params: { searchTerm } })
            .then((resp) => {
                if (resp.data.success === true) {
                    if (typeof resp.data !== "undefined") {
                        checkedAddresses[searchTerm] = resp.data.data;
                        if(resp.data.data?.length > 0){
                            for (const anAddress of resp.data.data) {
                                checkedAddresses[anAddress.formattedaddress] = [anAddress];
                            }
                        }
                        console.log(
                            "resolving address searchTerm from api with value",
                            resp.data.data
                        );

                        return resolve(resp.data.data);
                    } else {
                        console.log("resp.data was undefined", resp.data);
                        return reject("resp.data was undefined");
                    }
                } else {
                    console.log(
                        "address searchTerm request failed with success false",
                        resp.data
                    );
                    if (resp.data.message === "Aucun élément trouvé")
                        return resolve([]);

                    return reject(
                        "address searchTerm request failed with success false"
                    );
                }
            }, reject);
    });
}
