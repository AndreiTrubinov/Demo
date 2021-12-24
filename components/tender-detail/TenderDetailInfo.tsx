import styles from "./TenderDetailInfo.module.scss";
import React, { useState } from "react";
import TenderDetailCandidatsList from "./TenderDetailCandidatsList";
import TenderDetailContacts from "./TenderDetailContacts";
import TenderDetailRequires from "./TenderDetailRequires";
import TenderDetailInfoConditions from "./TenderDetailInfoConditions";
import TenderDetailInfoDates from "./TenderDetailInfoDates";
import { IFullTender, ProposalStatus, TenderType } from "../../utils/tender";
import { IUser } from "../../utils/account";
import { Button, Modal, Spin } from "antd";
import TenderCandidatsTable from "../WorkersTable";

interface Props {
    tender: IFullTender;
    me: IUser;
    currentTab: string;
}
const TenderDetailInfo = ({ me, tender, currentTab }: Props) => {
    // const acceptedProposal = tender.proposals.filter(p => p.status === ProposalStatus.ACCEPTED)[0];
    const showFullDetails =
        me.is_company ||
        (tender.proposals.filter(
            (p) => p.status === ProposalStatus.ACCEPTED && p.author.id === me.id
        )[0] &&
            true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.Left}>
                <TenderDetailInfoConditions tender={tender} />

                <TenderDetailInfoDates tender={tender} />

                <div className={styles.Type}>
                    <h3>Raison du recrutement</h3>
                    <p>Recrutement temporaire d'usage</p>
                    <h3>Gestion de Paie</h3>
                    <button className={styles.VisualiserBtn}>Visualiser</button>
                </div>

                <p className={styles.Posted}>Postée il y a 5 jours</p>
            </div>

            <div className={styles.Right}>
                {tender.tendertype === TenderType.DELEGATION ? (
                    <div>
                        {/* <TenderDetailAgencyInfo me={me} tender={tender} /> */}
                        <TenderDetailContacts
                            tender={tender}
                            showFullDetails={showFullDetails}
                        />
                        <TenderDetailRequires tender={tender} />
                    </div>
                ) : (
                    <div>
                        <TenderDetailContacts
                            tender={tender}
                            showFullDetails={showFullDetails}
                        />
                        <TenderDetailCandidatsList
                            tender={tender}
                            currentTab={currentTab}
                            showFullDetails={showFullDetails}
                        />

                        {/* <Button className={styles.addWorkers} onClick={showModal}>Add Workers</Button>
                        <Modal className={styles.workersModal} width={900} title="Workers" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <TenderCandidatsTable tender={tender} />
                        </Modal> */}
                    </div>
                )}
            </div>
        </div>
    );
};
export default TenderDetailInfo;
