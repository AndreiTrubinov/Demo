import styles from "./TenderDetailProposal.module.scss";
import React, { Fragment, useState } from "react";
import TenderDetailCandidatsList from "./TenderDetailCandidatsList";
import TenderDetailAgencyInfo from "./TenderDetailAgencyInfo";
import TenderDetailContacts from "./TenderDetailContacts";
import { IFullTender, IProposal, ProposalStatus, TenderType } from "../../utils/tender";
import { IUser } from "../../utils/account";
import { baseMediaUrl } from "../../utils/api/base";


interface Props {
    me: IUser;
    tender: IFullTender;
    currentTab: string;
    proposal: IProposal;
}

export default function TenderDetailProposal({ me, tender, currentTab, proposal }: Props) {

    const showFullDetails = (me.is_agency && me.id === proposal.author.id) || proposal.status === ProposalStatus.ACCEPTED;
  
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.Left}>
                    <div className={styles.salary}>
                        <div className={styles.salaryLeft}>
                            <p>
                                Taux horaire brut<span>1900 €</span>
                            </p>
                            <p>
                                Nombre d'heures<span>167</span>
                            </p>
                            <p>
                                Nombre de jours<span>23</span>
                            </p>
                            <p>
                                Coefficient<span>0</span>
                            </p>
                            <p>
                                Coefficient de travail majoré<span>0</span>
                            </p>
                            <p>
                                Autre(s) dépense(s)<span>0</span>
                            </p>
                            <p>
                                Total estimé<span>2017,00 €</span>
                            </p>
                        </div>
                        <div className={styles.salaryRight}>
                            <p>0 €</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0 €</p>
                        </div>
                    </div>

                    <h3>{me.is_agency === true ? "Ajouter des fichiers" : "Fichiers"}</h3>

                    <div className={styles.files}>
                        
                            <div className={styles.filesItem}>Worker's CV</div>
                        
                    </div>

                    <h3>Message de l'agence</h3>

                    {showFullDetails ? proposal.message.split('\n').map((item, key) => (<Fragment key={key}>{item}<br /></Fragment>))

                        : (
                            <textarea className={styles.textInput} />
                        )}
                </div>

                <div className={styles.Right}>
                    {tender.tendertype === TenderType.DELEGATION ? (
                        <div>
                            <TenderDetailAgencyInfo me={me} tender={tender} />
                            <TenderDetailCandidatsList tender={tender} currentTab={currentTab} showFullDetails={showFullDetails} />
                        </div>
                    ) : (
                        <div>
                            <TenderDetailContacts tender={tender} showFullDetails={showFullDetails} />
                            <TenderDetailCandidatsList tender={tender} currentTab={currentTab} showFullDetails={showFullDetails} />
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
}
