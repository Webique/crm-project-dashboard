import { DealStage } from '@/types/deal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StatusSelectProps {
  value: DealStage;
  onValueChange: (value: DealStage) => void;
  disabled?: boolean;
}

const StatusSelect = ({ value, onValueChange, disabled }: StatusSelectProps) => {
  const stages: DealStage[] = ['Financial Department', 'Technical Department', 'Finished'];

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[200px] bg-input border-border">
        <SelectValue placeholder="Select stage" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {stages.map((stage) => (
          <SelectItem key={stage} value={stage} className="hover:bg-accent">
            {stage}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;