export type DealStage = 'Financial Department' | 'Technical Department' | 'Finished';

export interface Deal {
  id: string;
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  iban: string;
  paymentNotes: string;
  dealAmount: number;
  stage: DealStage;
  dealDescription: string;
  createdDate: Date;
}

export interface CreateDealInput {
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  iban: string;
  paymentNotes: string;
  dealAmount: number;
  stage: DealStage;
  dealDescription: string;
}