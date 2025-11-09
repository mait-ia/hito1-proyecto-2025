export type InterviewStatus = 'INIT';

export interface InterviewEntity {
  id: string;
  advisorId: string;
  createdAt: Date;
  status: InterviewStatus;
}

