import styles from "./TenderCollectionGridItem.module.scss";
import Link from "next/link";
import { StarFilled } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import { useRouter } from "next/dist/client/router";
import Response from "../icons/Response";
import React from "react";
import Commande from "../icons/Commande";
import DropdownDots from "./TenderDropdownDots";
import { meStore } from "../../utils/stores/meStore";
import { IUser } from "../../utils/account";
import { useRecoilState } from "recoil";
import { gTranslatedContractType, gTranslatedTenderStatus, IFullTender, IProposal, TenderStatus, TenderType } from "../../utils/tender";
import { IBusinessSector } from "../../utils/api/businesssectors";
import { getLabelForLocale } from "../../utils/lang";
import { useTranslation } from "next-i18next";
import Checked from "../icons/Checked";
import { hashStringToColor } from "../../utils/misc";
import Timer from "../icons/Timer";


interface TenderCollectionGridItemProps {
    tender?: IFullTender;
    is_gridvariant?: boolean;
}

export const TenderCollectionGridItem: React.FC<TenderCollectionGridItemProps> = ({ tender, is_gridvariant }) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const [me, setMe] = useRecoilState<IUser | null>(meStore);

    if (!tender) {
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



    const buildUrl = (selectedId: any) => {
        const { activeKey, proposalid, ...q }: any = { ...router.query, id: selectedId };
        return (
            // (me?.is_agency ? "/agency" : "") + 
            // (me?.is_company ? "/entreprise" : "") + 
            "/tender-detail?" +
            Object.keys(q)
                .map((k) => k + "=" + q[k])
                .join("&")
        );
    };


    return (
        <Link href={buildUrl(tender.id)} passHref={true}>
            <div
                className={
                    !is_gridvariant && router.query.id == tender.id.toString()
                        ? styles.boxSmall + " " + styles.active
                        : !is_gridvariant
                            ? styles.boxSmall
                            : router.query.id == tender.id.toString()
                                ? styles.box + " " + styles.active
                                : styles.box
                }
            >
                <div className={styles.boxTop}>
                    {!is_gridvariant ? (
                        <div className={styles.head}>
                            <Tag
                                color={
                                    tender.tendertype === TenderType.MANAGED
                                        ? "purple"
                                        : "orange"
                                }
                                className={styles.offerTag}
                                style={{ marginBottom: 0 }}
                            >
                                {tender.tendertype === TenderType.MANAGED
                                    ? "Gestion"
                                    : "Délégation"}
                            </Tag>
                            <StarFilled
                                className={
                                    tender.stared
                                        ? styles.StarActive
                                        : styles.Star
                                }
                                style={{ fontSize: 18 }}
                            />
                        </div>
                    ) : (
                        <div className={styles.head}>
                            {tender.status === TenderStatus.PUBLISHED && tender.proposals.length === 0 ? (
                                <div className={styles.offerState}>
                                    <Timer />
                                    {t(
                                        "waitingforanswer",
                                        "En attente de réponse"
                                    )}
                                </div>
                            ) : tender.status === TenderStatus.PUBLISHED && tender.proposals.length > 0 ? (
                                <div className={styles.offerState}>
                                    <Response />
                                    {t(
                                        "offerselection",
                                        "Selection de l'offre"
                                    )}
                                </div>
                            ) : tender.status === TenderStatus.ORDER ? (
                                <div className={styles.offerState}>
                                    <Commande />
                                    {t("Order", "Commande")}
                                </div>
                            ) : // ) : tender.status === TenderStatus ? (
                                //     <div className={styles.offerState}>
                                //         <Document />
                                //         Documents
                                //     </div>
                                // ) : tender.status === "Signé" ? (
                                //     <div className={styles.offerState}>
                                //         <Timer />
                                //         Relevé d'heures
                                //     </div>
                                tender.status === TenderStatus.FINISHED ? (
                                    <div className={styles.offerState}>
                                        <Checked />
                                        {t("finalized", "Finalisé")}
                                    </div>
                                ) : (
                                    ""
                                )}

                            <StarFilled
                                className={
                                    tender.stared
                                        ? styles.StarActive
                                        : styles.Star
                                }
                                style={{ fontSize: 18 }}
                            />
                        </div>
                    )}

                    <h3 className={styles.offerName}>{tender.jobtitle}</h3>

                    {!is_gridvariant ? (
                        ""
                    ) : (
                        <div>
                            <div className={styles.offerAdditional}>
                                {/* Aircall */}
                            </div>

                            <Tag
                                color={
                                    tender.tendertype === TenderType.MANAGED
                                        ? "purple"
                                        : "orange"
                                }
                                className={styles.offerTag}
                            >
                                {tender.tendertype === TenderType.MANAGED ? t('managed', "Gestion") : null}
                                {tender.tendertype === TenderType.DELEGATION ? t('delegation', "Délégation") : null}
                            </Tag>
                        </div>
                    )}

                    <div className={styles.Tags}>
                        {tender.business_sectors.length <= 2 ? (
                            tender.business_sectors.map(
                                (aBusinessSector: IBusinessSector) => (
                                    <Tag key={aBusinessSector.id}>
                                        {getLabelForLocale(
                                            aBusinessSector,
                                            router.locale
                                        )}
                                    </Tag>
                                )
                            )
                        ) : (
                            <div>
                                <Tag>
                                    {getLabelForLocale(
                                        tender.business_sectors[0],
                                        router.locale
                                    )}
                                </Tag>
                                <Tag>
                                    {getLabelForLocale(
                                        tender.business_sectors[1],
                                        router.locale
                                    )}
                                </Tag>
                                <Tag>+{tender.business_sectors.length - 2}</Tag>
                            </div>
                        )}
                    </div>

                    <p className={styles.iconPin}>
                        {tender.workplace.locality}, {tender.workplace.country}
                    </p>

                    <p className={styles.contractDate}>
                        {new Date(tender.start).toLocaleDateString(
                            router.locale
                        )}{" "}
                        {t("at_time", "à")}{" "}
                        {tender.start
                            .slice(11, 16)
                            .split("-")
                            .reverse()
                            .join("/")}
                        {tender.periods.length > 1 ? (
                            <span>+{tender.periods.length - 1} créneaux</span>
                        ) : (
                            ""
                        )}
                    </p>

                    <div className={styles.contract}>
                        <p className={styles.iconCase}>
                            {gTranslatedContractType(tender, t)}
                        </p>
                        <p className={styles.iconUser}>
                            {tender.numberofworkers}{" "}
                            {tender.numberofworkers > 1
                                ? t("places", "places")
                                : t("place", "place")}
                        </p>
                    </div>

                    <div className={styles.boxBottom}>
                        <div className={styles.boxBottomStatus}>
                            <p>
                                {gTranslatedTenderStatus(tender, t)} le{" "}
                                {new Date(tender.modified).toLocaleDateString(
                                    router.locale
                                )}
                            </p>
                            <p>Réf : {tender.clientref}</p>
                        </div>
                        <div className={styles.dots}>
                            <DropdownDots />
                        </div>
                    </div>
                </div>

                {is_gridvariant ? (
                    <div>
                        <div className={styles.company}>
                            <div className={styles.companyInfo}>
                                <Avatar.Group
                                    className="companyAvatarGroup"
                                    maxCount={1}
                                    maxStyle={{
                                        color: "#fff",
                                        backgroundColor: "#117ae3",
                                    }}
                                >
                                    {visibleProposals.map((proposal) => (
                                        <Avatar
                                            key={proposal.id}
                                            className="companyAvatar"
                                            style={{
                                                backgroundColor:
                                                    hashStringToColor(
                                                        proposal.author
                                                            .establishment?.name
                                                    ),
                                            }}
                                            alt="logo"
                                        >
                                            {proposal.author.establishment?.name.slice(0, 2)}
                                        </Avatar>
                                    ))}
                                </Avatar.Group>

                                <div className={styles.companyName}>
                                    <h3>
                                        {
                                            visibleProposals[0]?.author
                                                .establishment?.name
                                        }
                                    </h3>
                                </div>
                            </div>
                            <div>
                                {bestPrepayedProposal ? (
                                    <p>
                                        {t("prepayed", "Prépayé")}
                                        <span className={styles.green}>
                                            {bestPrepayedProposal.total1}{" "}
                                            {tender.salarycurrency ||
                                                tender.budgetcurrency}
                                        </span>
                                    </p>
                                ) : null}
                                {bestNormalProposal ? (
                                    <p style={{ width: "max-content" }}>
                                        {t("oninvoice", "Sur facture")}
                                        <span>
                                            {bestNormalProposal.total0}{" "}
                                            {tender.salarycurrency ||
                                                tender.budgetcurrency}
                                        </span>
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </Link>
    );
};
export default TenderCollectionGridItem;
