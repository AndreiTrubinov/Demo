import React from "react";
import styles from "./TenderDetailProposalBudgetInputs.module.scss";
import { Checkbox, Input } from "antd";
import { IUser } from "../../utils/account";

interface Props {
    me: IUser;
    currentTab: string;
}

export default function TenderDetailProposalBudgetInputs({ me, currentTab} : Props){
    const euro = '€';
    return(
        <div>
                    <h3 className={styles.header}>Proposition</h3>
                    <div className={styles.salaryCheckbox}>
                        <Checkbox checked>Offre</Checkbox>
                        <Checkbox>Prépayé</Checkbox>
                    </div>

                    { me.is_agency && currentTab !== '3' ?
                    <div className={styles.salary + ' ' + styles.salaryInputsBox}>
                       <div className={styles.salaryLeft + ' ' + styles.salaryInputs}>
                            <p className="BudgetInput">
                                Taux horaire brut<Input placeholder='0' suffix={euro} />
                            </p>
                            <p className="BudgetInput">
                                Nombre d'heures<Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput"> 
                                Nombre de jours<Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                Coefficient<Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                Coefficient de travail majoré<Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                Autre(s) dépense(s)<Input placeholder='0'/>
                            </p>
                            <p>
                                Total estimé<span><b>2017,00</b>€</span>
                            </p>
                        </div> 
                        <div className={styles.salaryRight + ' ' + styles.salaryInputs}>
                            <p className="BudgetInput">
                                <Input placeholder='0' suffix={euro} />
                            </p>
                            <p className="BudgetInput">
                                <Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                <Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                <Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                <Input placeholder='0'/>
                            </p>
                            <p className="BudgetInput">
                                <Input placeholder='0'/>
                            </p>
                            <p>
                                <span><b>0</b>€</span>
                            </p>
                        </div>
                    </div>   
                        : <div className={styles.salary}>
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
                                Coefficient de travail majoré<span>0</span>
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
                    }
        </div>
    )
}