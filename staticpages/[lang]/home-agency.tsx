import styles from "../../styles/home-agency.module.scss";
import HomeNav from "../../components/home/HomeNav";
import HomeAdvantages from "../../components/home/HomeAdvantages";
import Partners from "../../components/home/Partners";
import HomeFooter from "../../components/home/HomeFooter";
import { Steps } from "antd";
import React from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import agency1 from '../../public/agency1.jpg'
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomeForm from "../../components/home/HomeForm";

export async function getStaticProps( { params: {lang} }: any) {
    return {
      props: {
        ...(await serverSideTranslations(lang || 'fr-FR', ["common"])),
      }, // will be passed to the page component as props
    }
  }
  

export const getStaticPaths = () => {
    return {
      paths: [
        // if no `locale` is provided only the defaultLocale will be generated
        { params: { lang: 'en' }},
        { params: { lang: 'fr-FR' }},
      ],
      fallback: false,
    }
  }

const Home = () => {

    const { t } = useTranslation("common");
    const { Step } = Steps;

    return (
        <div>
            <div className={styles.container}>
                <HomeNav type="agency" />
                <HomeAdvantages />
                <Partners />
                <section className={styles.stepsWrapper}>
                    <h3 className={styles.stepsTitle}>{t("homeagencysteptitle", "Comment ça marche ?")}</h3>
                    <Steps className="Steps" direction="vertical" current={0}>
                        <Step
                            title={t("homeagencysteptitle1", "Découvrez de nouvelles demandes en Délégation et Gestion chaque jour")}
                            description={t("homeagencystep1", "iziPropal sélectionne pour vous les demandes qui correspondent à vos secteurs d’activités pour des commandes plus efficaces et plus rapides. Nos clients ont des postes à pourvoir sur des contrats temporaires, à durée indéterminée, pour indépendants… en BTP, Médical, Hôtellerie-Restauration, Tertiaire, Aéronotique,…")}
                        />
                        <Step
                            title={t("homeagencysteptitle2", "Choississez les demandes sur lesquelles vous souhaitez répondre")}
                            description={t("homeagencystep2", "Les demandes sont décrites très précisément afin que vous puissiez répondre avec la meilleure offre.")}
                        />
                        <Step
                            title={t("homeagencysteptitle3", "Optez ou non pour le prépaiement")}
                            description={t("homeagencystep3", "Vous pouvez proposer une offre plus attractive au client grâce au prépaiement vous évitant ainsi les avances de trésorerie ou l’affacturage pour payer les salaires. Plus de relances de factures impayées, une gestion simplifiée.")}
                        />
                        <Step
                            title={t("homeagencysteptitle4", "Recevez la commande du client")}
                            description={t("homeagencystep4", "Votre offre a été retenue. Vous recevez un accusé de réception. Echangez et tchatez avec le client.")}
                        />
                        <Step
                            title={t("homeagencysteptitle5", "Échangez et signez en ligne les documents contractuels vous liant")}
                            description={t("homeagencystep5", "Vous pouvez utiliser le module de signature électronique digitalisée.")}
                        />
                    </Steps>
                </section>
            </div>
            <section className={styles.contacts}>
                <div className={styles.container}>
                    <div className={styles.contactsText}>
                    <Trans i18nKey="homeagencycontacts"><p className={styles.contactsHeader}>Contactez-nous</p>
                        <h3>Programmer une démo</h3>
                        <p className={styles.contactsTextBody}>Choisissez directement un créneau dans notre agenda ou laissez-nous vos coordonnées puis demandez-nous de vous rappeler.</p>
                    </Trans>
                        <Link href="#">
                            <p className={styles.meetingBtn}>{t("homeagencymeetingbutton", "Prendre un rendez-vous en ligne")}</p>
                        </Link>
                    </div>
                    {/*<div className={styles.contactsImg}>
                     <Image 
                            src={agency1}
                            alt="image"
                        />
                    </div> */}
                     <div className={styles.contactsForm}>
                        <HomeForm />
                    </div> 
                </div>
            </section>
            <div className={styles.container}>
                <HomeFooter />
            </div>
        </div>
    );
};

export default Home;
