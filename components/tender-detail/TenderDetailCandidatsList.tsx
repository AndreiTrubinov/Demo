import React from "react";
import CustomScroll from "react-custom-scroll";
import { useTranslation } from "react-i18next";
import { IFullTender } from "../../utils/tender";
import styles from "./TenderDetailCandidatsList.module.scss";
import TenderDetailCandidatsListItem from "./TenderDetailCandidatsListItem";

interface Props {
    tender: IFullTender;
    currentTab: string;
    showFullDetails: boolean;
}
export default function TenderDetailCandidatsList({ tender, currentTab, showFullDetails }: Props) {
    const {t} = useTranslation('common');
    return (
        <div className={styles.candidats}>
            <div className={styles.candidatsHeader}>
                {/* <h3>{tender.providedworkers?.length > 1 ? t('candidat_plural', 'Candidats') : t('candidat', 'Candidat') }</h3> */}
                <h3>{t('candidat_plural', 'Candidats')}</h3>
                <span>{tender.providedworkers.length}</span>
            </div>

            <CustomScroll className={tender.providedworkers.length === 0 ? "hidden" : "customScroll"}>
                <div className={styles.candidatsList}>
                {tender.providedworkers.map((worker) => (      
                    <TenderDetailCandidatsListItem key={worker.id} worker={worker} tender={tender} showFullDetails={showFullDetails} />))}
                                                            
                    <div className={styles.paddingBottom}></div>

                </div>
            </CustomScroll>
        </div> 
    );
}
