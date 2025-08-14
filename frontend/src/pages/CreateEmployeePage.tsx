import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import EmployeeForm, { type EmployeeFormData } from '../components/EmployeeForm/EmployeeForm';

const CreateEmployeePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'form' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (data: EmployeeFormData) => {
    try {
      const response = await fetch('https://employeeapi.ameliajarrad.site/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create employee');

      setModalState('success');

      // Auto-close and redirect after a short delay
      setTimeout(() => {
        setModalOpen(false);
        setModalState('form'); // Reset state
        navigate('/employees');
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong while creating the employee.');
      setModalState('error');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalState('form');
    setErrorMessage('');
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Create New Employee</button>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title={
          modalState === 'success'
            ? 'Employee Created'
            : modalState === 'error'
            ? 'Error'
            : 'Create New Employee'
        }
        message={
          modalState === 'success'
            ? 'The employee has been created successfully!'
            : modalState === 'error'
            ? errorMessage
            : undefined
        }
        variant={modalState} 
      >
        {modalState === 'form' && (
          <EmployeeForm onSubmit={handleCreate} submitLabel="Create" />
        )}
      </Modal>
    </>
  );
};

export default CreateEmployeePage;
