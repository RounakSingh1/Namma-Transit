
export enum CrowdLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Bus {
  id: string;
  number: string;
  destination: string;
  origin: string;
  eta: number; // minutes
  crowd: CrowdLevel;
  platform: string;
  isDelayed?: boolean;
}

export interface Ticket {
  id: string;
  busId: string;
  busNumber: string;
  queueNumber: string;
  timestamp: string;
  status: 'active' | 'used' | 'cancelled';
  from: string;
  to: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  frequentRoutes: string[];
  balance: number;
}
