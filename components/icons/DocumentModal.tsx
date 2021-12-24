import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { baseMediaUrl } from '../../utils/api/base';
import { IWorker } from '../../utils/tender';
import Appel from './Appel';
import styles from './DocumentModal.module.scss';

interface Props {
  worker: IWorker
}

export default function DocumentModal ({ worker}: Props) {
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
    <>
      <Button className={styles.documents} type="primary" onClick={showModal} >
      <Appel /></Button>
      <Modal className={styles.modal} title="Documents" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        
          <div className={styles.filesItem}>Worker's CV</div>
        
      </Modal>
    </>
  );
}
