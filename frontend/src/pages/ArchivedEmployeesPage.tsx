import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArchivedEmployees, updateEmployee } from '../services/employees';
import EmployeeCard, { type Employee } from '../components/EmployeeCard/EmployeeCard';
import styles from '../components/EmployeeCard/EmployeeCard.module.scss';
import Modal from '../components/Modal/Modal';

const ArchivedEmployeesPage = () => {
  const [archivedEmployees, setArchivedEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'form' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastArchivedStatus, setLastArchivedStatus] = useState<boolean | null>(null); // ✅ new state
  const navigate = useNavigate();

  const fetchArchived = async () => {
    try {
      const data = await getArchivedEmployees();
      setArchivedEmployees(data);
      console.log('Fetched archived employees:', data);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to fetch archived employees');
      setModalState('error');
      setModalOpen(true);
    }
  };

  useEffect(() => {
    fetchArchived();
  }, []);

  const handleToggleArchive = async (id: number, isArchived: boolean) => {
      console.log('Toggle clicked:', id, isArchived); // Debug

    try {
      await updateEmployee(id, { isArchived });

      setLastArchivedStatus(isArchived); // ✅ capture archive direction

      if (!isArchived) {
        // If unarchived, redirect to All Employees
        navigate('/employees');
      } else {
        // If re-archived (unlikely), remove from this list
        setArchivedEmployees((prev) => prev.filter((emp) => emp.id !== id));
      }

      setModalState('success');
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        setModalState('form');
      }, 1500);
    } catch (err) {
      console.error('Error toggling archive:', err);
      setErrorMessage('Something went wrong while archiving/unarchiving.');
      setModalState('error');
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalState('form');
    setErrorMessage('');
    setLastArchivedStatus(null);
  };

  return (
  <div>
    <h1>Archived Employees</h1>

    <Modal
              isOpen={modalOpen}
              onClose={handleModalClose}
              title={modalState === 'success'
                  ? lastArchivedStatus
                      ? 'Employee Archived'
                      : 'Employee Unarchived'
                  : modalState === 'error'
                      ? 'Error'
                      : ''}
              message={modalState === 'success'
                  ? lastArchivedStatus
                      ? 'The employee was successfully archived.'
                      : 'The employee was successfully unarchived.'
                  : modalState === 'error'
                      ? errorMessage
                      : undefined}
              variant={modalState} children={undefined}    />

    {archivedEmployees.length === 0 ? (
      <div className={styles.card}>
        <h2>No Archived Employees</h2>
        <p>You don't have any archived employees at the moment.</p>
      </div>
    ) : (
      <div className={styles.cardList}>
        {archivedEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onToggleArchive={handleToggleArchive}
          />
        ))}
      </div>
    )}
  </div>
);
}

export default ArchivedEmployeesPage;