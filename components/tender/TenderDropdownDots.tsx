import styles from "./TenderDropdownDots.module.scss";
import { Dropdown, Button, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";


const menu = (
    <Menu className={styles.dropdownMenu}>
        <Menu.Item key="1">Dupliquer</Menu.Item>
        <Menu.Item key="2">Supprimer</Menu.Item>
        <Menu.Item key="3">Enregistrer comme modèle</Menu.Item>
    </Menu>
);

export default function DropdownDots() {
    return (
        <Dropdown className={styles.dropdownDots} overlay={menu} trigger={["click"]}>
            <Button>
                <EllipsisOutlined className={styles.dots} style={{ fontSize: 21 }} />
            </Button>
        </Dropdown>
    );
}
