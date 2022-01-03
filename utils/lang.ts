
export interface ILanguageBasedGeneric {
    id?: number;
    code?: number;
    labelfr: string;
    labelen: string;
    labelde: string;
}


export function getLabelForLocale(x: ILanguageBasedGeneric, locale: string | undefined): string {
    // console.log(`getLabelForLocale args`, {x, locale});
    const l = locale || "fr";
    if (l.toLowerCase().indexOf("fr") !== -1){
        // console.log("getLabelForLocale returns labelfr:", x.labelfr);
        return x.labelfr;
    } else if (l.toLowerCase().indexOf("en") !== -1){
        return x.labelen;
    } else if (l.toLowerCase().indexOf("de") !== -1){
        return x.labelde;
    } else {
        // fr is default
        return x.labelfr;
    }
}

export function getPrettyLocale(locale : string | undefined) : string {
    if (typeof locale === "undefined") {
        return "";
    }
    const locales : {[key: string]: string} = {
        'fr' : "Français",
        'fr-FR': "Français",
        'fr-CH': "Suisse",
        'fr-BE': "Wallon",
        'en': "English",
        'en-GB': "English",
        'en-US': "English",
    };
    if(locales[locale]){
        return locales[locale];
    } else {
        return locale;
    }
    
}

export function extractCountryISOFromLocaleISO(aLocale: string): string {
    if (aLocale.indexOf("-") === -1) {
        return aLocale.toLowerCase();
    } else {
        const sub35 = aLocale.substr(3, 5);
        return sub35.toLowerCase();
    }
}

import { Locale } from 'date-fns';
import { fr, enGB, de } from 'date-fns/locale';

const datelocales: {[key: string]: Locale} = {
  'fr': fr,
  'en': enGB,
  'de': de
};

export function getDateLocalForLocale(aLocale : string | undefined | null) : Locale {
  if(!aLocale) {
    return fr;
  }
  return datelocales[aLocale];
}