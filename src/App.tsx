import "./App.css";
import { BankAccountProvider } from "./contexts/BankAccountContext/BankAccountProvider";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
  return (
    <>
      <BankAccountProvider>
        <TransactionList />
      </BankAccountProvider>
    </>
  );
}

export default App;
