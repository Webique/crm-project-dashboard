import { Deal } from '@/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
  onClick: () => void;
}

const DealCard = ({ deal, onClick }: DealCardProps) => {
  const getStageColor = (stage: Deal['stage']) => {
    switch (stage) {
      case 'Financial Department':
        return 'bg-status-financial text-black';
      case 'Technical Department':
        return 'bg-status-technical text-white';
      case 'Finished':
        return 'bg-status-finished text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 border-border bg-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            {deal.clientName}
          </CardTitle>
          <Badge className={cn("text-xs font-medium", getStageColor(deal.stage))}>
            {deal.stage}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-card-foreground">
            {formatCurrency(deal.dealAmount)}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDate(deal.createdDate)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {deal.dealDescription}
        </p>
      </CardContent>
    </Card>
  );
};

export default DealCard;