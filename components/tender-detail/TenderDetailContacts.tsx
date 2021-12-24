import { IFullTender } from "../../utils/tender";
import styles from "./TenderDetailContacts.module.scss";

interface Props {
    tender: IFullTender;
    showFullDetails: boolean;
}
export default function TenderDetailContacts({tender, showFullDetails}: Props){

    if(showFullDetails) {
    return <div className={styles.companyInfo + " " + styles.contact}>
            <h3>Contact</h3>
            <h3>{tender.firstname} {tender.lastname}</h3>
            <h3>{tender.phonenumber}</h3>
            <h3 className={styles.infoHeader}>Informations complémentaires</h3>
            <p>{tender.contactinformation}</p>
        </div>
    } else {
        return <div className={styles.companyInfo + " " + styles.contact}>
            <h3>Contact</h3>
            <h3>{tender.firstname} {tender.lastname.charAt(0)}</h3>
        </div>
    }
}