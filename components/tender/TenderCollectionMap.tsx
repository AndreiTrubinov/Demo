import styles from "./TenderCollectionMap.module.scss";
import React from "react";
import TenderCollectionGridItem from "./TenderCollectionGridItem"
import CustomScroll from "react-custom-scroll";
import { IFullTender } from "../../utils/tender";


interface TenderCollectionMapProps {
    tenders: IFullTender[];
    // currentTab: string;
}

export const TenderCollectionMap: React.FC<TenderCollectionMapProps> = ({ tenders }) => {
    return (
        <div className={styles.TenderMap}>
            <CustomScroll className="mapCustomScroll">
                <div className={styles.TenderMapList}>
                    {tenders.map((tender) => (
                        <TenderCollectionGridItem key={tender.id} tender={tender} />
                    ))}
                </div>
            </CustomScroll>
            <div className={styles.Map}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.75769510961!2d2.277020467265389!3d48.85895068067619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2z0J_QsNGA0LjQtiwg0KTRgNCw0L3RhtC40Y8!5e0!3m2!1sru!2sru!4v1631615440928!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                ></iframe>
            </div>
        </div>
    )
}

export default TenderCollectionMap;





