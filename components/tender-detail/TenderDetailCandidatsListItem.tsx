import styles from "./TenderDetailCandidatsListItem.module.scss";
import React, { useState } from "react";
import DocumentModal from "../icons/DocumentModal";
import { Checkbox } from "antd";


import { IFullTender, IWorker, TenderType } from "../../utils/tender";


interface Props {
    worker: IWorker;
    tender: IFullTender;
    // currentTab: string;
    showFullDetails: boolean;
    editmode?: boolean;
}

export default function TenderDetailCandidatsListItem({ worker, tender, showFullDetails, editmode } : Props) {
    return (
        <div className={styles.candidat}>
            <div className={styles.candidatMain}>
                <div className={styles.candidatLeft}>
                    {/* {tender.tendertype === TenderType.DELEGATION && showFullDetails ? <Checkbox checked className={styles.checkbox}/> : ('')} */}
                    <div>
                        <h3>
                            {worker.firstname}{" "}
                            {showFullDetails
                                ? worker.lastname
                                : worker.lastname.charAt(0) + "."}
                        </h3>
                        <p className={styles.location}>
                            {showFullDetails
                                ? worker.address.formattedaddress
                                : worker.address.locality +
                                  ", " +
                                  worker.address.country}
                        </p>
                    </div>
                </div>

                <div className={styles.icons}>
                    {editmode ? (
                        <>
                            <button className={styles.pencil}></button>
                            <button className={styles.trash}></button>
                        </>
                    ) : null}
                    <DocumentModal worker={worker} />
                </div>
            </div>
            {showFullDetails ? (
                <div className={styles.candidatBottom}>
                    <p>{worker.email}</p>
                    <p>{worker.phonenumber}</p>
                </div>
            ) : null}
        </div>
    );
}
