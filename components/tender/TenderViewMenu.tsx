import styles from "./TenderViewMenu.module.scss";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export default function ViewMenu() {
    const router = useRouter();
    

    const buildUrl = (newListType:any) => {
        const q:any = { ...router.query, listtype: newListType };
        return (
            router.route +
            "?" +
            Object.keys(q)
                .map((k) => k + "=" + q[k])
                .join("&")
        );
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchResults}>
                <h2>Annonces</h2>
                <p>
                    <span>5</span> résultats
                </p>
            </div>

            <div className={styles.viewMenu}>
                <button type="button" className={router.query.listtype === 'grid' ? styles.Active : ''}>
                    <Link href={buildUrl("grid")}>
                        <a className={styles.iconGrid}>Grille</a>
                    </Link>
                </button>
                <button type="button" className={router.query.listtype === 'list' ? styles.Active : ''}>
                    <Link href={buildUrl("list")}>
                        <a className={styles.iconList}>Liste</a>
                    </Link>
                </button>
                <button type="button" className={router.query.listtype === 'map' ? styles.Active : ''}>
                    <Link href={buildUrl("map")}>
                        <a className={styles.iconMap}>Carte</a>
                    </Link>
                </button>
            </div>
        </div>
    );
}
