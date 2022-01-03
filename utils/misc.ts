import { ReactFragment } from 'react';
import { IUser } from "./account";

export const syncdebounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const djb2 = (str: string) => {
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
};

export const hashStringToColor = (str: string, ) => {
    const hash = djb2(str);
    // const r = (hash & 0xff0000) >> 16;
    // const g = (hash & 0x00ff00) >> 8;
    // const b = hash & 0x0000ff;
    // don't do bright :
    const r = (hash & 0xaa0000) >> 16;
    const g = (hash & 0x00aa00) >> 8;
    const b = hash & 0x0000aa;

    // const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
    // const contrastcolor = brightness > 125 ? 'black' : 'white';
    return (
        "#" +
        ("0" + r.toString(16)).substr(-2) +
        ("0" + g.toString(16)).substr(-2) +
        ("0" + b.toString(16)).substr(-2)
    );
};

export function omit<T extends object = {}>(
    obj: T,
    keys: string[]
): Partial<T> {
    return (keys as any).reduce((a: Partial<T>, e: keyof T) => {
        const { [e]: omitted, ...rest } = a;
        return rest;
    }, obj);
}

export function basepathfor(me: IUser): string {
    return (me.is_agency ? '/agency' : "") + (me.is_company ? '/entreprise' : "");
}

// export function nl2br(text: string) {
//     return <ReactFragment>{text.split('\n').map((item, key) => {
//         return <ReactFragment key={key}>{item}<br/></ReactFragment>
//       })}</ReactFragment>
// }