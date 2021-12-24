import styles from "./TenderCollection.module.scss";
import { List, Spin, Tag } from "antd";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { IFullTender, TenderStatus } from "../../utils/tender";
import { useQuery } from "react-query";
import { getTenders } from "../../utils/api/tenders";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { IUser } from "../../utils/account";
import { meStore } from "../../utils/stores/meStore";
import TenderCollectionList from "./TenderCollectionList"
import TenderCollectionGrid from "./TenderCollectionGrid";
import TenderCollectionMap from "./TenderCollectionMap";

interface TenderCollectionProps {
    // tenders: IFullTender[];
    currentTab: string;
}

export const TenderCollection: React.FC<TenderCollectionProps> = ({ currentTab }) => {
    const { t } = useTranslation("common");
    const router = useRouter();

    const [me, setMe] = useRecoilState<IUser|null>(meStore);
    const tendersQuery = useQuery('tenders', getTenders, {
        staleTime: 60000,
        enabled: typeof window !== 'undefined',
        onSuccess: (data: IFullTender[]) => {
            console.log("tenders onSuccess data", data);
        }
    });
    console.log(`me in clientOffer list`, me);
    if(me?.is_dummy !== true && tendersQuery.isLoading) {
        return <div><Spin /></div>
    }

    const tenders : IFullTender[] = me?.is_dummy  && window?.dummyData?.tenders || (tendersQuery.data || []);

    if (tenders.length === 0) {
        return (
            <div>
                <List dataSource={tenders}></List>
            </div>
        );
    }

    let is_gridvariant = router.query.listtype === "grid"
    if (router.query.listtype === "grid") {
        return (
            <TenderCollectionGrid tenders={tenders} is_gridvariant={is_gridvariant} currentTab={currentTab} />
        );
    }
    if (router.query.listtype === "map") {
        return (         
            <TenderCollectionMap tenders={tenders} />         
        );
    }

    return (
        <TenderCollectionList tenders={tenders} currentTab={currentTab} />
    );
};

export default TenderCollection;
