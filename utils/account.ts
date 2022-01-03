import { IBusinessSector } from './api/businesssectors';
import { IAddress } from './api/geo';

export interface IEstablishment {
    id: number;
    name: string;
    siret: string;
    address: IAddress;
}

export interface IUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    mobile: string;
    landline: string;
    is_active: boolean;
    date_joined: string; //"2021-10-06T08:06:04+00:00";
    is_company: boolean;
    is_agency: boolean;
    establishment: IEstablishment;
    business_sectors: IBusinessSector[];
    is_dummy?: boolean; // used for dummy data in dev. Has no server support.
};