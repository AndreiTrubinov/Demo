import React from "react";
import styles from "./TenderDetailRequires.module.scss";
import { Tag } from "antd";
import { IRequiredLanguage } from "../../utils/tender";

interface Props {
    lang: IRequiredLanguage;
}

export default function TenderDetailRequiresLanguage({ lang }:Props) {
    return(
        
            
            <div className={styles.requiresTags}>
                <Tag>{lang.language}</Tag><Tag>Parlé - {lang.spoken}</Tag><Tag>Écrit - {lang.written}</Tag>
            </div>
        
    )
}