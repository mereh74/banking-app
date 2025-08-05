import styled from "styled-components";
import type { Transaction } from "../../types";

const TransactionItemContainer = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  margin: 8px 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }
  }
`;

const TransactionMainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TransactionDetails = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? "300px" : "0")};
  opacity: ${({ $isExpanded }) => ($isExpanded ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
  padding-top: ${({ $isExpanded }) => ($isExpanded ? "16px" : "0")};
  border-top: ${({ $isExpanded }) =>
    $isExpanded ? "1px solid #e5e7eb" : "none"};

  @media (prefers-color-scheme: dark) {
    border-top-color: ${({ $isExpanded }) =>
      $isExpanded ? "#374151" : "transparent"};
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? "180deg" : "0deg")});
  margin-left: 8px;
  font-size: 12px;
`;

const TransactionLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TransactionTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

const TransactionDate = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const TransactionType = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ $type }) => {
    switch ($type.toLowerCase()) {
      case "deposit":
        return "#d1fae5";
      case "withdrawal":
        return "#fee2e2";
      default:
        return "#dbeafe";
    }
  }};
  color: ${({ $type }) => {
    switch ($type.toLowerCase()) {
      case "deposit":
        return "#065f46";
      case "withdrawal":
        return "#991b1b";
      default:
        return "#1e40af";
    }
  }};
`;

const TransactionAmount = styled.p<{ $isPositive: boolean }>`
  font-weight: 700;
  font-size: 18px;
  color: ${({ $isPositive }) => ($isPositive ? "#059669" : "#dc2626")};
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

interface TransactionItemProps {
  transaction: Transaction;
  isExpanded: boolean;
  onToggle: (transactionId: string) => void;
}

export default function TransactionItem({
  transaction,
  isExpanded,
  onToggle,
}: TransactionItemProps): React.ReactElement {
  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(num));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPositive = transaction.type.toLowerCase() === "deposit";

  const handleClick = () => {
    onToggle(transaction.id);
  };

  return (
    <TransactionItemContainer $isExpanded={isExpanded} onClick={handleClick}>
      <TransactionMainContent>
        <TransactionLeft>
          <TransactionTitle>
            {transaction.summary || transaction.desc}
            <ExpandIcon $isExpanded={isExpanded}>▼</ExpandIcon>
          </TransactionTitle>
          <TransactionDate>{formatDate(transaction.date)}</TransactionDate>
          <TransactionType $type={transaction.type}>
            {transaction.type}
          </TransactionType>
        </TransactionLeft>
        <div>
          <TransactionAmount $isPositive={isPositive}>
            {isPositive ? "+" : "-"}
            {formatAmount(transaction.amount)}
          </TransactionAmount>
        </div>
      </TransactionMainContent>

      <TransactionDetails $isExpanded={isExpanded}>
        <DetailsGrid>
          <DetailItem>
            <DetailLabel>Transaction ID</DetailLabel>
            <DetailValue>{transaction.id}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date & Time</DetailLabel>
            <DetailValue>
              {formatDateTime(transaction.extended_timestamp)}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Balance After</DetailLabel>
            <DetailValue>{formatAmount(transaction.balance)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Fingerprint</DetailLabel>
            <DetailValue>{transaction.fingerprint}</DetailValue>
          </DetailItem>
          {transaction.ach_id && (
            <DetailItem>
              <DetailLabel>ACH ID</DetailLabel>
              <DetailValue>{transaction.ach_id}</DetailValue>
            </DetailItem>
          )}
          {transaction.wire_id && (
            <DetailItem>
              <DetailLabel>Wire ID</DetailLabel>
              <DetailValue>{transaction.wire_id}</DetailValue>
            </DetailItem>
          )}
          {transaction.check_number && (
            <DetailItem>
              <DetailLabel>Check Number</DetailLabel>
              <DetailValue>{transaction.check_number}</DetailValue>
            </DetailItem>
          )}
          {transaction.category && (
            <DetailItem>
              <DetailLabel>Category</DetailLabel>
              <DetailValue>{transaction.category}</DetailValue>
            </DetailItem>
          )}
        </DetailsGrid>
      </TransactionDetails>
    </TransactionItemContainer>
  );
}
