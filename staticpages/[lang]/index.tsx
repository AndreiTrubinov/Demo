import HomeFooter from "../../components/home/HomeFooter";
import HomeNav from "../../components/home/HomeNav";
import Partners from "../../components/home/Partners";
import { Button, Carousel, Popover } from "antd";
import styles from "../../styles/index.module.scss";
import React from "react";
import Image from "next/dist/client/image";
import index1 from '../../public/index1.jpg'
import index2 from '../../public/index2.jpg'
import index3 from '../../public/index3.jpg'
import CheckCircle from "../../components/icons/CheckCircle";
import companyLogo from "../../public/partners/vercel.jpg";
import { useTranslation, Trans } from "next-i18next";


import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

const HomeClient = () => {
    const { t } = useTranslation("common");
    const delegation = (
        <div>
            <p>{t("typedelegation", "Délégation")}</p>
        </div> 
    );
    const gestion = (
        <div>
            <p>{t("typemanagement", "Gestion")}</p>
        </div>
    );

    return (
        <>
            <div className={styles.container}>
                <HomeNav type="entreprise" />
                <section className={styles.advantagesWrapper}>
                    <div className={styles.advantages}>
                        <Trans i18nKey="homeentreprisefirstblock">
                            <h2>
                                Les meilleures offres d’intérim négociées
                                 pour vous !
                            </h2>
                            <p>
                                L’intérim au juste prix. Optimisez le coût et la
                                
                                qualité de l’intérim <span>gratuitement</span>.
                            </p>
                        </Trans>
                        <Button className={styles.orangeBtn}>
                            {t("buttonnewdelegation", "Demande de délégation")}
                        </Button>
                        <Button>
                            {t("buttonnewmanaged", "Demande de gestion")}
                        </Button>
                        <Button>
                            {t("buttonnewconcurrent", "Mise en concurrence")}
                        </Button>
                    </div>
                    <div className={styles.advantagesImg}>
                    <Image 
                        src={index1}
                        alt="image"
                        width={380}
                        height={343}
                    /></div>
                </section>
                <section className={styles.features}>
                <Trans i18nKey="homeentreprisefeatures">
                    <div className={styles.featuresItem}>
                        <span className={styles.iconSector}></span>
                        <h3>Tous les secteurs</h3>
                        <p>
                            Industrie, logistique, commerce, services, BTP,
                            secteur public…
                        </p>
                    </div>
                    <div className={styles.featuresItem}>
                        <span className={styles.iconPeople}></span>
                        <h3>Toutes les tailles</h3>
                        <p>PME, ETI, Grandes entreprises, Grand compte…</p>
                    </div>
                    <div className={styles.featuresItem}>
                        <span className={styles.iconTarget}></span>
                        <h3>Tous les besoins</h3>
                        <p>
                            Temporaire, CDD, CDI de 1 à
                            10 000 intérimaires
                        </p>
                    </div>
                </Trans>
                </section>
                <section className={styles.types}>
                    <div className={styles.typesImage}>
                        <Image 
                            src={index2}
                            alt="image"
                        />
                    </div>
                    <div className={styles.typesText}>
                    
                        <h3>
                        <Trans i18nKey="homeentreprisetypes">
                            Exprimez et diffusez gratuitement votre besoin en{" "}
                            <span className={styles.typesInfo}>Délégation</span>
                            <sup>
                                <Popover content={delegation} trigger="click">
                                    <span className={styles.infoIcon}></span>
                                </Popover>
                            </sup>
                            ou en{" "}
                            <span className={styles.typesInfo}>Gestion</span>
                        </Trans>
                            <sup>
                                <Popover content={gestion} trigger="click">
                                    <span className={styles.infoIcon}></span>
                                </Popover>
                            </sup>
                        </h3>
                        <p><Trans i18nKey="homeentreprisetypestext">
                            Nous diffusons votre besoin en 1 clic aux agences.
                            Chaque agence est immédiatement alertée et peut
                            commencer ses recherches pour vous soumettre les
                            meilleurs profils au plus vite et au meilleur tarif
                            !</Trans>
                        </p>
                        <div className={styles.checkLine}>
                            <CheckCircle />
                            <span className={styles.checkTxt}>
                            {t("homeentreprisetypeschecks1", "Le poste recherché")}
                            </span>
                        </div>
                        <div className={styles.checkLine}>
                            <CheckCircle />
                            <span className={styles.checkTxt}>
                            {t("homeentreprisetypeschecks2", "Les dates de missions ou début de contrat")}
                            </span>
                        </div>
                        <div className={styles.checkLine}>
                            <CheckCircle />
                            <span className={styles.checkTxt}>
                            {t("homeentreprisetypeschecks3", "Votre motif de recrutement")}
                            </span>
                        </div>
                        <div className={styles.checkLine}>
                            <CheckCircle />
                            <span className={styles.checkTxt}>{t("homeentreprisetypeschecks4", "Le salaire")}</span>
                        </div>
                        <div className={styles.checkLine}>
                            <CheckCircle />
                            <span className={styles.checkTxt}>
                            {t("homeentreprisetypeschecks5", "Les horaires et le lieu de travail")}
                            </span>
                        </div>
                    </div>
                </section>
                <section className={styles.offer}>
                    <div className={styles.offerTxt}>
                        <Trans i18nKey="homeentrepriseoffer">
                        <h3>
                            Sélectionnez la meilleure offre :
                            <p>- le(s) meilleur(s) candidat(s)</p>
                            
                            <p>- au meilleur tarif</p>
                            <p>- en prépaiement ou sur facture</p>
                        </h3>
                        <p>
                            Après analyse de votre demande, les agences vous
                            proposent des candidats qualifiés et disponibles.
                        </p>
                        <p>
                            Elles mettent à votre disposition leurs CV et
                            documents indispensables. Vous n’avez plus qu’à
                            sélectionner le meilleur profil, au meilleur tarif !
                        </p></Trans>
                        <div
                            className={
                                styles.checkLine + " " + styles.checkLineOffer
                            }
                        >
                            <CheckCircle />
                            <span className={styles.checkTxt}>
                            {t("homeentrepriseoffercheck", "Inclus : un tchat pour échanger en direct avec les agences sollicitées")} 
                            </span>
                        </div>
                    </div>
                    <div className={styles.offerImage}>
                    <Image 
                            src={index3}
                            alt="image"
                        />
                    </div>
                </section>
                <Partners />
            </div>
            <section className={styles.comments}>
                <div className={styles.carouselContainer}>
                    <Carousel className="carousel" autoplay>
                        <div>
                            <div className={styles.carouselItem}>
                                <div className={styles.person}>
                                    <div className={styles.photo}></div>
                                    <h3>Martine Chalot</h3>
                                    <p>Directrice @vercel</p>
                                    <Image src={companyLogo} alt="company logo" />
                                </div>
                                <h2 className={styles.comment}>
                                {t("homeentreprisecomment", "« En tant que directrice d’agence, j’aime utiliser iziPropal pour avoir une vision précise et organisée des appels d’offres. »")} 
                                </h2>
                            </div>
                        </div>
                        <div>
                            <div className={styles.carouselItem}>
                                <div className={styles.person}>
                                    <div className={styles.photo}></div>
                                    <h3>Martine Chalot</h3>
                                    <p>Directrice @vercel</p>
                                    <Image src={companyLogo} alt="company logo" />
                                </div>
                                <h2 className={styles.comment}>
                                {t("homeentreprisecomment", "« En tant que directrice d’agence, j’aime utiliser iziPropal pour avoir une vision précise et organisée des appels d’offres. »")}
                                </h2>
                            </div>
                        </div>
                        <div>
                            <div className={styles.carouselItem}>
                                <div className={styles.person}>
                                    <div className={styles.photo}></div>
                                    <h3>Martine Chalot</h3>
                                    <p>Directrice @vercel</p>
                                    <Image
                                        src={companyLogo}
                                        alt="company logo"
                                    />
                                </div>
                                <h2 className={styles.comment}>
                                {t("homeentreprisecomment", "« En tant que directrice d’agence, j’aime utiliser iziPropal pour avoir une vision précise et organisée des appels d’offres. »")}
                                </h2>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </section>
            <div className={styles.container}>
                <HomeFooter />
            </div>
        </>
    );
};

export default HomeClient;
