import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm, { type EmployeeFormData } from '../components/EmployeeForm/EmployeeForm';

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<EmployeeFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://employeeapi.ameliajarrad.site/api/employees/${id}`);
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployee(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch employee');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (formData: EmployeeFormData) => {
    try {
      const response = await fetch(`https://employeeapi.ameliajarrad.site/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update employee');
      navigate('/employees'); // Redirect after success
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <EmployeeForm onSubmit={handleUpdate} defaultValues={employee!} submitLabel="Update" />
    </div>
  );
};

export default EditEmployeePage;
