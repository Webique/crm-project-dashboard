import { Deal, CreateDealInput } from '../types/deal';

// Dummy data
const initialDeals: Deal[] = [
  {
    id: '1',
    clientName: 'Acme Corporation',
    contactEmail: 'john.doe@acme.com',
    contactPhone: '+1-555-0123',
    iban: 'GB29 NWBK 6016 1331 9268 19',
    paymentNotes: 'Net 30 payment terms',
    dealAmount: 125000,
    stage: 'Financial',
    dealDescription: 'Enterprise software licensing and implementation services',
    createdDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    clientName: 'TechStart Solutions',
    contactEmail: 'sarah.wilson@techstart.io',
    contactPhone: '+1-555-0456',
    iban: 'US12 3456 7890 1234 5678 90',
    paymentNotes: 'Payment on delivery',
    dealAmount: 75000,
    stage: 'Technical Department',
    dealDescription: 'Custom web application development and maintenance',
    createdDate: new Date('2024-02-01'),
  },
  {
    id: '3',
    clientName: 'Global Innovations Ltd',
    contactEmail: 'mike.chen@globalinnovations.com',
    contactPhone: '+44-20-7946-0958',
    iban: 'GB82 WEST 1234 5698 7654 32',
    paymentNotes: 'Milestone-based payments',
    dealAmount: 200000,
    stage: 'Finished',
    dealDescription: 'Digital transformation consulting and cloud migration',
    createdDate: new Date('2023-12-10'),
  },
  {
    id: '4',
    clientName: 'StartupHub Inc',
    contactEmail: 'alex.rodriguez@startuphub.com',
    contactPhone: '+1-555-0789',
    iban: 'US98 7654 3210 9876 5432 10',
    paymentNotes: 'Quarterly payments',
    dealAmount: 50000,
    stage: 'Financial',
    dealDescription: 'MVP development and technical consulting',
    createdDate: new Date('2024-02-20'),
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
}

export const dealStore = new DealStore();