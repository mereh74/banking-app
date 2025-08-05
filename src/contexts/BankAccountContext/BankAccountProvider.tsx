import React, { useState, useEffect } from "react";
import { BankAccountContext } from "./BankAccountContext";
import type { Account, Transaction } from "../../types";

const ACCOUNT_NUMBER = "acct_11m856tf1d13wn5";
const ACCOUNT_URL = `/api/account/${ACCOUNT_NUMBER}`;

function BankAccountProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        setIsLoading(true);
        console.log("Fetching account from:", ACCOUNT_URL);

        const response = await fetch(`${ACCOUNT_URL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Account data:", data);
        setAccount(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unknown error occurred while fetching the account";
        setError(errorMessage);
        console.error("Account fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAccount();
  }, []);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        const response = await fetch(`${ACCOUNT_URL}/transaction`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTransactions(data.data || data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "An unknown error occurred while fetching the transactions"
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <BankAccountContext.Provider
      value={{ account, transactions, isLoading, error }}
    >
      {children}
    </BankAccountContext.Provider>
  );
}

export { BankAccountProvider };
