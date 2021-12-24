import React from "react";
import styles from "./TenderDetailInfoConditions.module.scss";
import { Tag } from "antd";
import { getLabelForLocale, ILanguageBasedGeneric } from "../../utils/lang";
import { gTranslatedContractType, gTranslatedWorkerType, IFullTender } from "../../utils/tender";
import { useRouter } from "next/router";
import { IBusinessSector } from "../../utils/api/businesssectors";
import { useTranslation } from "next-i18next";

interface Props {
    tender: IFullTender
}

export default function TenderDetailInfoConditions({ tender } : Props) {
    const router = useRouter();
    const { t } = useTranslation("common");
    return (
        <div className={styles.Conditions}>
            <div className={styles.ConditionsWrapper}>
                <div className={styles.ConditionsLeft}>
                    <h3>Type de placement</h3>
                    <p>{gTranslatedWorkerType(tender, t)}</p>
                    <h3>Salaire brut horaire</h3>

                    <p>{tender.grosssalary} {tender.salarycurrency === 'EUR' ? '€' : '₣'}</p>


                </div>
                <div className={styles.ConditionsRight}>
                    <h3>Type de contrat</h3>
                    <p className={styles.contractType}>{gTranslatedContractType(tender, t)}</p>
                    <h3>Nombre de places</h3>
                    <p className={styles.places}>{tender.numberofworkers}</p>
                </div>
            </div>
            <div className={styles.ConditionsTags}>
                <h3>Secteurs d’activité</h3>
                {tender.business_sectors.map(
                    (aBusinessSector: IBusinessSector) => (
                        <Tag key={aBusinessSector.id}>
                            {getLabelForLocale(aBusinessSector, router.locale)}
                        </Tag>
                    )
                )}
            </div>
        </div>
    );
}
