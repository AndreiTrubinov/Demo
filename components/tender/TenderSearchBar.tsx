import styles from './TenderSearchBar.module.scss'
import { DatePicker, Dropdown, Button, Menu, Input } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import DownArrow from '../icons/DownArrow'
import IconPlus from '../icons/IconPlus'

export default function TenderSearchBar() {
    return (
        <div className={styles.wrapper}>
            <Input placeholder="Rechercher..." style={{color: '#495057'}} prefix={<SearchOutlined style={{color: '#495057', fontSize: '16px'}} />} className={styles.searchBox} />

            <DatePicker className={styles.calendar} placeholder="Date de début" />

                <Button className={styles.dropdownButton}>
                    Type d'offre<DownArrow />
                </Button>
            

            <Dropdown overlay={menu} className={styles.dropdownButtonPoste}>
                <Button>
                    Poste<DownArrow />
                </Button>
            </Dropdown>

            <Dropdown overlay={menu} className={styles.dropdownButtonSecteur}>
                <Button >
                    Secteur d'activité <DownArrow />
                </Button>
            </Dropdown>

            <Button className={styles.ButtonEnreg}>
                Filtres enregistrés
            </Button>

            <Button className={styles.ButtonPlus}>
                Plus <IconPlus />
            </Button>
        </div>
    )
}



const menu = (
    <Menu>

    </Menu>
);
