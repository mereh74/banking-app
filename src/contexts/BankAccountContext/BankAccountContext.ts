import { createContext, useContext } from "react";
import type { Account, Transaction } from "../../types";

interface BankAccountContextType {
  account: Account | undefined;
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  error: string;
}

const BankAccountContext = createContext<BankAccountContextType | undefined>(
  undefined
);

function useBankAccount() {
  const context = useContext(BankAccountContext);
  if (context === undefined)
    throw new Error(
      "BankAccountContext was used outside the BankAccountProvider"
    );
  return context;
}

export { useBankAccount, BankAccountContext };
export type { BankAccountContextType };
