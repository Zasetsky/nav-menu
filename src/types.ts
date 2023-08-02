export interface User {
  isAdmin: boolean;
}

export interface Employee {
  id: number;
  name: string;
  phone: string;
  isOnline: boolean;
  dates: Dates;
  birthday: string;
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

export interface TotalTime {
  hours: number;
  min: number;
}

export interface Downtime {
  hours: number;
  min: number;
}

export interface DatesData {
  breaksCount: number;
  totalTime: TotalTime;
  downtime: Downtime;
  isWeekend: boolean;
  isHoliday: boolean;
  isVacation: boolean;
  isBusinessTrip: boolean;
  isSickDay: boolean;
  isDayOff: boolean;
  isMaternityLeave: boolean;
  workPoints: WorkPoint[][];
  status: StatusItem;
}

export interface Dates {
  [date: string]: DatesData;
}

export interface StatusItem {
  dayStatus: string;
  comment: string;
}

export interface LocalStates {
  isCollapsed: boolean;
  selectedMonth: number;
  selectedYear: number;
  showOptions: boolean;
  isEditing: boolean;
}
