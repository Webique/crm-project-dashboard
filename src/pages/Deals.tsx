import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DealCard from '@/components/DealCard';
import Navigation from '@/components/Navigation';
import { dealStore } from '@/store/dealStore';

const Deals = () => {
  const navigate = useNavigate();
  const [deals] = useState(() => dealStore.getDeals());

  const handleDealClick = (dealId: string) => {
    navigate(`/deal/${dealId}`);
  };

  const handleCreateDeal = () => {
    navigate('/create-deal');
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={() => handleDealClick(deal.id)}
            />
          ))}
        </div>

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