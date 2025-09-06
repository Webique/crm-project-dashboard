import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import StatusSelect from '@/components/StatusSelect';
import { dealStore } from '@/store/dealStore';
import { CreateDealInput, DealStage } from '@/types/deal';
import { toast } from '@/hooks/use-toast';

const CreateDeal = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CreateDealInput>({
    clientName: '',
    contactEmail: '',
    contactPhone: '',
    iban: '',
    crNumber: '',
    paymentNotes: '',
    dealAmount: 0,
    stage: 'Financial Department',
    dealDescription: '',
    marketingServices: [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!formData.iban.trim()) {
      newErrors.iban = 'IBAN is required';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    if (formData.dealAmount <= 0) {
      newErrors.dealAmount = 'Deal amount must be greater than 0';
    }
    
    if (!formData.crNumber.trim()) {
      newErrors.crNumber = 'CR number is required';
    }
    
    if (formData.marketingServices.length === 0) {
      newErrors.marketingServices = 'Please select at least one marketing service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      dealStore.createDeal(formData);
      toast({
        title: "Deal created successfully",
        description: `Deal for ${formData.clientName} has been created.`,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleInputChange = (field: keyof CreateDealInput, value: string | number | DealStage | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMarketingServiceChange = (service: string, checked: boolean) => {
    const updatedServices = checked 
      ? [...formData.marketingServices, service]
      : formData.marketingServices.filter(s => s !== service);
    
    handleInputChange('marketingServices', updatedServices);
  };

  const marketingOptions = ['hungerstation', 'the chefz', 'keeta', 'marsool'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleCancel}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deals
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">Create New Deal</h1>
          <p className="mt-2 text-muted-foreground">
            Add a new business deal to your CRM system
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Deal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-card-foreground">
                    Client Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                  {errors.clientName && (
                    <p className="text-sm text-destructive">{errors.clientName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-card-foreground">
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                  {errors.contactEmail && (
                    <p className="text-sm text-destructive">{errors.contactEmail}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-card-foreground">
                    Contact Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iban" className="text-card-foreground">
                    IBAN *
                  </Label>
                  <Input
                    id="iban"
                    value={formData.iban}
                    onChange={(e) => handleInputChange('iban', e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                  {errors.iban && (
                    <p className="text-sm text-destructive">{errors.iban}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crNumber" className="text-card-foreground">
                    CR Number *
                  </Label>
                  <Input
                    id="crNumber"
                    value={formData.crNumber}
                    onChange={(e) => handleInputChange('crNumber', e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                  {errors.crNumber && (
                    <p className="text-sm text-destructive">{errors.crNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dealAmount" className="text-card-foreground">
                    Deal Amount *
                  </Label>
                  <Input
                    id="dealAmount"
                    type="number"
                    step="0.01"
                    value={formData.dealAmount}
                    onChange={(e) => handleInputChange('dealAmount', parseFloat(e.target.value) || 0)}
                    className="bg-input border-border text-foreground"
                  />
                  {errors.dealAmount && (
                    <p className="text-sm text-destructive">{errors.dealAmount}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage" className="text-card-foreground">
                    Initial Stage
                  </Label>
                  <StatusSelect
                    value={formData.stage}
                    onValueChange={(value) => handleInputChange('stage', value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentNotes" className="text-card-foreground">
                  Payment Notes
                </Label>
                <Textarea
                  id="paymentNotes"
                  value={formData.paymentNotes}
                  onChange={(e) => handleInputChange('paymentNotes', e.target.value)}
                  className="bg-input border-border text-foreground"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealDescription" className="text-card-foreground">
                  Deal Description
                </Label>
                <Textarea
                  id="dealDescription"
                  value={formData.dealDescription}
                  onChange={(e) => handleInputChange('dealDescription', e.target.value)}
                  className="bg-input border-border text-foreground"
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-card-foreground">
                  Where do you want us to market your services? *
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {marketingOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.marketingServices.includes(option)}
                        onCheckedChange={(checked) => 
                          handleMarketingServiceChange(option, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={option} 
                        className="text-sm font-normal text-card-foreground capitalize cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.marketingServices && (
                  <p className="text-sm text-destructive">{errors.marketingServices}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-border text-foreground hover:bg-accent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Creating...' : 'Create Deal'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDeal;