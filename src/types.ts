/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn';

export interface Service {
  id: string;
  name: Record<Language, string>;
  category: string;
  description: Record<Language, string>;
  processingTime: Record<Language, string>;
  fee: Record<Language, string>;
  requiredDocs: string[];
  link: string;
}

export interface Scheme {
  id: string;
  name: Record<Language, string>;
  ministry: Record<Language, string>;
  benefits: Record<Language, string>;
  eligibility: {
    minAge?: number;
    maxAge?: number;
    incomeLimit?: number;
    gender?: 'All' | 'Female' | 'Male';
    occupation?: string[];
  };
  description: Record<Language, string>;
  documentsRequired: string[];
}

export interface CivicIssue {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  reportedAt: string;
  status: 'Submitted' | 'In Progress' | 'Assigned' | 'Resolved';
  upvotes: number;
  hasUpvoted?: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
