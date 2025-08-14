import { z } from 'zod';

export const employeeFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  mobileNumber: z.string().min(1, { message: 'Mobile number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  contract: z.object({
    contractType: z
      .enum(['PERMANENT', 'CONTRACT'])
      .refine(val => !!val, { message: 'Contract type is required' }),

    employmentType: z
      .enum(['FULL_TIME', 'PART_TIME'])
      .refine(val => !!val, { message: 'Employment type is required' }),

    startDate: z.string().min(1, { message: 'Start date is required' }),

    finishDate: z
        .string()
        .nullable()
        .transform((val) => (val === '' ? null : val)),
    })
    .superRefine((contract, ctx) => {
    const { contractType, startDate, finishDate } = contract;

    if (contractType === 'CONTRACT' && !finishDate) {
        ctx.addIssue({
        code: 'custom',
        path: ['finishDate'],
        message: 'Finish date is required for contract employees',
        });
    }

    if (startDate && finishDate) {
        const start = new Date(startDate);
        const finish = new Date(finishDate);

    if (!isNaN(start.getTime()) && !isNaN(finish.getTime()) && finish < start) {
      ctx.addIssue({
        code: 'custom',
        path: ['finishDate'],
        message: 'Finish date must be after start date',
        });
      }
    }

  }),
});
