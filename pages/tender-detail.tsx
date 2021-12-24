import styles from "../styles/tender-detail.module.scss";
import TopNav from "../components/tender/TopNav";
import React, { useEffect } from "react";
import TenderDetailContent from "../components/tender-detail/TenderDetailContent";
import {dummyTenders, dummyAccount} from "../utils/dummydata";
import { useRecoilState } from "recoil";
import { IUser } from "../utils/account";
import { meStore } from "../utils/stores/meStore";
import { useRouter } from "next/router";


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getServerSideProps({ locale }: { locale: string }) : Promise<any> {
    return {
        props: {
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
};

const TenderDetail = () => {

    const [me, setMe] = useRecoilState<IUser|null>(meStore);
    const router = useRouter();

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
        <div className={styles.wrapper}>
            <TopNav />
            <TenderDetailContent />                       
        </div>
    );
}

export default TenderDetail;