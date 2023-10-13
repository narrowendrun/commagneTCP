import { useEffect } from "react";
import { useState } from "react";
import AddRfe from "./RfeOperations/AddRfe";
import EditRfe from "./RfeOperations/EditRfe";
import RfeTable from "./RfeData/RfeTable";

export default function RfeContent() {
  const [rfeTable, setRfeTable] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };
  useEffect(() => {
    fetch("/commagenetcp/isnarendran")
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.display === "True");
      })
      .catch((err) => console.log(err));

    fetch("/commagenetcp/rfe")
      .then((res) => res.json())
      .then((data) => {
        setRfeTable(data);
        console.log("pulled rfe records");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <AddRfe />
      <RfeTable rfeTable={rfeTable} onRowClick={handleRowClick} />

      <br />
      {
        <center>
          <p>{rfeTable.length} requests opened</p>
        </center>
      }
      <br />
      {admin && <EditRfe data={selectedRowData} />}
    </>
  );
}
