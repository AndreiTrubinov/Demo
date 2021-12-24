import styles from "./Logo.module.scss";
import Image from "next/image";
import logoPic from "../../public/izi-orange.png";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="#">
            <div className={styles.logo}>
                <Image src={logoPic} alt="logo" />
                <span>Demo</span>
            </div>
        </Link>
    );
}