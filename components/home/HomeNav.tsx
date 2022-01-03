import styles from "./HomeNav.module.scss"
import Logo from "../icons/Logo"
import HomeNav_Lang from "./HomeNav_Lang"
import { useTranslation } from "next-i18next";
import { Divider, Button, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function HomeNav({ type }: { type?: string }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <div className={styles.Nav}>
            <Logo />
            <div className={styles.menu}>
                <div>

                    {type === "agency" ?
                        <Link href="/">
                            <a className={styles.link1}>{t('homeyouareentreprise', 'Vous êtes une entreprise ?')}</a>
                        </Link>
                        :
                        <Link href="/home-agency">
                            <a className={styles.link1}>{t('homeyouareagency', 'Vous êtes une Agence ?')}</a>
                        </Link>
                    }

                    <Divider className={styles.divider} />
                </div>
                <Divider className={styles.dividerVertical} type={"vertical"} />
                <Link href="/tender">
                    <a className={styles.link2}>{t('login', 'Se connecter')} </a>
                </Link>

                {type === "agency" ?
                    <Button className={styles.button} type="primary" onClick={() => router.push("/tender")}>
                        <span>{t('registerasagencybutton', "S'inscrire")}</span>
                    </Button>
                    :
                    <Button className={styles.button} type="primary" onClick={() => router.push("/tender")}>
                        <span>{t('registerasentreprisebutton', "S'inscrire")}</span>
                    </Button>
                }


                <HomeNav_Lang />
            </div>

            <div className={styles.menuSmall}>
                <>
                    <Button className={styles.menuBtn} type="primary" onClick={showDrawer}>
                       <span className={styles.burger}></span>
                    </Button>
                    <Drawer className="homeMenu" title="Menu" placement="right" onClose={onClose} visible={visible}>
                        {type === "agency" ?
                            <Link href="/">
                                <a className={styles.link1}>{t('homeyouareentreprise', 'Vous êtes une entreprise ?')}</a>
                            </Link>
                            :
                            <Link href="/home-agency">
                                <a className={styles.link1}>{t('homeyouareagency', 'Vous êtes une Agence ?')}</a>
                            </Link>
                        }
                        <Link href="/tender">
                            <a className={styles.link2}>{t('login', 'Se connecter')} </a>
                        </Link>
                        {type === "agency" ?
                            <Button className={styles.button} type="primary" onClick={() => router.push("/tender")}>
                                <span>{t('registerasagencybutton', "S'inscrire")}</span>
                            </Button>
                            :
                            <Button className={styles.button} type="primary" onClick={() => router.push("/tender")}>
                                <span>{t('registerasentreprisebutton', "S'inscrire")}</span>
                            </Button>
                        }
                    </Drawer>
                </>
                <HomeNav_Lang />
            </div>



        </div>
    )
}