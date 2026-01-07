
import { Bus, CrowdLevel } from './types';

export const BENGALURU_COLORS = {
  GREEN: '#00843D',
  YELLOW: '#FFD700',
  SKY_BLUE: '#00BFFF',
  DEEP_BLUE: '#1E3A8A'
};

export const MOCK_BUSES: Bus[] = [
  { id: '1', number: '500-D', destination: 'ITPL', origin: 'Silk Board', eta: 4, crowd: CrowdLevel.HIGH, platform: 'P1' },
  { id: '2', number: '335-E', destination: 'Kadugodi', origin: 'Majestic', eta: 8, crowd: CrowdLevel.MEDIUM, platform: 'P3' },
  { id: '3', number: 'G-3', destination: 'Electronic City', origin: 'Brigade Road', eta: 12, crowd: CrowdLevel.LOW, platform: 'P2' },
  { id: '4', number: 'KIA-9', destination: 'Airport', origin: 'Kempapura', eta: 15, crowd: CrowdLevel.MEDIUM, platform: 'P4', isDelayed: true },
  { id: '5', number: '270', destination: 'Majestic', origin: 'Yeshwanthpur', eta: 22, crowd: CrowdLevel.HIGH, platform: 'P1' },
];

export const MOCK_USER = {
  name: 'Arjun Kumar',
  phone: '+91 98765 43210',
  frequentRoutes: ['500-D (Silk Board → ITPL)', 'G-3 (Electronic City)'],
  balance: 450.50
};
