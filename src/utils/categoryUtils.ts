import { Brain, Database, Cpu, Heart, Briefcase, Users, LucideIcon } from 'lucide-react';

export type CategoryInfo = {
  icon: LucideIcon;
  gradient: string;
  label: string;
};

export type CategoryIcons = {
  [key: string]: CategoryInfo;
};

export const categoryIcons: CategoryIcons = {
  ai: { 
    icon: Brain, 
    gradient: 'from-purple-400 to-pink-500', 
    label: 'Artificial Intelligence' 
  },
  data: { 
    icon: Database, 
    gradient: 'from-blue-400 to-cyan-500', 
    label: 'Data Analytics' 
  },
  tech: { 
    icon: Cpu, 
    gradient: 'from-emerald-400 to-teal-500', 
    label: 'Technology' 
  },
  health: { 
    icon: Heart, 
    gradient: 'from-rose-400 to-red-500', 
    label: 'Healthcare' 
  },
  business: { 
    icon: Briefcase, 
    gradient: 'from-amber-400 to-orange-500', 
    label: 'Business' 
  },
  conference: { 
    icon: Users, 
    gradient: 'from-slate-400 to-slate-500', 
    label: 'Conference' 
  }
};

export const getPrimaryCategoryInfo = (tags: string[]): CategoryInfo => {
  const primaryCategory = tags[0] || 'conference';
  return categoryIcons[primaryCategory] || categoryIcons.conference;
};