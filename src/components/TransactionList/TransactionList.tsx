import styled from "styled-components";
import { useState } from "react";
import { useBankAccount } from "../../contexts/BankAccountContext/BankAccountContext";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import TransactionItem from "../TransactionItem/TransactionItem";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;

  @media (prefers-color-scheme: dark) {
    background: #0f172a;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const AccountHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const AccountTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const AccountSubtitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 16px 0;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AccountDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const AccountDetail = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

const AccountDetailLabel = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 4px 0;
`;

const AccountDetailValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const TransactionsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  @media (prefers-color-scheme: dark) {
    background: #1e293b;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const TransactionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #334155;
  }
`;

const TransactionsTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f1f5f9;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const TransactionsCount = styled.span`
  background: #e2e8f0;
  color: #475569;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;

  @media (prefers-color-scheme: dark) {
    background: #334155;
    color: #cbd5e1;
  }
`;

const TransactionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoTransactions = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const NoTransactionsIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const NoTransactionsText = styled.p`
  font-size: 16px;
  margin: 0;
`;

export default function TransactionList(): React.ReactElement {
  const { account, transactions, isLoading, error } = useBankAccount();
  const [expandedTransactionId, setExpandedTransactionId] = useState<
    string | null
  >(null);

  if (isLoading) return <LoadingSpinner />;

  const handleTransactionToggle = (transactionId: string) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  const formatBalance = (balance: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(balance));
  };

  const formatAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };

  return (
    <Container>
      {error && <ErrorMessage message={error} />}

      <AccountHeader>
        <AccountTitle>Hello, {account?.name || "User"}!</AccountTitle>
        <AccountSubtitle>
          {account?.nickname || "Treasury Prime"} Account
        </AccountSubtitle>

        <AccountDetails>
          <AccountDetail>
            <AccountDetailLabel>Account Number</AccountDetailLabel>
            <AccountDetailValue>
              {account?.account_number
                ? formatAccountNumber(account.account_number)
                : "N/A"}
            </AccountDetailValue>
          </AccountDetail>

          <AccountDetail>
            <AccountDetailLabel>Current Balance</AccountDetailLabel>
            <AccountDetailValue>
              {account?.current_balance
                ? formatBalance(account.current_balance)
                : "N/A"}
            </AccountDetailValue>
          </AccountDetail>

          <AccountDetail>
            <AccountDetailLabel>Available Balance</AccountDetailLabel>
            <AccountDetailValue>
              {account?.available_balance
                ? formatBalance(account.available_balance)
                : "N/A"}
            </AccountDetailValue>
          </AccountDetail>

          <AccountDetail>
            <AccountDetailLabel>Opened</AccountDetailLabel>
            <AccountDetailValue>
              {account?.created_at
                ? new Date(account.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </AccountDetailValue>
          </AccountDetail>
        </AccountDetails>
      </AccountHeader>

      <TransactionsSection>
        <TransactionsHeader>
          <TransactionsTitle>Recent Transactions</TransactionsTitle>
          <TransactionsCount>
            {transactions?.length || 0} transactions
          </TransactionsCount>
        </TransactionsHeader>

        {transactions && transactions.length > 0 ? (
          <TransactionsList>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <TransactionItem
                  transaction={transaction}
                  isExpanded={expandedTransactionId === transaction.id}
                  onToggle={handleTransactionToggle}
                />
              </li>
            ))}
          </TransactionsList>
        ) : (
          <NoTransactions>
            <NoTransactionsIcon>📊</NoTransactionsIcon>
            <NoTransactionsText>No transactions found</NoTransactionsText>
          </NoTransactions>
        )}
      </TransactionsSection>
    </Container>
  );
}
