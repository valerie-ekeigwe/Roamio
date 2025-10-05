import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal border-border hover:bg-secondary hover:border-primary/50 transition-all duration-300 glow-card"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
          {format(date, 'PPP')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover/95 backdrop-blur-md border-border shadow-xl glow-card">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && onDateChange(newDate)}
          disabled={(date) =>
            date > new Date() || date < new Date('2000-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
