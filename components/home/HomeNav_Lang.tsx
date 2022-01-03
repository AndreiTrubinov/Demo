import styles from "./HomeNav_Lang.module.scss";
import { Menu, Dropdown, Divider, Button } from "antd";
import Link from "next/link";
import React from "react";
import DownArrow from "../icons/DownArrow";
import { useRouter } from "next/router";
import { extractCountryISOFromLocaleISO, getPrettyLocale } from "../../utils/lang";

export default function HomeNav_Lang() {
    const router = useRouter();
    const sites = { countries : [
        {
            isocode: 'fr',
            url: '#',
            name: 'France',
        },
        {
            isocode: 'ch',
            url: '#',
            name: 'Suisse',
        },
        {
            isocode: 'es',
            url: '#',
            name: 'España',
        },
    ]};
    const menuLang = (
        <Menu className="HomeLangMenu">
            <Menu className={styles.countrie}>
                <h4>Pays</h4>
                {sites.countries.map(o => 
                <Menu.Item key={o.isocode}>
                    <Link href={o.url}><a><span className={"flag-icon flag-icon-squared flag-icon-" + o.isocode} /> {o.name}</a></Link>
                </Menu.Item>
                )}
            </Menu>
            <Menu className="language">
                <h4>Langue</h4> 
                 {router.locales?.map((l) => (
                    <Menu.Item key={l}>
                        <Link href={router.asPath} key={l} locale={l}>
                            <a>
                                <span className={"flag-icon flag-icon-squared flag-icon-" + extractCountryISOFromLocaleISO(l)} />
                                &nbsp;{getPrettyLocale(l)}
                            </a>
                        </Link>
                    </Menu.Item>
                ))} 
            </Menu>
        </Menu>
    );
    return (
        <Dropdown className={styles.dropdownLink} overlay={menuLang} trigger={["click"]}>
                <a className={styles.dropdownLinkInner} onClick={(e) => e.preventDefault()}>
                <span className={"flag-icon flag-icon-squared flag-icon-fr"}></span>
                    <span className={styles.dropdownLinkTxt}>France - {getPrettyLocale(router.locale)}</span>
                    <DownArrow />
                </a>
            </Dropdown>
    );
}
