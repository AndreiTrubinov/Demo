import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useTranslation, Trans } from "next-i18next";

export default function HomeNav() {

    const { t } = useTranslation("common");
    
    const [form] = Form.useForm();
    const { Option } = Select;
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            
            <Select className='HomeSelect'
                style={{
                    width: 99,
                }}
            >   
                <Option value="+33">
                <span className={"flag-icon flag-icon-squared flag-icon-fr"}></span> 
                &nbsp;+33
                </Option>
                <Option value="+34">
                <span className={"flag-icon flag-icon-squared flag-icon-fr"}></span> 
                &nbsp;+34
                </Option>
            </Select>
        </Form.Item>
    );
    
    return (
        <Form
            className="HomeForm"
            form={form}
            layout="vertical"
            initialValues={{
                prefix: "+33",
            }}
        >
            <Form.Item label="Email">
                <Input placeholder="your@mail.com" />
            </Form.Item>
            <Form.Item label={t("homeformsociete", "Société")}>
                <Input placeholder={t("homeformsociete", "Société")} />
            </Form.Item>
            <Form.Item
                name="phone"
                label={t("homeformphone", "Téléphone")}
                rules={[
                    {
                        required: false,
                        message: "Please input your phone number!"
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: "100%",
                    }}
                    placeholder="123456789"
                />
            </Form.Item>
            <Form.Item label="Message">
                <TextArea rows={4} placeholder={t("homeformmessage", "Votre message...")} />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    style={{
                        width: "100%",
                    }}
                >
                    {t("homeformbutton", "Envoyer ma demande")}
                </Button>
            </Form.Item>
        </Form>
    );
}
