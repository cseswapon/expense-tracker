import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransactions,
  editInActive,
  editTransactions,
} from "../../features/transaction/transactionSlice";

export default function Form() {
  const [state, setState] = useState({
    name: "",
    type: "income",
    amount: "",
    editMode: false,
  });
  const { isError, isLoading, error, editing } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  const handelCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransactions({
        name: state.name,
        type: state.type,
        amount: Number(state.amount),
      })
    );
    reset();
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editTransactions({
        id: editing?.id,
        data: {
          name: state?.name,
          amount: Number(state?.amount),
          type: state?.type,
        },
      })
    );
    state.editMode = false;
    reset();
  };

  const reset = () => {
    setState({
      ...state,
      name: "",
      type: "income",
      amount: "",
    });
  };

  useEffect(() => {
    // console.log(editing.id, state);
    if (editing.id) {
      setState({
        name: editing.name,
        type: editing.type,
        amount: editing.amount,
        editMode: true,
      });
    } else {
      state.editMode = false;
      reset();
    }
  }, [editing]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={state.editMode ? handelUpdate : handelCreate}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="transaction_name"
            placeholder="Enter Your Name"
            value={state.name}
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              name="transaction_type"
              checked={state.type === "income"}
              onChange={() => setState({ ...state, type: "income" })}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              name="transaction_type"
              placeholder="Expense"
              checked={state.type === "expense"}
              onChange={() => setState({ ...state, type: "expense" })}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            value={state.amount}
            name="transaction_amount"
            onChange={(e) =>
              setState((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {!state.editMode ? "Add Transaction" : "Update Transaction"}
        </button>

        {isError && <div className="error">Some Went Wrong {error}</div>}
      </form>
      {state.editMode && (
        <button
          onClick={() => {
            setState(() => ({
              name: "",
              amount: "",
              type: "income",
              editMode: false,
            }));
            dispatch(editInActive());
          }}
          className="btn cancel_edit"
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
}
