import { useState, useEffect, useRef } from "react";
import PPbutton from "./PPbutton";
import ParamInput from "./ParamInput";
import { applyLogic } from "./ParamApplyLogic";

export default function ParamButton({ dispatch }) {
  const [state, setState] = useState({
    VLAN: true,
    MAC: true,
    VXLAN: true,
  });
  const [textVal, setTextVal] = useState({
    VLAN: "",
    srcMAC: "",
    dstMAC: "",
    innerSrcMAC: "",
    innerDstMAC: "",
    innerSrcIP: "",
    innerDstIP: "",
    VNI: "",
  });
  const prevtextValRef = useRef(textVal);
  const [commandText, setCommandText] = useState({
    VLAN: "",
    srcMAC: "",
    dstMAC: "",
    VXLAN: "port 4789 and udp[8:2] = 0x0800",
    innerSrcMAC: "",
    innerDstMAC: "",
    innerSrcIP: "",
    innerDstIP: "",
    VNI: "",
  });
  const _setTextVal = (field, value) => {
    let temp = textVal[field];
    setTextVal((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };
  const _setCommandText = (field, value) => {
    setCommandText((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };
  const _setState = (button) => {
    let temp = state[button];
    setState((prevState) => ({
      ...prevState,
      [button]: !temp,
    }));
    console.log(state[button]);
  };

  useEffect(() => {
    if (state.VLAN) {
      dispatch({ type: "DELETE", payload: commandText.VLAN });
      _setTextVal("VLAN", "");
    }
  }, [state.VLAN]);
  useEffect(() => {
    if (state.MAC) {
      dispatch({ type: "DELETE", payload: commandText.srcMAC });
      dispatch({ type: "DELETE", payload: commandText.dstMAC });
      _setTextVal("srcMAC", "");
      _setTextVal("dstMAC", "");
    }
  }, [state.MAC]);

  useEffect(() => {
    let temp =
      "'" +
      commandText.VXLAN +
      commandText.innerSrcMAC +
      commandText.innerDstMAC +
      commandText.innerSrcIP +
      commandText.innerDstIP +
      commandText.VNI +
      "'";
    if (state.VXLAN) {
      dispatch({ type: "DELETE", payload: temp });

      _setTextVal("innerSrcMAC", "");
      _setTextVal("innerDstMAC", "");
      _setTextVal("innerSrcIP", "");
      _setTextVal("innerDstIP", "");
      _setTextVal("VNI", "");
      _setCommandText("innerSrcMAC", "");
      _setCommandText("innerDstMAC", "");
      _setCommandText("innerSrcIP", "");
      _setCommandText("innerDstIP", "");
      _setCommandText("VNI", "");
    } else if (!state.VXLAN) {
      dispatch({ type: "PARAMETRE", payload: temp });
    }
  }, [state.VXLAN]);

  useEffect(() => {
    // Get the previous dataObject value using the ref
    const prevtextVal = prevtextValRef.current;

    // Iterate through the keys of the current dataObject
    Object.keys(textVal).forEach((key) => {
      const currentValue = textVal[key];
      const prevValue = prevtextVal[key];

      // Check if the value for this key has changed
      if (currentValue !== prevValue) {
        if (key == "srcMAC" || key == "dstMAC") {
          dispatch({ type: "DELETE", payload: commandText.srcMAC });
          dispatch({ type: "DELETE", payload: commandText.dstMAC });
        } else if (key.includes("inner") || key == "VNI") {
          let temp =
            "'" +
            commandText.VXLAN +
            commandText.innerSrcMAC +
            commandText.innerDstMAC +
            commandText.innerSrcIP +
            commandText.innerDstIP +
            commandText.VNI +
            "'";
          dispatch({ type: "DELETE", payload: temp });
        } else {
          dispatch({ type: "DELETE", payload: commandText[key] });
        }
        let temp_command = applyLogic(textVal, key, textVal[key]);
        if (typeof temp_command == "object") {
          _setCommandText("srcMAC", temp_command[0]);
          _setCommandText("dstMAC", temp_command[1]);
        } else {
          _setCommandText(key, temp_command);
        }
      }
    });

    // Update the previous dataObject ref with the current value
    prevtextValRef.current = textVal;
  }, [textVal]); // dataObject is the dependency array

  function _dispatch(field, e) {
    if (e.key == "Enter") {
      if (field == "srcMAC" || field == "dstMAC") {
        dispatch({ type: "DELETE", payload: commandText.srcMAC });
        dispatch({ type: "DELETE", payload: commandText.dstMAC });
        if (commandText.srcMAC == "") {
          dispatch({ type: "PARAMETRE", payload: commandText.dstMAC });
        } else if (commandText.dstMAC == "") {
          dispatch({ type: "PARAMETRE", payload: commandText.srcMAC });
        } else {
          dispatch({ type: "PARAMETRE", payload: commandText.srcMAC });
          dispatch({ type: "PARAMETRE", payload: commandText.dstMAC });
        }
      } else if (field.includes("inner") || field == "VNI") {
        let temp =
          "'" +
          commandText.VXLAN +
          commandText.innerSrcMAC +
          commandText.innerDstMAC +
          commandText.innerSrcIP +
          commandText.innerDstIP +
          commandText.VNI +
          "'";
        dispatch({ type: "DELETE", payload: temp });
        dispatch({ type: "PARAMETRE", payload: temp });
      } else {
        dispatch({ type: "DELETE", payload: commandText[field] });
        dispatch({ type: "PARAMETRE", payload: commandText[field] });
      }
    }
  }

  return (
    <>
      <PPbutton
        onclick={() => _setState("VLAN")}
        text="VLAN"
        isActive={state.VLAN}
      />
      <PPbutton
        onclick={() => _setState("MAC")}
        text="MAC"
        isActive={state.MAC}
      />
      <PPbutton
        onclick={() => _setState("VXLAN")}
        text="VXLAN"
        isActive={state.VXLAN}
      />
      {!state.VLAN && (
        <ParamInput
          shoulddiv="true"
          id="VLAN"
          title="Enter VLAN"
          value={textVal.VLAN}
          onchange={(e) => _setTextVal("VLAN", e.target.value)}
          onkeydown={(e) => _dispatch("VLAN", e)}
        />
      )}
      {!state.MAC && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <ParamInput
                id="srcMAC"
                title="src MAC"
                value={textVal.srcMAC}
                onchange={(e) => _setTextVal("srcMAC", e.target.value)}
                onkeydown={(e) => _dispatch("srcMAC", e)}
              />
            </div>

            <div className="col">
              <ParamInput
                id="dstMAC"
                title="dst MAC"
                value={textVal.dstMAC}
                onchange={(e) => _setTextVal("dstMAC", e.target.value)}
                onkeydown={(e) => _dispatch("dstMAC", e)}
              />
            </div>
          </div>
        </div>
      )}
      {!state.VXLAN && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <label>inner src MAC</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerSrcMAC}
                onChange={(e) => _setTextVal("innerSrcMAC", e.target.value)}
                onKeyDown={(e) => _dispatch("innerSrcMAC", e)}
              />
            </div>

            <div className="col">
              <label>inner dst MAC</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerDstMAC}
                onChange={(e) => _setTextVal("innerDstMAC", e.target.value)}
                onKeyDown={(e) => _dispatch("innerDstMAC", e)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>inner src IP</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerSrcIP}
                onChange={(e) => _setTextVal("innerSrcIP", e.target.value)}
                onKeyDown={(e) => _dispatch("innerSrcIP", e)}
              />
            </div>

            <div className="col">
              <label>inner dst IP</label>
              <input
                type="text"
                className="form-control"
                value={textVal.innerDstIP}
                onChange={(e) => _setTextVal("innerDstIP", e.target.value)}
                onKeyDown={(e) => _dispatch("innerDstIP", e)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>VNI</label>
              <input
                type="text"
                className="form-control"
                value={textVal.VNI}
                onChange={(e) => _setTextVal("VNI", e.target.value)}
                onKeyDown={(e) => _dispatch("VNI", e)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
