import { Deal, CreateDealInput } from '../types/deal';

// Dummy data
const initialDeals: Deal[] = [
  {
    id: '1',
    clientName: 'أحمد محمد الأحمد',
    contactEmail: 'ahmed.mohammed@company.com',
    contactPhone: '+966-555-0123',
    iban: 'GB29 NWBK 6016 1331 9268 19',
    crNumber: 'CR1023456789',
    paymentNotes: 'Net 30 payment terms',
    dealAmount: 125000,
    stage: 'Financial Department',
    dealDescription: 'Enterprise software licensing and implementation services',
    marketingServices: ['hungerstation', 'the chefz'],
    createdDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    clientName: 'فاطمة علي السالم',
    contactEmail: 'fatima.ali@techstart.io',
    contactPhone: '+971-555-0456',
    iban: 'US12 3456 7890 1234 5678 90',
    crNumber: 'CR2087654321',
    paymentNotes: 'Payment on delivery',
    dealAmount: 75000,
    stage: 'Technical Department',
    dealDescription: 'Custom web application development and maintenance',
    marketingServices: ['keeta', 'marsool'],
    createdDate: new Date('2024-02-01'),
  },
  {
    id: '3',
    clientName: 'خالد عبدالله المنصور',
    contactEmail: 'khalid.abdullah@innovations.com',
    contactPhone: '+965-20-7946-0958',
    iban: 'GB82 WEST 1234 5698 7654 32',
    crNumber: 'CR3045678912',
    paymentNotes: 'Milestone-based payments',
    dealAmount: 200000,
    stage: 'Finished',
    dealDescription: 'Digital transformation consulting and cloud migration',
    marketingServices: ['hungerstation', 'keeta', 'marsool'],
    createdDate: new Date('2023-12-10'),
  },
  {
    id: '4',
    clientName: 'مريم حسن البلوشي',
    contactEmail: 'mariam.hassan@startuphub.com',
    contactPhone: '+968-555-0789',
    iban: 'US98 7654 3210 9876 5432 10',
    crNumber: 'CR4098765432',
    paymentNotes: 'Quarterly payments',
    dealAmount: 50000,
    stage: 'Financial Department',
    dealDescription: 'MVP development and technical consulting',
    marketingServices: ['the chefz'],
    createdDate: new Date('2024-02-20'),
  },
  {
    id: '5',
    clientName: 'أحمد محمد الأحمد',
    contactEmail: 'ahmed.mohammed@company.com',
    contactPhone: '+966-555-0123',
    iban: 'GB29 NWBK 6016 1331 9268 19',
    crNumber: 'CR1023456789',
    paymentNotes: 'Net 15 payment terms',
    dealAmount: 85000,
    stage: 'Technical Department',
    dealDescription: 'Mobile application development and API integration',
    marketingServices: ['hungerstation', 'marsool'],
    createdDate: new Date('2024-03-01'),
  },
];

class DealStore {
  private deals: Deal[] = [...initialDeals];

  getDeals(): Deal[] {
    return [...this.deals];
  }

  getDealById(id: string): Deal | undefined {
    return this.deals.find(deal => deal.id === id);
  }

  createDeal(dealInput: CreateDealInput): Deal {
    const newDeal: Deal = {
      ...dealInput,
      id: Math.random().toString(36).substr(2, 9),
      createdDate: new Date(),
    };
    
    this.deals.push(newDeal);
    return newDeal;
  }

  updateDealStage(id: string, stage: Deal['stage']): boolean {
    const dealIndex = this.deals.findIndex(deal => deal.id === id);
    if (dealIndex !== -1) {
      this.deals[dealIndex].stage = stage;
      return true;
    }
    return false;
  }

  getClientDeals(clientName: string): Deal[] {
    return this.deals.filter(deal => deal.clientName === clientName);
  }

  getAllClients(): { name: string; totalDeals: number; totalAmount: number }[] {
    const clientMap = new Map<string, { totalDeals: number; totalAmount: number }>();
    
    this.deals.forEach(deal => {
      const existing = clientMap.get(deal.clientName) || { totalDeals: 0, totalAmount: 0 };
      clientMap.set(deal.clientName, {
        totalDeals: existing.totalDeals + 1,
        totalAmount: existing.totalAmount + deal.dealAmount
      });
    });

    return Array.from(clientMap.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  }
}

export const dealStore = new DealStore();