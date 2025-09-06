import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const financialDeals = deals.filter(deal => deal.stage === 'Sales Department');
  const technicalDeals = deals.filter(deal => deal.stage === 'Technical Department');
  const finishedDeals = deals.filter(deal => deal.stage === 'Finished');
  const currentDeals = deals.filter(deal => deal.stage !== 'Finished');

  // Mock paid services data - will be replaced with real data from backend later
  const recentPaidServices = [
    {
      id: '1',
      clientName: 'أحمد محمد الأحمد',
      serviceName: 'Hungerstation Marketing Campaign',
      amount: 2500,
      paymentDate: new Date('2024-01-20'),
      status: 'Active'
    },
    {
      id: '2', 
      clientName: 'سارة عبدالله',
      serviceName: 'Keeta Premium Promotion',
      amount: 1800,
      paymentDate: new Date('2024-02-15'),
      status: 'Completed'
    },
    {
      id: '3',
      clientName: 'محمد علي',
      serviceName: 'The Chefz Social Media Package',
      amount: 1200,
      paymentDate: new Date('2024-03-01'),
      status: 'Active'
    },
    {
      id: '4',
      clientName: 'فاطمة احمد',
      serviceName: 'Careem Food Advertisement',
      amount: 3200,
      paymentDate: new Date('2024-03-10'),
      status: 'Active'
    }
  ];

  const totalServicesRevenue = recentPaidServices.reduce((sum, service) => sum + service.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderDealSection = (sectionDeals: Deal[], title: string) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        {title} 
        <span className="text-sm font-normal text-muted-foreground">({sectionDeals.length})</span>
      </h3>
      {sectionDeals.length > 0 ? (
        <div className="space-y-4">
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

        {/* Paid Services Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Paid Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Total Services Revenue:</span>
                </div>
                <span className="text-xl font-bold text-green-600">{formatCurrency(totalServicesRevenue)}</span>
              </div>
              
              <div className="grid gap-4">
                {recentPaidServices.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{service.serviceName}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {service.clientName} • Paid on {formatDate(service.paymentDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{formatCurrency(service.amount)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          service.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Deals</TabsTrigger>
            <TabsTrigger value="finished">Finished Deals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {renderDealSection(financialDeals, "Sales Department")}
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