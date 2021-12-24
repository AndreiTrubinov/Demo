import styles from "./TenderCollectionList.module.scss";
import React from "react";
import TenderCollectionListItem from "./TenderCollectionListItem"
import { IFullTender, TenderStatus } from "../../utils/tender";


interface TenderCollectionListProps {
    tenders: IFullTender[];
    currentTab: string;
}
export const TenderCollectionList: React.FC<TenderCollectionListProps> = ({ tenders, currentTab }) => {

    switch (currentTab) {
        case "2":
            return <div className={styles.TenderList}>
                {tenders.filter(tender => tender.status === TenderStatus.PUBLISHED && tender.proposals.length === 0).map((tender) => (
                    <TenderCollectionListItem key={tender.id} tender={tender} />
                ))}
            </div>
            break;
        case "3":
            return <div className={styles.TenderList}>
                {tenders.filter(tender => tender.proposals.length > 0).map((tender) => (
                    <TenderCollectionListItem key={tender.id} tender={tender} />
                ))}
            </div>
            break;
        case "4":
            return <div className={styles.TenderList}>
                {tenders.filter(tender => tender.status === TenderStatus.ORDER).map((tender) => (
                    <TenderCollectionListItem key={tender.id} tender={tender} />
                ))}
            </div>
            break;
        case "5":
        case "6":
        case "7":
            return <div></div>
        break;
    }
    return <div className={styles.TenderList}>
        {tenders.map((tender) => (
            <TenderCollectionListItem key={tender.id} tender={tender} />
        ))}
    </div>
}

export default TenderCollectionList;




