import React, { useState } from 'react';
import './style.css';
import BootstrapModal from 'react-bootstrap/Modal';
import BootstrapContainer from 'react-bootstrap/Container';

interface ModalProps {
  children?: JSX.Element | JSX.Element[];
  showHeader?: boolean;
  headerTitle?: string;
  closeModal?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  showHeader = false,
  headerTitle = null,
  closeModal = () => {},
}): JSX.Element => {
  const [isModalShown, setIsModalShown] = useState<boolean>(true);

  return (
    <BootstrapModal
      show={isModalShown}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={() => {
        setIsModalShown(false);
        closeModal();
      }}
    >
      {showHeader && (
        <BootstrapContainer>
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>{headerTitle || null}</BootstrapModal.Title>
          </BootstrapModal.Header>
        </BootstrapContainer>
      )}
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
