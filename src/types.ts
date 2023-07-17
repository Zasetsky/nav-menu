export interface Employee {
  id: number;
  name: string;
  phone: string;
  isOnline?: boolean; // ПОПРАВИТЬ!!!
  dates?: Dates; // ПОПРАВИТЬ!!!
}

export interface Department {
  id: number;
  name: string;
  employees: Employee[];
}

export interface WorkPoint {
  time: string;
  name?: string;
  comment: string;
}

export interface DatesData {
  breaksCount: number;
  totalTime: string;
  downtime: string;
  workPoints: WorkPoint[][];
}

export interface Dates {
  [date: string]: DatesData;
}

export interface User {
  isAdmin: boolean;
}

export interface StatusItem {
  date: string;
  dayStatus: string;
  comment: string;
}

export interface LocalStates {
  isCollapsed: boolean;
}
