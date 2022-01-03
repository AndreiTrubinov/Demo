import styles from "./ClientTenderDetailProposalsList.module.scss";
import { Button, Dropdown, Menu } from "antd";
import Swap from "../icons/Swap";
import React, { useState } from "react";
import ClientTenderDetailProposalsListItem from "./ClientTenderDetailProposalsListItem";
import { IFullTender } from "../../utils/tender";



interface Props {
    tender: IFullTender;
}
export default function ClientTenderDetailProposalsList({ tender }: Props) {
    const [filter, setFilter] = useState('default')
    const menu = (
        <Menu className={styles.Menu}>
            <Menu.Item className={styles.MenuItem} onClick={() => setFilter('byTarif')}>Tarif</Menu.Item>
            <Menu.Item className={styles.MenuItem} onClick={() => setFilter('byDate')}>Date de réponse</Menu.Item>
            <Menu.Item className={styles.MenuItem} onClick={() => setFilter('byAlphabet')}>Ordre alphabétique</Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.filter}>
                <p>
                    Réponses
                    <span>
                        <span>{tender.proposals.length}</span>résultat(s)
                    </span>
                </p>
                <Dropdown className={styles.filterBtn} overlay={menu} placement="bottomLeft">
                    <Button>
                        <Swap />
                        Trier par
                    </Button>
                </Dropdown>
            </div>
            {filter === 'byTarif' ?
                <div className={styles.list}>
                    {tender.proposals.sort((a, b) => a.total0 - b.total0).map((proposal) => (
                        <ClientTenderDetailProposalsListItem key={proposal.id} proposal={proposal} tender={tender} />
                    ))}
                </div>
                :
                <div className={styles.list}>
                    {tender.proposals.sort().map((proposal) => (
                        <ClientTenderDetailProposalsListItem key={proposal.id} proposal={proposal} tender={tender} />
                    ))}
                </div>
            }
        </div>
    );
};





