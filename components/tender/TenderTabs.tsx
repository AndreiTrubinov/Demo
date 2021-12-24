import styles from "./TenderTabs.module.scss";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const TenderTabs = ({ onChange, currentTab } : any) => {

    return (
        <div className={styles.wrapper}>
            <Tabs
                activeKey={currentTab} 
                onChange={onChange}
                tabBarGutter={0}
                className={styles.Tabs}
            >
                <TabPane className={styles.tab} tab="Toutes les annonces" key="1"></TabPane>
                <TabPane className={styles.tab} tab="Appel d'offre" key="2"></TabPane>
                <TabPane className={styles.tab} tab="Réponse" key="3"></TabPane>
                <TabPane className={styles.tab} tab="Commande" key="4"></TabPane>
                <TabPane className={styles.tab} tab="Documents" key="5"></TabPane>
                <TabPane className={styles.tab} tab="Relevé d’heures" key="6"></TabPane>
                <TabPane className={styles.tab} tab="Finalisé" key="7"></TabPane>
            </Tabs>
        </div>
    );
};

export default TenderTabs;
