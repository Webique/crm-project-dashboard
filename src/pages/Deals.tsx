import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DealCard from '@/components/DealCard';
import Navigation from '@/components/Navigation';
import { dealStore } from '@/store/dealStore';
import { Deal } from '@/types/deal';

const Deals = () => {
  const navigate = useNavigate();
  const [deals] = useState(() => dealStore.getDeals());

  const handleDealClick = (dealId: string) => {
    navigate(`/deal/${dealId}`);
  };

  const handleCreateDeal = () => {
    navigate('/create-deal');
  };

  const financialDeals = deals.filter(deal => deal.stage === 'Financial Department');
  const technicalDeals = deals.filter(deal => deal.stage === 'Technical Department');
  const finishedDeals = deals.filter(deal => deal.stage === 'Finished');
  const currentDeals = deals.filter(deal => deal.stage !== 'Finished');

  const renderDealSection = (sectionDeals: Deal[], title: string) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        {title} 
        <span className="text-sm font-normal text-muted-foreground">({sectionDeals.length})</span>
      </h3>
      {sectionDeals.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sectionDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={() => handleDealClick(deal.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No deals in this category
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Current Deals</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and track your active business deals
            </p>
          </div>
          <Button onClick={handleCreateDeal} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Deal
          </Button>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Deals</TabsTrigger>
            <TabsTrigger value="finished">Finished Deals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {renderDealSection(financialDeals, "Financial Department")}
              </div>
              <div className="space-y-4">
                {renderDealSection(technicalDeals, "Technical Department")}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="finished" className="space-y-6">
            {renderDealSection(finishedDeals, "Completed Deals")}
          </TabsContent>
        </Tabs>

        {deals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No deals found</p>
            <Button onClick={handleCreateDeal} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create your first deal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;