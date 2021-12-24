import React, { useState } from "react";
import styles from "./TenderDetailInfoDates.module.scss";
import { CheckCircleFilled } from "@ant-design/icons";
import { ContractType, IFullTender } from "../../utils/tender";
import { Button, Modal } from "antd";

interface Props {
    tender: IFullTender;
}

export default function TenderDetailInfoDates({ tender }: Props) {
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
        <div className={styles.Date}>
            <h3>{tender.contracttype === ContractType.CDI ? 'Date de début' : 'Date'}</h3>

            {tender.contracttype === ContractType.TEMPORARY ?
                <>
                    {/* {tender.periods.length > 2 ? periods = tender.periods.slice[0,1]} */}
                    {tender.periods.slice(0, 2).map((period) => (
                        <div key={period.id} className={styles.dates}>
                            <p>
                                <span className={styles.calendarIcon}>{period.start.slice(0, 10).split('-').reverse().join('/')}</span>
                                <span className={styles.arrowIcon}>{period.end.slice(0, 10).split('-').reverse().join('/')}</span>
                            </p>
                            <span className={styles.clockIcon}>{period.start.slice(11, 16)} - {period.end.slice(11, 16)}</span>
                            <span>Pause {period.pause} min</span>
                        </div>
                    ))}
                    {tender.periods.length > 2 ? <button onClick={showModal} className={styles.AdditionalDates}>+ Afficher {tender.periods.length - 2} créneaux supplémentaire(s)</button> : ('')}
                    <Modal className={styles.modal} title="Date" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    {tender.periods.map((period) => (
                        <div key={period.id} className={styles.dates}>
                            <p>
                                <span className={styles.calendarIcon}>{period.start.slice(0, 10).split('-').reverse().join('/')}</span>
                                <span className={styles.arrowIcon}>{period.end.slice(0, 10).split('-').reverse().join('/')}</span>
                            </p>
                            <span className={styles.clockIcon}>{period.start.slice(11, 16)} - {period.end.slice(11, 16)}</span>
                            <span>Pause {period.pause} min</span>
                        </div>
                    ))}
                    </Modal>
                </>

                :

                tender.contracttype === ContractType.CDD ?
                    <div className={styles.dates}>
                        <p>
                            <span className={styles.calendarIcon}>{tender.start.slice(0, 10).split('-').reverse().join('/')}</span>
                            <span className={styles.arrowIcon}>{tender.end?.slice(0, 10).split('-').reverse().join('/')}</span>
                        </p>
                        <span className={styles.clockIcon}>Durée : { } mois</span>
                    </div>

                    :

                    <div className={styles.dates}>
                        <p>
                            <span className={styles.calendarIcon}>{tender.start.slice(0, 10).split('-').reverse().join('/')}</span>
                        </p>
                    </div>
            }

            <h3 className={styles.cityHeader}>Lieu de travail</h3>
            <p className={styles.City}>
                {tender.workplace.locality}, {tender.workplace.country}
            </p>
            {tender.remote === true ?
                <p className={styles.checkRemote}>
                    <CheckCircleFilled style={{ fontSize: 14 }} />
                    Télétravail possible
                </p> : ('')}
        </div>
    )
}