import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { dealStore } from '../store/dealStore';
import { Deal } from '../types/deal';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Mail, Phone, CreditCard, Calendar, Key, Copy, ShoppingCart, DollarSign } from 'lucide-react';

const ClientDetails = () => {
  const { clientName } = useParams<{ clientName: string }>();
  const navigate = useNavigate();
  const [clientDeals, setClientDeals] = useState<Deal[]>([]);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  const generateRandomPassword = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  useEffect(() => {
    if (clientName) {
      const decodedClientName = decodeURIComponent(clientName);
      const deals = dealStore.getClientDeals(decodedClientName);
      setClientDeals(deals);
      // Generate a consistent password for this client (you could use client name as seed)
      setGeneratedPassword(generateRandomPassword());
    }
  }, [clientName]);

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const handleRegeneratePassword = () => {
    setGeneratedPassword(generateRandomPassword());
  };

  const getStageColor = (stage: Deal['stage']) => {
    switch (stage) {
      case 'Sales Department':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Technical Department':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Finished':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalAmount = clientDeals.reduce((sum, deal) => sum + deal.dealAmount, 0);
  const finishedDeals = clientDeals.filter(deal => deal.stage === 'Finished');
  const totalPaid = finishedDeals.reduce((sum, deal) => sum + deal.dealAmount, 0);

  // Mock paid services data - will be replaced with real data from backend later
  const paidServices = [
    {
      id: '1',
      serviceName: 'Hungerstation Marketing Campaign',
      amount: 2500,
      paymentDate: new Date('2024-01-20'),
      status: 'Active'
    },
    {
      id: '2', 
      serviceName: 'Keeta Premium Promotion',
      amount: 1800,
      paymentDate: new Date('2024-02-15'),
      status: 'Completed'
    },
    {
      id: '3',
      serviceName: 'The Chefz Social Media Package',
      amount: 1200,
      paymentDate: new Date('2024-03-01'),
      status: 'Active'
    }
  ];

  const totalServicesPaid = paidServices.reduce((sum, service) => sum + service.amount, 0);

  if (!clientName || clientDeals.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Client Not Found</h1>
            <Button onClick={handleBackClick} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const clientInfo = clientDeals[0]; // Get client info from first deal

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={handleBackClick} variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{decodeURIComponent(clientName)}</h1>
          <p className="text-muted-foreground mt-2">Client Details & Deal History</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Client Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{clientInfo.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{clientInfo.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{clientInfo.iban}</span>
              </div>
            </CardContent>
          </Card>

          {/* Client Credentials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Login Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Email:</span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
                    {clientInfo.contactEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Password:</span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
                    {generatedPassword}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  const credentials = `Email: ${clientInfo.contactEmail}\nPassword: ${generatedPassword}`;
                  navigator.clipboard.writeText(credentials);
                }}
                size="sm"
                variant="outline"
                className="flex items-center gap-1 w-full"
              >
                <Copy className="h-3 w-3" />
                Copy Credentials
              </Button>
            </CardContent>
          </Card>

          {/* Deal Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Deal Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Deals</p>
                <p className="text-2xl font-bold">{clientDeals.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deal Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid (Finished Deals)</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Deal Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Deal Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Finished Deals</p>
                <p className="text-xl font-semibold text-green-600">{finishedDeals.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <p className="text-xl font-semibold text-blue-600">{clientDeals.length - finishedDeals.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Paid Services Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Paid Services History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paidServices.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Total Services Paid:</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">{formatCurrency(totalServicesPaid)}</span>
                </div>
                
                <div className="grid gap-4">
                  {paidServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{service.serviceName}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            Paid on {formatDate(service.paymentDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{formatCurrency(service.amount)}</p>
                          <Badge 
                            variant={service.status === 'Active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No services purchased yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deals List */}
        <Card>
          <CardHeader>
            <CardTitle>All Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientDeals.map((deal) => (
                <div key={deal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        to={`/deal/${deal.id}`}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Deal #{deal.id}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{deal.dealDescription}</p>
                    </div>
                    <Badge className={getStageColor(deal.stage)}>
                      {deal.stage}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-semibold">{formatCurrency(deal.dealAmount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(deal.createdDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment Notes</p>
                      <p className="font-semibold">{deal.paymentNotes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDetails;