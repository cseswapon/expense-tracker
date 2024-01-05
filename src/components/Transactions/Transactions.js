import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../features/transaction/transactionSlice";

export default function Transactions() {
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(fetchTransactions())
  },[dispatch])
  const { isError, isLoading, error, transaction } = useSelector(
    (state) => state.transaction
  );
  let content = null;
  if (isError) content = <p>Something went wrong {error.message}</p>;
  if (isLoading) content = <p>Loading...</p>;
  if (transaction?.length === 0) content = <p>No transaction found...</p>;
  if (transaction?.length > 0 && !isError && !error) {
    content = transaction?.map((t) => <Transaction key={t?.id} transaction={t} />);
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
