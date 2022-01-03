import { IEstablishment, IUser } from "./account";
import { IBusinessSector } from "./api/businesssectors";
import { IAddress } from "./api/geo";
import { ILanguageBasedGeneric } from "./lang";

export enum TenderStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  ORDER = 'ORDER',
  FINISHED = 'FINISHED'
}

export enum RecruitmentReason {
  ACC_TEMP = 'ACC_TEMP',
  REMPLACEMENT = 'REMPLACEMENT',
  UNTIL_RECRUITEMENT = 'UNTIL_RECRUITEMENT',
  USUAL_TEMP = 'USUAL_TEMP',
  SEASON_JOB = 'SEASON_JOB'
}

export enum TenderType {
        DELEGATION = 'DELEGATION',
        MANAGED = 'MANAGED'
}

export enum WorkerType {
    INTERIM = 'INTERIM',
    AUTOENTREPRENEUR = 'AUTOENTREPRENEUR',
    PLACEMENT = 'PLACEMENT',
    INTERIM_AND_AUTOENTREPRENEUR = 'INTERIM_AND_AUTOENTREPRENEUR'
}

export enum ContractType {
    CDI = 'CDI',
    CDD = 'CDD',
    TEMPORARY = 'TEMPORARY'
}

export enum CurrencyType {
    EUR = 'EUR',
    CHF = 'CHF'
}
export enum DriverLicenseChoices {
    None = '',
    B = 'B',
    A = 'A',
    BE = 'BE',
    C = 'C',
    CE = 'CE',
    D = 'D',
    DE = 'DE'
}
        
export enum VehicleRequired {
    YES = 'YES',
    NO = 'NO',
    PREFERABLE = 'PREFERABLE'
}

export interface ITenderPeriod {
  id: number;
  tender: number;
  start: string;
  end: string;
  pause: number;
}

export interface IAuthor {
  id: number;
  establishment: IEstablishment,
  business_sectors: IBusinessSector[],
}

export enum LanguageLevelType {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export interface IRequiredLanguage {
  id: number;
  tender?: number;
  language: string;
  spoken: keyof typeof LanguageLevelType;
  written: keyof typeof LanguageLevelType;
  notes: string;
}

export type ISOdatestring = string;

export enum ProposalStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
  CANCELLED = "CANCELLED"
}

export interface IDocument {
  id: number;
  file: string;
  category: string;
}

export interface INationality {
    id: number;
    code: string;
    labelfr: string;
    labelen: string;
    labelde: string;
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IWorker {
  id: number;
  created: ISOdatestring;
  modified: ISOdatestring;
  address: IAddress;
  nationality?: INationality;
  firstname: string;
  lastname: string;
  gender: keyof typeof GenderType;
  phonenumber: string;
  email: string;
  owner: number;
  documents: IDocument[];
}


export interface IProposal {
  id: number;
  created: ISOdatestring;
  modified: ISOdatestring;
  status: keyof typeof ProposalStatus;
  tender?: number;
  author: IAuthor;
  // establishment: IEstablishment; // this was removed, use author.establishment
  publishdate: ISOdatestring;
  message: string;
  coefficient0: number;
  coefficient1: number;
  includeterms: true;
  increasedcoefficient0: null;
  increasedcoefficient1: null;
  nbdays: null;
  nbhours: null;
  offer: true;
  otherexpenses0: null;
  otherexpenses1: null;
  prepaidoffer: true;
  rawhourlyrate: null;
  total0: number;
  total1: number;
  workers: IWorker[];
  documents: IDocument[];
}


export interface IFullTender {
    id: number;
    status: keyof typeof TenderStatus;
    created: ISOdatestring;
    modified: ISOdatestring;
    author: IAuthor;
    tendertype: keyof typeof TenderType;
    clientref: string;
    jobtitle: string;
    remote: Boolean;
    numberofworkers: number;
    workertype: keyof typeof WorkerType;
    contracttype: keyof typeof ContractType;
    start: string;
    end?: string;
    hourscount: number;
    grosssalary: number;
    salarycurrency: string;
    recruitmentreason: keyof typeof RecruitmentReason;
    requireddriverlicense: string;
    vehiclerequired: keyof typeof VehicleRequired;
    requiredlanguages: IRequiredLanguage[];
    formation: string;
    certification: string;
    software: string;
    budget: number | null;
    budgetcurrency: string | null;
    payroll: number | null;
    additionalpayrollinformation: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    contactinformation: string;
    // establishment: number; // this was removed, use author.establishment
    publishdate?: string;
    workplace: IAddress;
    business_sectors: ILanguageBasedGeneric[];
    providedworkers: IWorker[];
    periods: ITenderPeriod[];
    proposals: IProposal[];
    // myproposals?: IProposal[] | null;
    stared?: boolean; // this does not exist on server. This is just to make that front code builds.
}


export const gTranslatedContractType = (tender: IFullTender, t : (transkey: string, defaulttrans: string) => string) => {
  switch (tender.contracttype) {
    case ContractType.CDD:
      return t(ContractType.CDD, 'CDD');
      // break;
  
    case ContractType.CDI:
      return t(ContractType.CDI, 'CDI');
      // break;

    case ContractType.TEMPORARY:
      return t(ContractType.TEMPORARY, 'Temporaire');
      // break;
    
    default:
      return "";
      // break;
  }
};

export const gTranslatedTenderStatus = (tender: IFullTender, t : (transkey: string, defaulttrans: string) => string) => {
  switch (tender.status) {
    case TenderStatus.DRAFT:
      return t(TenderStatus.DRAFT, 'Brouillon');

    case TenderStatus.PUBLISHED:
      return t(TenderStatus.PUBLISHED, 'Publié');

    case TenderStatus.ORDER:
      return t(TenderStatus.ORDER, 'Commande');
    
    case TenderStatus.FINISHED:
      return t(TenderStatus.FINISHED, 'Finalisé');

    case TenderStatus.CANCELLED:
      return t(TenderStatus.CANCELLED, 'Annulé');
  
    default:
      return "Statut non géré (" + tender.status + ")";
      // break;
  }
};


export const gTranslatedGenderType = (gender: GenderType, t : (transkey: string, defaulttrans: string) => string) => {
  switch (gender) {
    case GenderType.MALE:
      return t(GenderType.MALE, 'Madame');

    case GenderType.FEMALE:
      return t(GenderType.FEMALE, 'Monsieur');

    default:
      return "";
  }
};

export const gTranslatedVehicleRequired = (tender: IFullTender, t : (transkey: string, defaulttrans: string) => any) => {
  switch (tender.vehiclerequired) {
    case VehicleRequired.YES:
      return t(VehicleRequired.YES, 'Requis');
      // break;
  
    case VehicleRequired.NO:
      return t(VehicleRequired.NO, 'non Requis');
      // break;

    case VehicleRequired.PREFERABLE:
      return t(VehicleRequired.PREFERABLE, 'Preferable');
      // break;
    
    default:
      return "";
      // break;
  }
};

export const gTranslatedWorkerType = (tender: IFullTender, t : (transkey: string, defaulttrans: string) => any) => {
  switch (tender.workertype) {
    case WorkerType.INTERIM:
      return t(WorkerType.INTERIM, 'Interim');
      // break;
  
    case WorkerType.AUTOENTREPRENEUR:
      return t(WorkerType.AUTOENTREPRENEUR, 'Autoentrepreneur');
      // break;

    case WorkerType.PLACEMENT:
      return t(WorkerType.PLACEMENT, 'Placement');
      // break;

    case WorkerType.INTERIM_AND_AUTOENTREPRENEUR:
        return t(WorkerType.INTERIM_AND_AUTOENTREPRENEUR, 'Interim & Autoentrepreneur');
        // break;
    
    default:
      return "";
      // break;
  }
};



 
