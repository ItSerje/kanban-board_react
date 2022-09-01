import './style.css';
import BootstrapModal from 'react-bootstrap/Modal';
import BootstrapContainer from 'react-bootstrap/Container';

const Modal = ({
  children,
  showHeader = false,
  headerTitle = null,
  closeModal = null,
}) => {
  return (
    <BootstrapModal
      show={true}
      //   onHide={keepModalOpen}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={closeModal}
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
