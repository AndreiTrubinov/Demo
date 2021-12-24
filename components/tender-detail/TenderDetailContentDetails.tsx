import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { IUser } from "../../utils/account";
import { meStore } from "../../utils/stores/meStore";
import { useQuery } from "react-query";
import { getTender } from "../../utils/api/tenders";
import { IFullTender } from "../../utils/tender";
import TenderDetailTabs from "./TenderDetailTabs";
import TenderDetailHeader from "./TenderDetailHeader";
import { Spin } from "antd";


interface TenderDetailContentDetailsProps {
    // switch to item by props
}

export const TenderDetailContentDetails: React.FC<TenderDetailContentDetailsProps> = () => {
    const router = useRouter();
    // let [currentTab, setCurrentTab] = useState(router.query.activeKey);
    const [me, setMe] = useRecoilState<IUser|null>(meStore);

    const tenderQuery = useQuery(
        ['tender', router.query.id],
        () => getTender(router.query.id && router.query.id), {
            // retry: true,
            staleTime: 6000 * 1000,
            enabled: typeof window !== 'undefined',
            onSuccess: (data: IFullTender) => {
                console.log("tenders onSuccess data", data);
            }
        }
    );

    const tender = (me?.is_dummy && window.dummyData?.tenders.filter((tender: { id: number; }) => tender.id === Number(router.query.id))[0]) || tenderQuery.data;

    // console.log(`item`, item);
    let currentTab = router.query.activeKey;

    if(!tender) {
        return <div><Spin /></div>
    }

    return (
        <div>

            <TenderDetailHeader me={me!} tender={tender} currentTab={currentTab}  />
            <TenderDetailTabs tender={tender} me={me!} currentTab={currentTab} />

        </div>
    );
};

export default TenderDetailContentDetails;
