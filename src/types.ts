export interface AccountAddress {
  city: string;
  postal_code: string;
  state: string;
  street_line_1: string;
  street_line_2: string;
}

export interface Account {
  account_number: string;
  account_type: string;
  address: AccountAddress;
  available_balance: string;
  bank_id: string;
  business_ids: string[];
  created_at: string;
  currency: string;
  current_balance: string;
  funded: boolean;
  id: string;
  lock: object | null;
  locked: boolean;
  name: string;
  nickname: string;
  org_id: string;
  person_ids: string[];
  primary_person_id: string;
  routing_number: string;
  status: string;
  updated_at: string;
}

export interface Transaction {
  ach_id: string | null;
  amount: string;
  balance: string;
  billpay_payment_id: string | null;
  book_id: string | null;
  card_id: string | null;
  category: string | null;
  check_id: string | null;
  check_number: string | null;
  date: string;
  desc: string;
  extended_timestamp: string;
  extended_timestamp_precise: string;
  fednow_id: string | null;
  fingerprint: string;
  id: string;
  incoming_ach_id: string | null;
  incoming_wire_id: string | null;
  issued_check_id: string | null;
  network_transfer_id: string | null;
  related_transfer_ids: string[];
  summary: string;
  trace_id: string | null;
  type: string;
  type_source: string | null;
  userdata: object | null;
  wire: string | null;
  wire_id: string | null;
}

export interface TransactionsResponse {
  data: Transaction[];
}
