export interface Employee {
  id: number;
  name: string;
  phone: string;
  isOnline: boolean;
  dates: Dates;
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
  status: StatusItem;
}

export interface Dates {
  [date: string]: DatesData;
}

export interface User {
  isAdmin: boolean;
}

export interface StatusItem {
  dayStatus: string;
  comment: string;
}

export interface LocalStates {
  isCollapsed: boolean;
}
