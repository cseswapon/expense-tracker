import { useSelector } from "react-redux";
import numberWithCommas from "../../utils/thusandSeperator";

export default function Balance() {
  const allTransaction =
    useSelector((state) => state.transaction.transaction) || [];
  const totalCost = allTransaction.reduce(
    (previous, current) => {
      if (current.type === "income") {
        previous.income += current.amount;
      }
      if (current.type === "expense") {
        previous.expense += current.amount;
      }
      return previous;
    },
    { income: 0, expense: 0 }
  );
  // console.log(totalCost);
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{numberWithCommas(totalCost.income - totalCost.expense)}</span>
      </h3>
    </div>
  );
}
