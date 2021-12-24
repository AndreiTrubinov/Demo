import styles from "./TenderDetailTabs.module.scss";
import { Tabs } from "antd";
import Appel from "../icons/Appel";
import Response from "../icons/Response";
import Commande from "../icons/Commande";
import Document from "../icons/Document";
import Timer from "../icons/Timer";
import Checked from "../icons/Checked";
import React, { useState } from "react";
import ClientTenderDetailProposalsList from "./ClientTenderDetailProposalsList";
import TenderDetailInfo from "./TenderDetailInfo";
import TenderDetailProposal from "./TenderDetailProposal";
import { IFullTender, ProposalStatus, TenderType } from "../../utils/tender";
import { IUser } from "../../utils/account";
import Chat from "../chat/Chat.js"
import { useRouter } from "next/router";
import te from "date-fns/esm/locale/te/index.js";
import TenderDetailProposalForm from "./TenderDetailProposalForm";

const { TabPane } = Tabs;

interface Props {
    tender: IFullTender;
    me: IUser;
    currentTab: any;
}

export default function TenderDetailTabs ({ currentTab, tender, me }: Props)  {
    const router = useRouter();

    const selectedProposal = router.query.proposalid && tender.proposals.filter(p => p.id.toString() === router.query.proposalid)[0];
    const acceptedProposal = tender.proposals.filter(p => p.status === ProposalStatus.ACCEPTED)[0];
    const myproposal = tender.proposals.filter(p => p.author.id === me.id)[0];
    
    return (
        <div className="offerTabs">
            <Tabs activeKey={currentTab} tabBarGutter={0} className={styles.Tabs} onChange={(key) => router.push({
                    pathname: router.pathname,
                    query: {...router.query, activeKey: key}
                }, undefined, {locale: router.locale})} > 
                <TabPane
                    tab={
                        <span>
                            <Appel /> Appel de offre
                        </span>
                    }
                    key="1"
                >
                    <TenderDetailInfo me={me} tender={tender} currentTab={currentTab}/>
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <Response /> Reponse
                        </span>
                    }
                    key="2"
                >
                     { me.is_agency === true ? (
                         !!myproposal && myproposal.status !== ProposalStatus.DRAFT ?
                        <TenderDetailProposal me={me} tender={tender} currentTab={currentTab} proposal={myproposal}  />
                        :
                        <TenderDetailProposalForm me={me} tender={tender} currentTab={currentTab} proposal={myproposal} />
                    ) : ""}
                    { me.is_company === true ?
                    (
                        router.query.proposalid && selectedProposal ? 
                        <TenderDetailProposal me={me} tender={tender} currentTab={currentTab} proposal={selectedProposal}  />
                        :
                        <ClientTenderDetailProposalsList tender={tender}/>
                    ) : ""}
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Commande /> Commande
                        </span>
                    }
                    key="3"
                >
                    { acceptedProposal ? (
                        <>
                            <div className={styles.opacityBlock}></div>
                            <TenderDetailProposal me={me} tender={tender} currentTab={currentTab} proposal={acceptedProposal} />
                        </>
                    ) : (
                        <p>Pas de proposition acceptée.</p>
                    )}
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Document /> Documents
                        </span>
                    }
                    key="4"
                ></TabPane>
                <TabPane
                    tab={
                        <span>
                            <Timer /> Relevé d’heures
                        </span>
                    }
                    key="5"
                ></TabPane>
                <TabPane
                    tab={
                        <span>
                            <Checked /> Finalisé
                        </span>
                    }
                    key="6"
                ></TabPane>
                <TabPane
                    
                    key="7"
                ><Chat/></TabPane>
            </Tabs>
        </div>
    );
};
