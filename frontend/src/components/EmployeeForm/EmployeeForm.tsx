import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeeFormSchema } from '../../schemas/employeeSchema';
import { useEffect } from 'react';
import styles from './EmployeeForm.module.scss';

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;

type EmployeeFormProps = {
  onSubmit: (data: EmployeeFormData) => void;
  defaultValues?: EmployeeFormData;
  submitLabel?: string;
  isEdit?: boolean;
};

const EmployeeForm = ({ onSubmit, defaultValues, submitLabel = 'Submit', isEdit = false }: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const contractType = useWatch({
    control,
    name: 'contract.contractType',
  });

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
      {errors.contract?.contractType && (
        <span className={styles.error}>{errors.contract.contractType.message}</span>
      )}

      <select {...register('contract.employmentType')}>
        <option value="">Select Employment Type</option>
        <option value="FULL_TIME">Full Time</option>
        <option value="PART_TIME">Part Time</option>
      </select>
      {errors.contract?.employmentType && (
        <span className={styles.error}>{errors.contract.employmentType.message}</span>
      )}

      <div className={styles.formGroup}>
        <label>
          Start Date:
          <input
            type="date"
            {...register('contract.startDate')}
            min={!isEdit ? new Date().toISOString().split('T')[0] : undefined}
          />
        </label>
        {errors.contract?.startDate && (
          <span className={styles.error}>{errors.contract.startDate.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>
          Finish Date:
          <input
            type="date"
            {...register('contract.finishDate')}
            disabled={contractType !== 'CONTRACT'}
          />
        </label>
        {errors.contract?.finishDate && (
          <span className={styles.error}>{errors.contract.finishDate.message}</span>
        )}
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default EmployeeForm;


