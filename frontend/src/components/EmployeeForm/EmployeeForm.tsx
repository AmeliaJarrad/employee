import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeeFormSchema} from '../../schemas/employeeSchema';
import { useEffect } from 'react';
import styles from './EmployeeForm.module.scss'; 

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;


type EmployeeFormProps = {
  onSubmit: (data: EmployeeFormData) => void;
  defaultValues?: EmployeeFormData;
  submitLabel?: string;
};

const EmployeeForm = ({ onSubmit, defaultValues, submitLabel = 'Submit' }: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues, // used on first mount
  });

  // This handles updates to defaultValues when editing
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
     <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input {...register('firstName')} placeholder="First Name" />
      {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}

      <input {...register('lastName')} placeholder="Last Name" />
      {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <span className={styles.error}>{errors.email.message}</span>}

      <input {...register('mobileNumber')} placeholder="Mobile Number" />
      {errors.mobileNumber && <span className={styles.error}>{errors.mobileNumber.message}</span>}

      <input {...register('address')} placeholder="Address" />
      {errors.address && <span className={styles.error}>{errors.address.message}</span>}

      <select {...register('contract.contractType')}>
        <option value="">Select Contract Type</option>
        <option value="PERMANENT">Permanent</option>
        <option value="CONTRACT">Contract</option>
      </select>
      {errors.contract?.contractType && <span className={styles.error}>{errors.contract.contractType.message}</span>}

      <select {...register('contract.employmentType')}>
        <option value="">Select Employment Type</option>
        <option value="FULL_TIME">Full Time</option>
        <option value="PART_TIME">Part Time</option>
      </select>
      {errors.contract?.employmentType && <span className={styles.error}>{errors.contract.employmentType.message}</span>}

      <input {...register('contract.startDate')} placeholder="Start Date (YYYY-MM-DD)" />
      {errors.contract?.startDate && <span className={styles.error}>{errors.contract.startDate.message}</span>}

      <input {...register('contract.finishDate')} placeholder="Finish Date (YYYY-MM-DD or leave empty)" />
      {errors.contract?.finishDate && <span className={styles.error}>{errors.contract.finishDate.message}</span>}

      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default EmployeeForm;
