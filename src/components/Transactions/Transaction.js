import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  deleteTransactions,
  editActive,
} from "../../features/transaction/transactionSlice";

export default function Transaction({ transaction }) {
  const dispatch = useDispatch();
  const handelEdit = () => {
    dispatch(editActive(transaction));
  };

  const handelDelete = (id) => {
    dispatch(deleteTransactions(id));
  };
  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {transaction.amount}</p>
        <button onClick={handelEdit} className="link">
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button onClick={()=>handelDelete(transaction.id)} className="link">
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
