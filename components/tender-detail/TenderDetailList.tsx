import { List, Spin, Tag } from "antd";
import React from "react";
import { TenderCollectionGridItem } from "../tender/TenderCollectionGridItem";
import { useRouter } from "next/dist/client/router";
import styles from "./TenderDetailList.module.scss";
import CustomScroll from "react-custom-scroll";
import { getTenders } from "../../utils/api/tenders";
import { IFullTender } from "../../utils/tender";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { IUser } from "../../utils/account";
import { meStore } from "../../utils/stores/meStore";
import { useTranslation } from "react-i18next";

interface TenderDetailListProps {
    tenders: IFullTender[];
    // selected: any[];
    // me: any;
}

export const TenderDetailList: React.FC<TenderDetailListProps> = ({tenders}) => {
    // const router = useRouter();
    const {t} = useTranslation("common");

    return (            
                <div className='customScrollbarOffer'>                 
                    <CustomScroll allowOuterScroll={true} className={styles.wrapper}>
                        <div className={styles.content}>
                            <h3 className={styles.offerListHeader}>{t('tenders', "Appels d'offres")}</h3>
                            <div className={styles.filters}>
                                 <Tag className={styles.filtersItem} closable>
                                    Filter 1
                                </Tag>
                                <Tag className={styles.filtersItem} closable >
                                    Filter 2
                                </Tag> 
                            </div>
                            <div className={styles.itemList}>
                                {tenders.map((item: IFullTender) => (
                                    <TenderCollectionGridItem key={item.id} tender={item} />
                                ))}
                            </div>
                        </div>
                    </CustomScroll>
                </div>
    );
};

export default TenderDetailList;
