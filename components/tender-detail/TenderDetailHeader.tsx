import styles from './TenderDetailHeader.module.scss'
import { Tag } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { gTranslatedTenderStatus, IFullTender, TenderType } from '../../utils/tender'
import { IUser } from '../../utils/account'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import ro from 'date-fns/esm/locale/ro/index.js'
import { basepathfor, omit } from '../../utils/misc'

interface Props {
    me: IUser;
    tender: IFullTender;
    currentTab: any;
}
export default function TenderDetailHeader({ me, tender, currentTab }: Props) {
    const router = useRouter();
    const { t } = useTranslation("common");

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <button className={styles.arrowLeft} onClick={() => router.push({
                    pathname: "/tender",
                    query: omit(router.query, ['id', 'proposalid', 'activeKey'])
                })}></button>
                <div className={styles.Name}>
                    <h3>{tender.jobtitle}</h3>
                    <Tag className={styles.NameTag} icon={<CheckCircleFilled style={{ fontSize: 14 }} />} color="success">
                        {gTranslatedTenderStatus(tender, t)} le {new Date(tender.modified).toLocaleDateString(router.locale)}
                    </Tag>
                </div>
            </div>

            <div className={styles.buttons}>

                {me.is_agency === true
                    ? (["1", "2"].indexOf(currentTab) !== -1 && (
                        <div className={styles.agencyButtons}>
                            <button className={styles.buttonReponse}>Répondre</button>
                            <button className={styles.buttonDecline}>Ne m’intéresse pas</button>
                        </div>
                    )) ||
                    (currentTab === "3" && tender.tendertype === TenderType.DELEGATION ? (

                        <div className={styles.agencyButtons}>
                            <button onClick={() => router.push({
                                pathname: router.pathname,
                                query: { ...router.query, activeKey: '7' }
                            }, undefined, { locale: router.locale })} className={styles.buttonMessage}>Messagerie</button>
                            <button className={styles.buttonCancel}>Annuler la commande</button>
                        </div>

                    ) : currentTab === "3" && tender.tendertype === TenderType.MANAGED ? (

                        <div className={styles.agencyButtons}>
                            <button onClick={() => router.push({
                                pathname: router.pathname,
                                query: { ...router.query, activeKey: '7' }
                            }, undefined, { locale: router.locale })} className={styles.buttonMessage}>Messagerie</button>
                        </div>)

                        : (''))
                    : tender.tendertype === TenderType.MANAGED ?
                        currentTab === "1" && <button className={styles.buttonDel}>Supprimer</button> ||
                        currentTab === "3" && <button className={styles.buttonCancel}>Annuler la réponse</button>
                        : currentTab === "2" &&
                        <div className={styles.agencyButtons}>
                            <button className={styles.buttonReponse}>Accepter</button>
                            <button className={styles.buttonDecline}>Refuser</button>
                        </div>
                        //    || currentTab === "3" && <button className={styles.buttonCancel}>Annuler la réponse</button>
                        || currentTab === "3" && <div className={styles.agencyButtons}>
                            <button onClick={() => router.push({
                                pathname: router.pathname,
                                query: { ...router.query, activeKey: '7' }
                            }, undefined, { locale: router.locale })} className={styles.buttonMessage}>Messagerie</button>
                        </div>}

                <button className={styles.buttonDots}></button>
            </div>
        </div>
    )
}