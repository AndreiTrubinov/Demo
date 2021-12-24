import styles from "./ClientTenderDetailProposalsList.module.scss";
import { Button, Dropdown, Menu } from "antd";
import Swap from "../icons/Swap";
import React from "react";
import ClientTenderDetailProposalsListItem from "./ClientTenderDetailProposalsListItem";
import { IFullTender } from "../../utils/tender";

interface Props {
    tender: IFullTender;
}
export default function ClientTenderDetailProposalsList (  { tender }: Props ) {

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
            
            <div className={styles.list}>

            {tender.proposals.map((proposal) =>(
               <ClientTenderDetailProposalsListItem key={proposal.id} proposal={proposal} tender={tender} /> 
            ))}
            </div>
        </div>
    );
};
const menu = (
    <Menu className={styles.Menu}>
        <Menu.Item className={styles.MenuItem}>Tarif</Menu.Item>
        <Menu.Item className={styles.MenuItem}>Date de réponse</Menu.Item>
        <Menu.Item className={styles.MenuItem}>Ordre alphabétique</Menu.Item>
        <Menu.Item className={styles.MenuItem}>Notation agence</Menu.Item>
    </Menu>
);


