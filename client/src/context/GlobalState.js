import React, { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });

      // Set loading to false after data is fetched
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response?.data?.error || "An error occurred",
      });
      
      // Set loading to false even on error
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response?.data?.error || "An error occurred",
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        },
    }

    try {
      const res = await axios.post("/api/v1/transactions", transaction,config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response?.data?.error || "An error occurred",
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
