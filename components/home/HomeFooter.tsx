import styles from "./HomeFooter.module.scss";
import Logo from "../icons/Logo";
import Link from "next/dist/client/link";
import { useTranslation, Trans } from "next-i18next";


export default function HomeFooter() {
    const { t } = useTranslation("common");
    return (
        <section className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.links}>
                    <div className={styles.linksItem}>
                        <h4>{t("homefootertitle1", "Navigation")}</h4>
                        <Link href="#">{t("homefooterlink1", "Accueil")}</Link>
                        <Link href="#">{t("homefooterlink2", "À propos")}</Link>
                        <Link href="#">{t("homefooterlink3", "Tarifs")}</Link>
                        <Link href="#">{t("homefooterlink4", "Contact")}</Link>
                    </div>
                    <div className={styles.linksItem}>
                        <h4>{t("homefootertitle2", "Liens utiles")}</h4>
                        <Link href="#">{t("homefooterlink5", "Mentions légales")}</Link>
                        <Link href="#">{t("homefooterlink6", "CGU")}</Link>
                        <Link href="#">{t("homefooterlink7", "CGV")}</Link>
                        <Link href="#">{t("homefooterlink8", "Lien 4")}</Link>
                    </div>
                </div>
            </div>
            <h4 className={styles.footerBottom}>
            {t("homefooter", "iziPropal - 2021. Tout droits réservés")}
            </h4>
        </section>
    );
}
