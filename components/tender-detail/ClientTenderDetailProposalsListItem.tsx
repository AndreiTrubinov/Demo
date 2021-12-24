import styles from "./ClientTenderDetailProposalsListItem.module.scss";
import Image from "next/dist/client/image";
import companyLogo from "../../public/companyLogo.jpg";
import { useRouter } from "next/router";
import React from "react";
import { IFullTender, IProposal } from "../../utils/tender";

interface Props {
    proposal : IProposal;
    tender: IFullTender;
}
const ClientTenderProposalsListItem = ({ proposal, tender }: Props) => {
    const router = useRouter();
    const urltoproposal = router.asPath;
    return (
        <div className={styles.ReponseListItem}>
            <div className={styles.company}>
                <div className={styles.companyLogo}>
                    <Image src={companyLogo} alt="companyLogo" />
                </div>
                <div className={styles.companyInfo}>
                    <h3>{proposal.author.establishment.name}</h3>
                    <p className={styles.companyLocation}>{proposal.author.establishment.address.locality}, {proposal.author.establishment.address.country}</p>
                </div>
            </div>

            <div className={styles.contacts}>
                <p>Dwain Argueta</p>
                <p className={styles.mail}>redingtn@sbcglobal.net</p>
                <p>{proposal.author.establishment.siret}</p>
            </div>
            <div className={styles.price}>
                
                <div className={styles.prices}>
                {proposal.prepaidoffer && <p>Prépayé<span className={styles.prepay}>{proposal.total1} {tender.salarycurrency === 'EUR' ? '€' : '₣'}</span></p>}
                    {proposal.prepaidoffer && <p>Sur facture<span>{proposal.total0} {tender.salarycurrency === 'EUR' ? '€' : '₣'}</span></p>}
                </div>

                <button className={styles.offerBtn} onClick={() => router.push({
                    pathname: router.pathname,
                    query: {...router.query, proposalid: proposal.id}
                }, undefined, {locale: router.locale})}>
                    
                        Voir l'offre
                    
                </button>
            </div>
        </div>



    );
};

export default ClientTenderProposalsListItem;
