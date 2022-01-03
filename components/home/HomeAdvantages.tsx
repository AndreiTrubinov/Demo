import { Divider } from 'antd'
import styles from './HomeAdvantages.module.scss'
import CheckCircle from '../icons/CheckCircle'
import { useTranslation, Trans } from "next-i18next";
import Image from 'next/dist/client/image'
import image from '../../public/agency2.jpg'

export default function HomeAdvantages() {

    const { t } = useTranslation("common");

    return (
        <div className={styles.advantages}>
            <div className={styles.advantagesText}>

                <Trans i18nKey="homeadvantagesmaintxt">
                    <h1>
                        Augmentez votre chiffre d'affaires
                    </h1>
                    <p>
                        Agence, cabinet de placement ou recrutement
                        iziPropal: simple, rapide & efficace.
                    </p>
                    <p>
                        Accédez à un volume d’affaires constants, sans<br /> prospection.
                    </p>
                </Trans>
                <Divider className={styles.divider} />
                <h2>
                    {t("homeadvantagestitlechecks", "Accédez à de nouveaux marchés et clients")}
                </h2>
                <div className={styles.checkLine}>
                    <CheckCircle />
                    <span className={styles.checkTxt}>{t("homeadvantagescheck1", "Vous augmentez votre visibilité")}</span>
                </div>
                <div className={styles.checkLine}>
                    <CheckCircle />
                    <span className={styles.checkTxt}>{t("homeadvantagescheck2", "Vous échangez avec de nouveaux clients")}</span>
                </div>
                <div className={styles.checkLine}>
                    <CheckCircle />
                    <span className={styles.checkTxt}>{t("homeadvantagescheck3", "Vous optimisez le rendement de votre structure")}
                    </span>
                </div>
                <div className={styles.checkLine}>
                    <CheckCircle />
                    <span className={styles.checkTxt}>{t("homeadvantagescheck4", "Vous boostez facilement votre chiffre d'affaires")}
                    </span>
                </div>
            </div>
            <div className={styles.img}>
                <Image
                    alt="image"
                    src={image}
                // width={380}
                // height={343}
                />
            </div>
        </div>
    )
}