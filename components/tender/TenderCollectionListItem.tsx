import styles from "./TenderCollectionListItem.module.scss";
import Link from "next/link";
import { Tag, Dropdown, Button, Menu, Avatar, Tooltip } from "antd";
import { StarFilled, UserOutlined, AntDesignOutlined, ClockCircleFilled } from "@ant-design/icons";
import Response from "../icons/Response";
import Timer from "../icons/Timer";
import React from "react";
import Commande from "../icons/Commande";
import TenderDropdownDots from "./TenderDropdownDots"
import { useRecoilState } from "recoil";
import { meStore } from "../../utils/stores/meStore";
import { useRouter } from "next/router";
import { IUser } from "../../utils/account";
import { getLabelForLocale, ILanguageBasedGeneric } from "../../utils/lang";
import { IBusinessSector } from "../../utils/api/businesssectors";
import { gTranslatedContractType, gTranslatedTenderStatus, IFullTender, TenderStatus, TenderType } from "../../utils/tender";
import { useTranslation } from "react-i18next";
import { hashStringToColor } from "../../utils/misc";
import { formatDistance } from 'date-fns';
import { getDateLocalForLocale } from '../../utils/lang'; // might need to adjust the path here
import Checked from "../icons/Checked";



interface TenderCollectionListItemProps {
    tender: IFullTender;
}

const menu = (
    <Menu className={styles.dropdownMenu}>
        <Menu.Item key="1">Dupliquer</Menu.Item>
        <Menu.Item key="2">Supprimer</Menu.Item>
        <Menu.Item key="3">Enregistrer comme modèle</Menu.Item>
    </Menu>
);

export const TenderCollectionListItem: React.FC<TenderCollectionListItemProps> = ({ tender }) => {
    const [me, setMe] = useRecoilState<IUser | null>(meStore);
    const router = useRouter();
    const { t } = useTranslation("common");

    if (typeof tender === "undefined") {
        return null;
    }
    if (!me) {
        return null;
    }


    const is_mytender = tender.author.id === me.id;
    const visibleProposals = (
        me.is_company
            ? is_mytender
                ? tender.proposals
                : []
            : me.is_agency
                ? tender.proposals.filter((p) => p.id === me.id)
                : []
    ).sort(
        (a, b) =>
            Math.min(
                ...[
                    a.prepaidoffer ? a.total1 : 0,
                    a.offer ? a.total0 : 0,
                ].filter((x) => x > 0)
            ) -
            Math.min(
                ...[
                    b.prepaidoffer ? b.total1 : 0,
                    b.offer ? b.total0 : 0,
                ].filter((x) => x > 0)
            )
    );

    const bestProposal = visibleProposals[0];

    const bestPrepayedProposal = visibleProposals.filter(p => p.prepaidoffer && p.total1 > 0).sort((a, b) => a.total1 - b.total1)[0]
    const bestNormalProposal = visibleProposals.filter(p => p.offer && p.total0 > 0).sort((a, b) => a.total0 - b.total0)[0]

    const tenderpath = 'tender-detail/?id=' + tender.id;

    return (
        <div className={styles.wrapper}>
            <Link href={tenderpath}>
                <div className={`${styles.box} ${'box'}`}>
                    <div className={styles.offerInfo}>
                        <div className={styles.offerState}>
                            {/* Maybe use a switch ? */}
                            {tender.status === TenderStatus.PUBLISHED && visibleProposals.length === 0 ? (
                                <Timer />
                            ) : tender.status === TenderStatus.PUBLISHED && visibleProposals.length > 0 ? (
                                <Response />
                            ) : tender.status === TenderStatus.ORDER ? (
                                <Commande />

                            ) : tender.status === TenderStatus.FINISHED ? (
                                <Checked />
                            ) : (
                                ""
                            )}
                        </div>

                        <div className={styles.offerText}>
                            <h3>{tender.jobtitle}</h3>
                            <div className={styles.Tags}>
                                {tender.business_sectors.length <= 1 ? (
                                    tender.business_sectors.map(
                                        (aBusinessSector: IBusinessSector) => <Tag key={aBusinessSector.id}>{getLabelForLocale(aBusinessSector, router.locale)}</Tag>
                                    )
                                ) : (
                                    <div>
                                        {/* <Tag >{getLabelForLocale(tender.business_sectors[0], router.locale)}</Tag> */}
                                        <Tag style={{ maxWidth: '180px' }}>{getLabelForLocale(tender.business_sectors[0], router.locale)}</Tag>
                                        <Tag>+{tender.business_sectors.length - 1}</Tag>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.offerTagBox}>
                        <Tag color={tender.tendertype === TenderType.DELEGATION ? "purple" : "orange"} className={styles.offerTag}>
                            {tender.tendertype === TenderType.MANAGED ? "Gestion" : "Délégation"}
                        </Tag>
                    </div>



                    <div className={styles.company}>
                        <Avatar.Group className="companyAvatarGroup" maxCount={1} maxStyle={{ color: '#fff', backgroundColor: "#117ae3" }}>
                            {visibleProposals.map(proposal =>
                                <Avatar key={proposal.id} className="companyAvatar"
                                    style={{ backgroundColor: hashStringToColor(proposal.author.establishment?.name) }}
                                    alt="logo" >
                                    {proposal.author.establishment?.name.slice(0, 2)}
                                </Avatar>)}
                        </Avatar.Group>
                        <div className={styles.companyInfo}>
                            <h3 className={styles.companyHeader}>{bestProposal?.author.establishment?.name}</h3>
                            <p className={styles.iconPin}>
                                {tender.workplace.locality}, {tender.workplace.country}
                            </p>
                        </div>
                    </div>

                    {!me.is_agency && visibleProposals.length > 0 === true ? (""
                    ) : ""}

                    <div className={styles.contract}>
                        <div className={styles.contractTime}>
                            <p className={styles.iconCase}>{gTranslatedContractType(tender, t)} {tender.end && formatDistance(new Date(tender.end), new Date(tender.start), { locale: getDateLocalForLocale(router.locale) })}</p>
                            <p className={styles.contractDate}>{new Date(tender.start).toLocaleDateString(router.locale)}</p>
                        </div>
                    </div>

                    <p className={styles.iconUser}>{tender.numberofworkers} {tender.numberofworkers > 1 ? t('places', 'places') : t('place', 'place')}</p>

                    <div className={!me.is_agency && visibleProposals.length > 0 === true ? styles.stage : styles.stageRow} >
                        <p className={styles.stageStatus}>
                            <ClockCircleFilled className={styles.stageIcon} style={{ fontSize: 13 }} />
                            {gTranslatedTenderStatus(tender, t)}
                        </p>
                        <div className={styles.stageDate}>
                            <p>le {new Date(tender.modified).toLocaleDateString(router.locale)}</p>
                        </div>
                        <span>{t('at_time', 'à')} {tender.modified.slice(11, 16).split('-').reverse().join('/')}</span>
                    </div>

                    {!me.is_agency && visibleProposals.length > 0 === true ? (
                        <div className={styles.prices}>
                            {bestPrepayedProposal ?
                                <p>
                                    {t('prepayed', 'Prépayé')}<span className={styles.prepay}>{bestPrepayedProposal.total1} {tender.salarycurrency || tender.budgetcurrency}</span>
                                </p>
                                : null}
                            {bestNormalProposal ?
                                <p>
                                    {t('oninvoice', 'Sur facture')}<span>{bestNormalProposal.total0} {tender.salarycurrency || tender.budgetcurrency}</span>
                                </p>
                                : null}
                        </div>
                    ) : (
                        <div className={styles.Id}>
                            <span>ID:{tender.id} REF: {tender.clientref}</span>
                        </div>
                    )}

                    <StarFilled className={tender.stared ? styles.StarActive : styles.Star} style={{ fontSize: 18 }} />

                    <div className={`${styles.dots}  ${'listItemDots'}`}>
                        <TenderDropdownDots />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TenderCollectionListItem;
