import RfeHeaders from "./RfeHeaders";
import RfeRow from "./RfeEntries";
export default function RfeTable({ rfeTable, onRowClick }) {
  return (
    <>
      <div className="container">
        <RfeHeaders />
        <br />
        {rfeTable.length === 0 && (
          <center>
            <p>empty</p>
          </center>
        )}
        {rfeTable.map((item) => (
          <RfeRow key={item.id} item={item} onRowClick={onRowClick} />
        ))}
      </div>
    </>
  );
}
