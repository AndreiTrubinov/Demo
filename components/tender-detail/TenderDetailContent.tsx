import { List, Spin, Tag } from "antd";
import React from "react";
import { useRouter } from "next/dist/client/router";
import styles from "./TenderDetailContent.module.scss";
import { TenderDetailContentDetails } from "./TenderDetailContentDetails";
import { getTenders } from "../../utils/api/tenders";
import { IFullTender } from "../../utils/tender";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { IUser } from "../../utils/account";
import { meStore } from "../../utils/stores/meStore";
import TenderDetailList from "./TenderDetailList";

interface TenderDetailContentProps {
 
}

declare global {
    interface Window {
        dummyData:any;
    }
}

export const TenderDetailContent: React.FC<TenderDetailContentProps> = () => {
    const router = useRouter();

    const [me, setMe] = useRecoilState<IUser|null>(meStore);

    const tendersQuery = useQuery('tenders', getTenders, {
        staleTime: 60000,
        enabled: typeof window !== 'undefined',
        onSuccess: (data: IFullTender[]) => {
            console.log("tenders onSuccess data", data);
        }
    });
    if(me?.is_dummy !== true && tendersQuery.isLoading) {
        return <div><Spin /></div>
    }

    const buildUrl = (selectedId: any) => {
        const q : any = { ...router.query, id: selectedId };
        return (
            router.route +
            "?" +
            Object.keys(q)
                .map((k) => k + "=" + q[k])
                .join("&")
        );
    };

    const itemList = me?.is_dummy && window?.dummyData!.tenders || (tendersQuery.data || []);

    // console.log(`itemList`, itemList);
    
    if (itemList.length === 0) {
        return (
            <div>
                <List dataSource={itemList}></List>
            </div>
        );
    }

    
    function log(e : any) {
        console.log(e);
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.offerList}>
               <TenderDetailList tenders={itemList} />
            </div>


            <div className={styles.offerInfo}>
                <TenderDetailContentDetails />
            </div>

        </div>
    );
};

export default TenderDetailContent;
