import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import EmployeeForm, { type EmployeeFormData } from '../components/EmployeeForm/EmployeeForm';


const CreateEmployeePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
      setModalOpen(false);
      // optionally refresh list or show a success message
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Create New Employee</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm onSubmit={handleCreate} submitLabel="Create" />
      </Modal>
    </>
  );
};

export default CreateEmployeePage;
