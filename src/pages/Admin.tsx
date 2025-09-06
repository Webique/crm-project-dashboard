import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { dealStore } from '../store/dealStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';

const Admin = () => {
  const [clients, setClients] = useState<{ name: string; totalDeals: number; totalAmount: number }[]>([]);

  useEffect(() => {
    const clientData = dealStore.getAllClients();
    setClients(clientData);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalRevenue = clients.reduce((sum, client) => sum + client.totalAmount, 0);
  const totalClients = clients.length;
  const totalDeals = clients.reduce((sum, client) => sum + client.totalDeals, 0);

  // Mock paid services data - will be replaced with real data from backend later
  const allPaidServices = [
    { id: '1', clientName: 'أحمد محمد الأحمد', serviceName: 'Hungerstation Marketing Campaign', amount: 2500, paymentDate: new Date('2024-01-20') },
    { id: '2', clientName: 'سارة عبدالله', serviceName: 'Keeta Premium Promotion', amount: 1800, paymentDate: new Date('2024-02-15') },
    { id: '3', clientName: 'محمد علي', serviceName: 'The Chefz Social Media Package', amount: 1200, paymentDate: new Date('2024-03-01') },
    { id: '4', clientName: 'فاطمة احمد', serviceName: 'Careem Food Advertisement', amount: 3200, paymentDate: new Date('2024-03-10') },
    { id: '5', clientName: 'أحمد محمد الأحمد', serviceName: 'Instagram Influencer Campaign', amount: 1500, paymentDate: new Date('2024-03-15') },
  ];

  const totalServicesRevenue = allPaidServices.reduce((sum, service) => sum + service.amount, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Admin Panel</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDeals}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services Revenue</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalServicesRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Paid Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Paid Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allPaidServices.slice(0, 5).map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-semibold text-foreground">{service.serviceName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.clientName} • {formatDate(service.paymentDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{formatCurrency(service.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clients List */}
        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client, index) => (
                <Link
                  key={index}
                  to={`/admin/client/${encodeURIComponent(client.name)}`}
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {client.totalDeals} deal{client.totalDeals !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{formatCurrency(client.totalAmount)}</p>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;