import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import EmployeeForm, { type EmployeeFormData } from '../components/EmployeeForm/EmployeeForm';

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<EmployeeFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(true);
  const [modalState, setModalState] = useState<'form' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://employeeapi.ameliajarrad.site/api/employees/${id}`);
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployee(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch employee');
        setModalState('error');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (formData: EmployeeFormData) => {
    try {
      const response = await fetch(`https://employeeapi.ameliajarrad.site/api/employees/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update employee');
      setModalState('success');

      setTimeout(() => {
        setModalOpen(false);
        navigate('/employees');
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong while updating the employee.');
      setModalState('error');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalState('form');
    setErrorMessage('');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Modal
      isOpen={modalOpen}
      onClose={handleModalClose}
      title={
        modalState === 'success'
          ? 'Employee Updated'
          : modalState === 'error'
          ? 'Error'
          : 'Edit Employee'
      }
      message={
        modalState === 'success'
          ? 'The employee has been updated successfully!'
          : modalState === 'error'
          ? errorMessage
          : undefined
      }
      variant={modalState}
    >
      {modalState === 'form' && employee && (
        <EmployeeForm
          onSubmit={handleUpdate}
          defaultValues={employee}
          submitLabel="Update"
          isEdit={true}
        />
      )}
    </Modal>
  );
};

export default EditEmployeePage;
