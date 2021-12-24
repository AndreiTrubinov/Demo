import styles from '../styles/tender.module.scss'
import TopNav from "../components/tender/TopNav";
import TenderSearchBar from "../components/tender/TenderSearchBar"
import TenderViewMenu from "../components/tender/TenderViewMenu";
import TenderTabs from "../components/tender/TenderTabs";
import { TenderCollection } from "../components/tender/TenderCollection"
import {dummyTenders, dummyAccount} from "../utils/dummydata";
import { useRouter } from "next/dist/client/router";
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IUser } from '../utils/account';
import { meStore } from '../utils/stores/meStore';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }: { locale: string }) : Promise<any> {
    return {
        props: {
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
};


const ClientList = () => {

    const router = useRouter();
    const [currentTab, setCurrentTab] = useState("1");
    const [me, setMe] = useRecoilState<IUser|null>(meStore);

    function handleTabChange(key: string) {
        setCurrentTab(key);
    }

    if (typeof window !== "undefined") {
        window.dummyData = {
            account: dummyAccount,
            tenders: dummyTenders,
        };
        if(!me) {
            setMe(dummyAccount);
        }
    }

    return (
        <div>
            <TopNav />
            <div className={styles.container}>
                <TenderViewMenu />
                <TenderSearchBar />
                <TenderTabs onChange={handleTabChange} currentTab={currentTab}/> 
            </div>
            <TenderCollection currentTab={currentTab} />
        </div>
    )
}

export default ClientList;

