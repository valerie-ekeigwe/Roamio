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
          className="w-full justify-start text-left font-normal border-border hover:bg-secondary"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(date, 'PPP')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover border-border">
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
