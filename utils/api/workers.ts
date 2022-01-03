import { tokenStore } from "../stores/tokenStore";
import { IWorker } from "../tender";
import { newApiAxios, expandUrl } from "./base";

export function getWorkers(meid: number | string) {
    const p = new Promise<IWorker[]>((resolve, reject) => {
        tokenStore.callWhenTokenAvaible((token) =>
            newApiAxios()
                .get(`/workers/normal/all/for/${meid}/`)
                .then((resp) => {
                    if (resp.data.success) {
                        resolve(resp.data.workers);
                    } else {
                        reject(resp);
                    }
                }, reject)
        );
    });
    return p;
}

export function getWorker(
    meid: number | string,
    workerid: number | string | string[] | undefined
) {
    const p = new Promise<IWorker>((resolve, reject) => {
        if (typeof workerid === undefined) {
            return reject("tender id required");
        }
        tokenStore.callWhenTokenAvaible((token) =>
            newApiAxios()
                .get(`/workers/normal/one/${workerid}/for/${meid}/`)
                .then((resp) => {
                    if (resp.data.success) {
                        resolve(resp.data.worker);
                    } else {
                        reject(resp.data.message);
                    }
                }, reject)
        );
    });
    return p;
}

export function getSnapedWorkers(meid: number | string) {
    const p = new Promise<IWorker[]>((resolve, reject) => {
        tokenStore.callWhenTokenAvaible((token) =>
            newApiAxios()
                .get(`/workers/snaped/all/for/${meid}/`)
                .then((resp) => {
                    if (resp.data.success) {
                        resolve(resp.data.workers);
                    } else {
                        reject(resp);
                    }
                }, reject)
        );
    });
    return p;
}

export function getSnapedWorker(
    meid: number | string,
    workerid: number | string | string[] | undefined
) {
    const p = new Promise<IWorker>((resolve, reject) => {
        if (typeof workerid === undefined) {
            return reject("tender id required");
        }
        tokenStore.callWhenTokenAvaible((token) =>
            newApiAxios()
                .get(`/workers/snaped/one/${workerid}/for/${meid}/`)
                .then((resp) => {
                    if (resp.data.success) {
                        resolve(resp.data.worker);
                    } else {
                        reject(resp.data.message);
                    }
                }, reject)
        );
    });
    return p;
}
