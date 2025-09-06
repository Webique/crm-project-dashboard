export type DealStage = 'Sales Department' | 'Technical Department' | 'Finished';

export interface Deal {
  id: string;
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  iban: string;
  crNumber: string;
  paymentNotes: string;
  dealAmount: number;
  stage: DealStage;
  dealDescription: string;
  marketingServices: string[];
  createdDate: Date;
}

export interface CreateDealInput {
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  iban: string;
  crNumber: string;
  paymentNotes: string;
  dealAmount: number;
  stage: DealStage;
  dealDescription: string;
  marketingServices: string[];
}