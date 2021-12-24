import styles from './Partners.module.scss'
import discord from '../../public/partners/discord.jpg'
import vercel from '../../public/partners/vercel.jpg'
import Image from 'next/dist/client/image'
import { useTranslation, Trans } from "next-i18next";

export default function Partners(){

    const { t } = useTranslation("common");

    return(
        <div className={styles.Wrapper}>
            <p className={styles.text}>
                <Trans i18nKey="homepartners"><span className={styles.textNumbers}>+ de 100 </span> entreprises nous font confiance</Trans>
            </p>
            <div className={styles.companiesList}>
                <Image className={styles.companiesListItem}
                    src={discord}
                    alt='discord'
                />
                <Image className={styles.companiesListItem}
                    src={vercel}
                    alt='vercel'
                />
            </div>
        </div>
    )
}