
import React from 'react';
import { CrowdLevel } from '../types';
import { Users } from 'lucide-react';

interface Props {
  level: CrowdLevel;
  large?: boolean;
}

const CrowdBadge: React.FC<Props> = ({ level, large }) => {
  const getColors = () => {
    switch (level) {
      case CrowdLevel.LOW:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case CrowdLevel.MEDIUM:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case CrowdLevel.HIGH:
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getLabel = () => {
    switch (level) {
      case CrowdLevel.LOW: return 'Low Crowd';
      case CrowdLevel.MEDIUM: return 'Moderate';
      case CrowdLevel.HIGH: return 'High Crowd';
    }
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${getColors()} ${large ? 'text-lg px-4 py-2' : 'text-[10px]'} font-bold uppercase tracking-wider`}>
      <Users size={large ? 20 : 12} />
      <span>{getLabel()}</span>
    </div>
  );
};

export default CrowdBadge;
