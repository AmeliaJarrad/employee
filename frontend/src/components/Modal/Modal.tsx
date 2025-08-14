import React from 'react';
import styles from './Modal.module.scss';


export type ModalVariant = 'form' | 'success' | 'error';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;                
  message?: string;
  variant?: ModalVariant;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, message, variant = 'form' }) => {
  if (!isOpen) return null;

 return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[variant]}`}>
        <button onClick={onClose} className={styles.closeButton}>×</button>

        {title && <h2 className={styles.title}>{title}</h2>} 
        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
