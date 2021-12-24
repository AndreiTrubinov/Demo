import React from "react";
import styles from "./TenderDetailFiles.module.scss";
import { message, Upload } from "antd";
import { IUser } from "../../utils/account";
import { IProposal } from "../../utils/tender";
import { baseMediaUrl } from "../../utils/api/base";

const { Dragger } = Upload;

const draggerProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info : any) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e : any) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

interface Props {
    me: IUser;
    proposal: IProposal;
}

export default function TenderDetailFiles({me, proposal} : Props){
    return(
        <div>
                    {me.is_agency === true ? (
                        <div className={styles.uploadBox}>
                            <Dragger className={styles.Upload} {...draggerProps}>
                                <p className={styles.uploadicon}></p>
                                <p className="ant-upload-hint">Glissez vos documents ici ou parcourir</p>
                            </Dragger>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.files}>
                            {proposal.documents.map((document) => (
                                <div key={document.id} className={styles.filesItem}>{document.category}&nbsp;&nbsp;<a href={baseMediaUrl + document.file} rel="noreferrer" target="_blank">{document.file.split('/').pop()}</a></div>
                            ))}
                            </div>
                        </div>
                    )}
        </div>
    )
}