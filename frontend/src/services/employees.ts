// src/services/employees.ts

import type { Employee } from "../types/employee";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches all non-archived employees.
 */
export async function getActiveEmployees(): Promise<Employee[]> {
  const res = await fetch(`${BASE_URL}/employees`);
  if (!res.ok) throw new Error('Failed to fetch active employees');
  return res.json();
}

/**
 * Fetches all archived employees.
 */
export async function getArchivedEmployees(): Promise<Employee[]> {
  const res = await fetch(`${BASE_URL}/employees/archived`);
  if (!res.ok) throw new Error('Failed to fetch archived employees');
  return res.json();
}

/**
 * Updates an employee record. Used for archiving/unarchiving or other updates.
 */
export async function updateEmployee(id: number, data: Partial<Employee>): Promise<void> {
  const res = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update employee');
}
