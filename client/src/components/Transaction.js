import React, { useContext } from "react";
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import PropTypes from 'prop-types'; // Import PropTypes

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} 
      <span>{sign}Rs.{numberWithCommas(Math.abs(transaction.amount))}</span>
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>
  );
};

// Add PropTypes validation
Transaction.propTypes = {
  transaction: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired
};

export default Transaction;
