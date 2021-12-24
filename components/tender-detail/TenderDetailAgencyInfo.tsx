import styles from "./TenderDetailAgencyInfo.module.scss";


// TODO this is all wrong
export default function TenderDetailAgencyInfo({me, tender}: any){
    //const companyName = me.establishment.name.split(' ');
    return(
                        <div className={styles.companyInfo}>
                            {/* <h3>{companyName[0].charAt(0)+companyName[0].toLowerCase().slice(1)+' '+companyName[1].charAt(0)+companyName[1].toLowerCase().slice(1)}</h3> */}
                            
                            <h3>{tender.firstname} {tender.lastname}</h3>
                            <p className={styles.companyMail}>{me.email}</p>
                            <p>{tender.phonenumber}</p>
                            <h3 className={styles.infoHeader}>Informations complémentaires</h3>
                            <p className={styles.contactinformation}>{tender.contactinformation}</p>
                        </div>
    )
}