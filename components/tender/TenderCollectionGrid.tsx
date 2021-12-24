import styles from "./TenderCollectionGrid.module.scss";
import React from "react";
import TenderCollectionGridItem from "./TenderCollectionGridItem"
import { IFullTender, TenderStatus } from "../../utils/tender";


interface TenderCollectionGridProps {
    tenders: IFullTender[];
    currentTab?: string;
    is_gridvariant: boolean;
}

export const TenderCollectionGrid: React.FC<TenderCollectionGridProps> = ({ tenders, is_gridvariant, currentTab }) => {

    switch (currentTab) {
        case "2":
            return <div className={styles.TenderGrid}>
                {tenders.filter(tender => tender.status === TenderStatus.PUBLISHED && tender.proposals.length === 0).map((tender) => (
                    <TenderCollectionGridItem key={tender.id} tender={tender} is_gridvariant={is_gridvariant} />
                ))}
            </div>
            break;
        case "3":
            return <div className={styles.TenderGrid}>
                {tenders.filter(tender => tender.proposals.length > 0).map((tender) => (
                    <TenderCollectionGridItem key={tender.id} tender={tender} is_gridvariant={is_gridvariant} />
                ))}
            </div>
            break;
        case "4":
            return <div className={styles.TenderGrid}>
                {tenders.filter(tender => tender.status === TenderStatus.ORDER).map((tender) => (
                    <TenderCollectionGridItem key={tender.id} tender={tender} is_gridvariant={is_gridvariant} />
                ))}
            </div>
            break;
        case "5":
        case "6":
        case "7":
            return <div></div>
            break;
    }
    return <div className={styles.TenderGrid}>
        {tenders.map((tender) => (
            <TenderCollectionGridItem key={tender.id} tender={tender} is_gridvariant={is_gridvariant} />
        ))}
    </div>
}
export default TenderCollectionGrid;





