export default function ({ onclick, text, isActive }) {
  const style = {
    background: isActive ? "blue" : "white",
    color: isActive ? "white" : "blue",
  };
  return (
    <>
      <button
        onClick={onclick}
        className="filterButton btn"
        id={`${text}button`}
        style={style}
      >
        {text}
      </button>
    </>
  );
}
