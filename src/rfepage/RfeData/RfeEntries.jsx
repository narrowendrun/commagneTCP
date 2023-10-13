import { useState } from "react";
export default function RfeRow({ item, onRowClick }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
    onRowClick(item);
  };

  return (
    <div
      className={`row rfeTable rfeEntryRow ${
        expanded ? "expanded" : "collapsed"
      }`}
      onClick={toggleExpand}
      style={{ cursor: "pointer" }}
    >
      <div className="rfeEntries col-1">
        {item.type}
        {item.id}
      </div>
      <div className="rfeEntries col-1">{item.date}</div>
      <div className="rfeEntries col-2">{item.name}</div>
      <div
        className="rfeEntries col-3"
        style={{
          textAlign: "left",
          whiteSpace: expanded ? "pre-wrap" : "nowrap",
          overflow: expanded ? "auto" : "hidden",
          textOverflow: expanded ? "unset" : "ellipsis",
        }}
      >
        {item.comments}
      </div>
      <div className="rfeEntries col-2">{item.status}</div>
      <div className="rfeEntries col-2">{item.worker}</div>
    </div>
  );
}
