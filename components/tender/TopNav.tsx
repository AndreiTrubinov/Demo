import styles from "./TopNav.module.scss";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import logoImg from "../../public/izi-orange.png";
import { Avatar, Dropdown, Button, Menu } from "antd";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { meStore } from "../../utils/stores/meStore";
import { IUser } from "../../utils/account";
import React from "react";
import { hashStringToColor } from "../../utils/misc";


export default function TopNav() {
    const { t } = useTranslation("common");
    const [me, setMe] = useRecoilState<IUser | null>(meStore);

    if (me === null) {
        return (<div>no user</div>);
    }
    
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.navContainer}>
                <nav className={styles.navLinks}>
                    <div className={styles.logoImg}>
                        <Link href="/">
                            <a>
                                <Image src={logoImg} alt="logo" />
                            </a>
                        </Link>
                    </div>
                    <Link href={"/tender"}>
                        <a>Dashboard</a>
                    </Link>
                    <Link href={"#"}>
                        <a>Candidats</a>
                    </Link>
                    <Link href="#">
                        <a>Transactions</a>
                    </Link>
                </nav>
                <div className={styles.navMenu}>
                    {me.is_agency ? (
                        <div className={styles.agencyCredits}>
                            <p>{t('creditsleft', 'Solde restant')}</p>
                            <div className={styles.credit}>0</div>
                        </div>
                    ) :
                        <div className={styles.navMenu}>
                            <Link href="#">
                                <a className={styles.navButton}>Mise en concurrence</a>
                            </Link>
                            <Dropdown  overlay={(
                                <Menu className={styles.dropdownMenu} >
                                    <Menu.Item style={{fontSize: '13px'}}>
                                        <Link href="/#">
                                            <a>
                                                {t('typedelegation', 'Délégation')}
                                            </a>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item style={{fontSize: '13px'}}>
                                        <Link href="/#">
                                            <a>
                                                {t('typemanagement', 'Gestion')}
                                            </a>
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            )} placement="bottomCenter">
                                <div>
                                    <Button className={styles.navButtonBlue}>
                                        Créer une demande<span className={styles.downarrow}></span>
                                    </Button>
                                    {/* <button type="button" className={styles.navDropdown}></button> */}
                                </div>
                            </Dropdown>
                        </div>
                    }
                    <div className={styles.iconBell}></div>
                    <Dropdown overlay={(<Menu>
                        <Menu.Item key="logout">
                            <Link href="#"><a>{t('logout', 'Se déconnecter')}</a></Link>
                        </Menu.Item>
                    </Menu>)}>
                        <Avatar size="large" className="userAvatar" style={{backgroundColor: hashStringToColor(me.firstname)}} alt="avatar" >{me.firstname.slice(0, 2)}</Avatar>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
