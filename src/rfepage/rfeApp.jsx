import imgUrl from "../images/mentat.png";
import RfeContent from "./RfeContent";

function formAppear() {
  document.getElementById("RFEform").style.top = "10%";
}

export default function RfePage() {
  return (
    <>
      <br />
      {/* link to commagene page */}
      <div className="wrapper">
        <a href="/tcpdump/" target="_blank" rel="noopener noreferrer">
          <img
            src={imgUrl}
            alt="mentat to reedirect to main page"
            style={{ width: "5vw" }}
          />
        </a>
      </div>

      <br />

      {/* RFE CONTAINER */}
      <div id="rfeContainer" className="OPandF">
        {/* TITLE AND add item BUTTON */}
        <div>
          <h3>RFE / report bug</h3>
          <button
            id="addRFE"
            className="btn btn-light"
            onClick={() => formAppear()}
          >
            add item
          </button>
        </div>

        <br />
        <br />
        {/* RFE DATA */}
        <RfeContent />
      </div>

      <br />
      <br />

      {/* link to commagene page */}
      <center>
        <div className="wrapperEnd">
          <a href="/tcpdump/" target="_blank" rel="noopener noreferrer">
            <img src={imgUrl} alt="" style={{ width: "auto" }} />
          </a>
        </div>
      </center>
    </>
  );
}
