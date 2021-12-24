import React from "react";
import styles from "./TenderDetailRequires.module.scss";
import { Tag } from "antd";
import TenderDetailRequiresLanguage from "./TenderDetailRequiresLanguage";
import { gTranslatedVehicleRequired, IFullTender } from "../../utils/tender";
import { useTranslation } from "next-i18next";

interface Props {
    tender: IFullTender;
    //showFullDetails: boolean;
}
export default function TenderDetailRequires({ tender }:Props){
    const { t } = useTranslation("common");
    return(
        <div className={styles.Requires}>
            <div className={styles.requiresTitle}>
                <span>Requis</span>
            </div>
            <div className={styles.requiresTags}>
            {tender.requireddriverlicense || tender.vehiclerequired ? <><h3>Permis et véhicule</h3> 
                {tender.requireddriverlicense ? <Tag>Permis {tender.requireddriverlicense}</Tag> : ('')} 
                <Tag>Véhicule {gTranslatedVehicleRequired(tender, t)}</Tag>
                </>
                : ('')}
                {tender.requiredlanguages.length > 0 ?
                <>
                <h3>Langues</h3>
                {tender.requiredlanguages.map((lang) => (      
                    <TenderDetailRequiresLanguage key={lang.id} lang={lang} />))}
                </> : ('')}
                
                {tender.formation.length > 0 ?
                <>
                <h3 className={styles.requiresFormations}>Formations</h3>
                {tender.formation.split(', ').map((formation) => (
                    <Tag key={formation}>{formation}</Tag>
                ))}
                </> : ('')}

                {tender.certification.length > 0 ?
                <>
                <h3>Certifications</h3>
                {tender.certification.split(', ').map((certification) => (
                    <Tag key={certification}>{certification}</Tag>
                ))}
                </> : ('')}

                {tender.software.length > 0 ?
                <>
                <h3>Logiciels</h3>
                {tender.software.split(', ').map((software) => (
                    <Tag key={software}>{software}</Tag>
                ))}
                </> : ('')}
            </div>
        </div>
    )
}

function t(tender: any, t: any): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined {
    throw new Error("Function not implemented.");
}
