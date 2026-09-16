export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  kycStatus: 'Verified' | 'Pending' | 'Action Required';
  customerSince: string;
  preferredBranch: string;
  relationshipManager: string;
  securityRating: string;
  lastLogin: string;
  activeDevicesCount: number;
}

export interface Account {
  id: string;
  accountNumber: string; // Masked e.g. "•••• •••• 4821"
  rawAccountNumber: string;
  type: 'Checking' | 'Savings' | 'Fixed Deposit' | 'Wealth Management';
  name: string;
  balance: number;
  availableBalance: number;
  currency: string; // "INR"
  status: 'Active' | 'Dormant' | 'Restricted';
  interestRate?: string;
  ifscCode: string;
}

export interface Transaction {
  id: string;
  date: string; // ISO or formatted date
  time: string;
  merchant: string;
  category: 'Shopping' | 'Utilities' | 'Salary' | 'Transfer' | 'Dining' | 'Entertainment' | 'Investment' | 'Subscriptions';
  amount: number;
  type: 'debit' | 'credit';
  status: 'Completed' | 'Pending' | 'Failed' | 'Flagged';
  account: string;
  senderRecipient: string;
  referenceNumber: string;
  paymentMethod: string;
  location: string;
  notes?: string;
}

export interface Card {
  id: string;
  cardNumber: string; // "•••• •••• •••• 8842"
  cardHolder: string;
  expiry: string;
  cvv: string;
  type: 'Visa Infinite' | 'Mastercard World' | 'RuPay Select';
  cardCategory: 'Credit' | 'Debit';
  status: 'Active' | 'Locked' | 'Blocked';
  monthlyLimit: number;
  spentThisMonth: number;
  currency: string;
  colorTheme: 'dark-gold' | 'silver-slate' | 'deep-emerald';
}

export interface Statement {
  id: string;
  period: string;
  year: number;
  month: string;
  accountName: string;
  accountNumber: string;
  statementDate: string;
  fileSize: string;
  status: 'Available' | 'Processing';
  closingBalance: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  createdAt: string;
  status: 'Open' | 'Resolved' | 'In Progress';
  priority: 'High' | 'Medium' | 'Low';
  lastResponse: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface InternalService {
  name: string;
  id: string;
  status: 'HEALTHY' | 'DEGRADED' | 'MAINTENANCE' | 'CRITICAL';
  version: string;
  endpoint: string;
  lastHeartbeat: string;
  environment: 'production-primary' | 'production-dr';
  latencyMs: number;
  uptimePercentage: string;
}

export interface SystemDebugInfo {
  applicationStatus: string;
  serverHealth: string;
  databaseStatus: string;
  redisCluster: string;
  vaultVersion: string;
  activeSessions: number;
  environment: string;
  uptime: string;
  cpuUsage: string;
  memoryUsage: string;
  logsPreview: Array<{
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
    module: string;
    message: string;
  }>;
}
