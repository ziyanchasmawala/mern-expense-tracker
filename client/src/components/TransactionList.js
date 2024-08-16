import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]); // Add getTransactions to the dependency array to avoid lint warnings
  
  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} /> // Ensure the key matches the identifier
          ))
        ) : (
          <li>No transactions found</li> // Handle empty state
        )}
      </ul>
    </>
  );
};

export default TransactionList;
