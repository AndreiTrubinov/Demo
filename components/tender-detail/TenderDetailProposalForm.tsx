import styles from "./TenderDetailProposal.module.scss";
import React, { useState } from "react";
import { IFullTender, IProposal, ProposalStatus, TenderType } from "../../utils/tender";
import { IUser } from "../../utils/account";
import { Button, Checkbox, Form, Input, message, Modal, Upload } from "antd";
import { useTranslation } from "next-i18next";
import CustomScroll from "react-custom-scroll";
import TenderDetailCandidatsListItem from "./TenderDetailCandidatsListItem";
import { baseMediaUrl } from "../../utils/api/base";


interface Props {
    me: IUser;
    tender: IFullTender;
    currentTab: string;
    proposal?: IProposal;
}

export default function TenderDetailProposalForm({
    me,
    tender,
    currentTab,
    proposal,
}: Props) {

    const euro = "€";
    const { Dragger } = Upload;
    const draggerProps = {
        name: "file",
        multiple: true,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange(info: any) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: any) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const { t } = useTranslation("common");
    const agencyName = me.establishment.name.split(" ");
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Form
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className={styles.wrapper}>
                    <div className={styles.Left}>

                        <div>
                            <h3 className={styles.header}>Proposition</h3>

                            <div className={styles.salaryCheckbox}>
                                <Checkbox>Offre</Checkbox>
                                <Checkbox>Prépayé</Checkbox>
                            </div>

                            {me.is_agency && currentTab !== "3" ? (
                                <div
                                    className={
                                        styles.salary +
                                        " " +
                                        styles.salaryInputsBox
                                    }
                                >
                                    <div
                                        className={
                                            styles.salaryLeft +
                                            " " +
                                            styles.salaryInputs
                                        }
                                    >
                                        <p className="BudgetInput">
                                            Taux horaire brut
                                            <Form.Item name="Taux horaire brut">
                                                <Input
                                                    placeholder="0"
                                                    suffix={euro}
                                                />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            Nombre d'heures
                                            <Form.Item name="Nombre d'heures">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            Nombre de jours
                                            <Form.Item name="Nombre de jours">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            Coefficient
                                            <Form.Item name="Coefficient">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            Coefficient de travail majoré
                                            <Form.Item name="Coefficient de travail majoré">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            Autre(s) dépense(s)
                                            <Form.Item name="Autre(s) dépense(s)">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p>
                                            Total estimé
                                            <span>
                                                <b>2017,00</b>€
                                            </span>
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            styles.salaryRight +
                                            " " +
                                            styles.salaryInputs
                                        }
                                    >
                                        <p className="BudgetInput">
                                            <Form.Item name="prepaid Taux horaire brut">
                                                <Input
                                                    placeholder="0"
                                                    suffix={euro}
                                                />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            <Form.Item name="prepaid Nombre d'heures">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            <Form.Item name="prepaid Nombre de jours">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            <Form.Item name="prepaid Coefficient">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            <Form.Item name="prepaid Coefficient de travail majoré">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p className="BudgetInput">
                                            <Form.Item name="prepaid Autre(s) dépense(s)">
                                                <Input placeholder="0" />
                                            </Form.Item>
                                        </p>
                                        <p>
                                            <span>
                                                <b>0</b>€
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.salary}>
                                    <div className={styles.salaryLeft}>
                                        <p>
                                            Taux horaire brut<span>1900 €</span>
                                        </p>
                                        <p>
                                            Nombre d'heures<span>167</span>
                                        </p>
                                        <p>
                                            Nombre de jours<span>23</span>
                                        </p>
                                        <p>
                                            Coefficient<span>0</span>
                                        </p>
                                        <p>
                                            Coefficient de travail majoré
                                            <span>0</span>
                                        </p>
                                        <p>
                                            Autre(s) dépense(s)<span>0</span>
                                        </p>
                                        <p>
                                            Total estimé<span>2017,00 €</span>
                                        </p>
                                    </div>
                                    <div className={styles.salaryRight}>
                                        <p>0 €</p>
                                        <p>0</p>
                                        <p>0</p>
                                        <p>0</p>
                                        <p>0</p>
                                        <p>0</p>
                                        <p>0 €</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h3>
                            {me.is_agency === true
                                ? "Ajouter des fichiers"
                                : "Fichiers"}
                        </h3>

                        {/*<TenderDetailFiles me={me} proposal={proposal} />} */}

                        <Form.Item name="files" className="formUploadBox">
                            <div className={styles.uploadBox}>
                                <Dragger
                                    className={styles.Upload}
                                    {...draggerProps}
                                >
                                    <p className={styles.uploadicon}></p>
                                    <p className="ant-upload-hint">
                                        Glissez vos documents ici ou parcourir
                                    </p>
                                </Dragger>
                            </div>
                        </Form.Item>

                        <h3>Message de l'agence</h3>
                        <Form.Item name="message">
                            <Input.TextArea className={styles.textInput} />
                        </Form.Item>
                    </div>

                    <div className={styles.Right}>
                        <div
                            className={
                                styles.companyInfo + " " + styles.contact
                            }
                        >
                            <h3>Contact</h3>
                            <h3>
                                {agencyName[0].charAt(0) +
                                    agencyName[0].toLowerCase().slice(1) +
                                    " " +
                                    agencyName[1].charAt(0) +
                                    agencyName[1].toLowerCase().slice(1)}
                            </h3>
                            <h3>{me.email}</h3>
                            <p style={{ marginBottom: 10 }}>{me.mobile}</p>
                            <p>{me.establishment.address.formattedaddress}</p>
                        </div>

                        {tender.tendertype === TenderType.DELEGATION ? (
                            <div>
                                {/* <TenderDetailAgencyInfo me={me} tender={tender} /> */}

                                {/* <TenderDetailCandidatsList tender={tender} currentTab={currentTab} showFullDetails={true} /> */}
                                <div className={styles.candidats}>
                                    <div className={styles.candidatsHeader}>
                                        {/* <h3>{tender.providedworkers?.length > 1 ? t('candidat_plural', 'Candidats') : t('candidat', 'Candidat') }</h3> */}
                                        <h3>
                                            {t("candidat_plural", "Candidats")}
                                        </h3>
                                        <span>
                                            {tender.providedworkers.length}
                                        </span>
                                    </div>

                                    <CustomScroll
                                        className={
                                            tender.providedworkers.length === 0
                                                ? "hidden"
                                                : "customScroll"
                                        }
                                    >
                                        <div className={styles.candidatsList}>
                                            {tender.providedworkers.map(
                                                (worker) => (
                                                    <TenderDetailCandidatsListItem
                                                        key={worker.id}
                                                        worker={worker}
                                                        tender={tender}
                                                        showFullDetails={true}
                                                    />
                                                )
                                            )}

                                            <div
                                                className={styles.paddingBottom}
                                            ></div>
                                        </div>
                                    </CustomScroll>
                                    <Button
                                        className={styles.addWorkers}
                                        onClick={showModal}
                                    >
                                        Add Workers
                                    </Button>
                                    <Modal
                                        className={styles.workersModal}
                                        width={900}
                                        title="Workers"
                                        visible={isModalVisible}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        
                                    </Modal>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <span className={styles.divider}></span>
                <div className={styles.submitBox}>
                    <Button htmlType="submit" className={styles.submit}>
                        Sauvegarder en tant que brouillon
                    </Button>
                    <Button htmlType="submit" className={styles.submit2}>
                        Publier la proposition
                    </Button>
                </div>
            </Form>
        </div>
    );
}
