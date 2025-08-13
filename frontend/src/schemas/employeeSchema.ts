import { z } from 'zod';

export const employeeFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  mobileNumber: z.string().min(10, 'Mobile number is required'),
  address: z.string().min(1, 'Address is required'),
  contract: z.object({
    contractType: z.enum(['PERMANENT', 'CONTRACT']),
    employmentType: z.enum(['FULL_TIME', 'PART_TIME']),
    startDate: z.string().min(1, 'Start date is required'),
    finishDate: z.string().optional(),
  }).refine((data) => {
    if (data.contractType === 'CONTRACT') {
      if (!data.finishDate) return false;
      return new Date(data.finishDate) >= new Date(data.startDate);
    }
    return true;
  }, {
    message: 'Finish date is required and must be after start date for CONTRACTs',
    path: ['finishDate'],
  }),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;

