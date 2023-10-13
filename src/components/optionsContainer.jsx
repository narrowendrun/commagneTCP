import VerboseSlider from "./options/verboseSlider";
import Timestamp from "./options/timestamp";
import SwitchButton from "./options/switchButton";
import PacketCount from "./options/packetCount";
import CheckBox from "./options/Checkbox";
import { useState, useEffect } from "react";
export default function OptionsContainer() {
  const [button, setButton] = useState(() => {
    if (
      localStorage.getItem("OPTIONSexpand") == "true" ||
      localStorage.getItem("OPTIONSexpand") == null
    ) {
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    if (!button) {
      document.getElementById("optionsContent").style.display = "none";
    } else {
      document.getElementById("optionsContent").style.display = "inline";
    }
    localStorage.setItem("OPTIONSexpand", button);
  }, [button]);
  return (
    <>
      <div id="optionsContainer" className="container OPandF">
        <h2
          onClick={() => setButton(!button)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          Options
        </h2>

        <div
          id="optionsContent"
          className="container"
          style={{ trasnition: "0.8s all ease" }}
        >
          <br />
          <div className="row row-main">
            <div className="col-5">
              <VerboseSlider />
            </div>
            <div className="col">
              <Timestamp />
            </div>
          </div>
          <div className="row row-main">
            <div className="col">
              <CheckBox
                title={"resolve names?"}
                flagOption={["host", "service"]}
                filename={["HOST", "SERVICE"]}
                disableCondition={true}
                defaultValue={"false"}
                flagLogic={"HOSTandSERVICE"}
              />
            </div>
            <div className="col">
              <SwitchButton
                option={"printMAC"}
                filename={"MAC"}
                span={"bashMAC"}
                flag={"e"}
                title={"print MAC address?"}
              />
            </div>
            <div className="col">
              <SwitchButton
                option={"quickDisplay"}
                filename={"QUICK"}
                span={"bashQUICK"}
                flag={"q"}
                title={"enable quick display?"}
              />
            </div>
          </div>
          <div className="row row-main">
            <div className="col-5">
              <PacketCount />
            </div>
            <div className="col-4">
              <CheckBox
                title={"flow direction?"}
                flagOption={["in", "out"]}
                filename={["INFLOW", "OUTFLOW"]}
                disableCondition={false}
                defaultValue={"true"}
                flagLogic={"FLOW"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
