import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, DollarSign, Mail, Phone, CreditCard } from 'lucide-react';
import Navigation from '@/components/Navigation';
import StatusSelect from '@/components/StatusSelect';
import NotesSection from '@/components/NotesSection';
import { dealStore } from '@/store/dealStore';
import { Deal, DealStage } from '@/types/deal';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);

  useEffect(() => {
    if (id) {
      const foundDeal = dealStore.getDealById(id);
      if (foundDeal) {
        setDeal(foundDeal);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleStageChange = (newStage: DealStage) => {
    if (!deal || !id) return;

    const success = dealStore.updateDealStage(id, newStage);
    if (success) {
      setDeal(prev => prev ? { ...prev, stage: newStage } : null);
      toast({
        title: "Stage updated",
        description: `Deal stage changed to ${newStage}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update deal stage",
        variant: "destructive",
      });
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const getStageColor = (stage: Deal['stage']) => {
    switch (stage) {
      case 'Sales Department':
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
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (!deal) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Deal not found</p>
            <Button onClick={handleBackClick} className="mt-4">
              Back to Deals
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deals
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{deal.clientName}</h1>
              <p className="mt-2 text-muted-foreground">Deal Details</p>
            </div>
            <Badge className={cn("text-sm font-medium", getStageColor(deal.stage))}>
              {deal.stage}
            </Badge>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Deal Details */}
          <div className="w-80 flex-shrink-0 space-y-6">
            {/* Contact Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">{deal.contactEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">{deal.contactPhone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">IBAN</p>
                    <p className="text-sm text-muted-foreground font-mono">{deal.iban}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stage Management */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Stage Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Current Stage
                    </label>
                    <StatusSelect
                      value={deal.stage}
                      onValueChange={handleStageChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Update the deal stage to track progress through your sales pipeline.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Deal Overview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Deal Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {formatCurrency(deal.dealAmount)}
                  </h3>
                  <p className="text-muted-foreground">Total Deal Value</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{deal.dealDescription}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Payment Notes</h4>
                  <p className="text-muted-foreground">{deal.paymentNotes || 'No payment notes'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Deal Timeline */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Deal Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-card-foreground">Created</p>
                  <p className="text-sm text-muted-foreground">{formatDate(deal.createdDate)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Notes Section (Takes most of the page) */}
          <div className="flex-1">
            <NotesSection dealId={deal.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;