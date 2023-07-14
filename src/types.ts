export interface Employee {
  id: number;
  name: string;
  phone: string;
}

export interface Department {
  id: number;
  name: string;
  employees: Employee[];
}
