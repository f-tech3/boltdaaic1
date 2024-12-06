import { differenceInDays, isPast, isToday } from 'date-fns';

export const getCountdown = (date: Date): { 
  days: number; 
  status: 'past' | 'today' | 'upcoming';
  urgency: 'far' | 'near' | 'close' | 'immediate' 
} => {
  if (isPast(date) && !isToday(date)) {
    return { days: differenceInDays(new Date(), date), status: 'past', urgency: 'far' };
  }
  if (isToday(date)) {
    return { days: 0, status: 'today', urgency: 'immediate' };
  }
  
  const daysLeft = differenceInDays(date, new Date());
  let urgency: 'far' | 'near' | 'close' | 'immediate';
  
  if (daysLeft > 30) {
    urgency = 'far';
  } else if (daysLeft > 14) {
    urgency = 'near';
  } else if (daysLeft > 7) {
    urgency = 'close';
  } else {
    urgency = 'immediate';
  }
  
  return { days: daysLeft, status: 'upcoming', urgency };
};