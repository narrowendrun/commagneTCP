import { useState, useEffect, useRef } from "react";

export default function PortparamButtons({ dispatch }) {
  const [state, setState] = useState({
    UDP: true,
    TCP: true,
  });
  const [command, setCommand] = useState({
    srcUDP: "",
    dstUDP: "",
    srcTCP: "",
    dstTCP: "",
  });
  const [textVal, setTextVal] = useState({
    srcUDP: "",
    dstUDP: "",
    srcTCP: "",
    dstTCP: "",
  });
  const prevtextValRef = useRef(textVal);
  const _setState = (button) => {
    let temp = state[button];
    setState((prevState) => ({
      ...prevState,
      [button]: !temp,
    }));
  };
  const _setTextVal = (field, value) => {
    let temp = textVal[field];
    setTextVal((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };
  const _setCommand = (field, value) => {
    setCommand((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };
  function PortLogic(version, src, dst) {
    if (src !== "" && dst !== "") {
      _setCommand("src" + version.toUpperCase(), "'(src port" + src);
      _setCommand("dst" + version.toUpperCase(), " dst port" + dst + ")'");
    } else if (src == "" && dst == "") {
      _setCommand("src" + version.toUpperCase(), version);
      _setCommand("dst" + version.toUpperCase(), "");
    } else if (src == "") {
      _setCommand("src" + version.toUpperCase(), "");
      _setCommand("dst" + version.toUpperCase(), " dst port " + dst);
    } else if (dst == "") {
      _setCommand("src" + version.toUpperCase(), " src port " + src);
      _setCommand("dst" + version.toUpperCase(), "");
    }
  }
  function applyLogic(key, value) {
    if (key == "srcUDP") {
      PortLogic("udp", value, textVal.dstUDP);
    } else if (key == "dstUDP") {
      PortLogic("udp", textVal.srcUDP, value);
    } else if (key == "srcTCP") {
      PortLogic("tcp", value, textVal.dstTCP);
    } else if (key == "dstTCP") {
      PortLogic("tcp", textVal.srcTCP, value);
    }
  }
  useEffect(() => {
    if (state.UDP) {
      dispatch({ type: "DELETE", payload: command.srcUDP });
      dispatch({ type: "DELETE", payload: command.dstUDP });
      _setTextVal("srcUDP", "");
      _setTextVal("dstUDP", "");
      _setCommand("srcUDP", "udp");
    } else {
      dispatch({ type: "PARAMETRE", payload: command.srcUDP });
    }
  }, [state.UDP]);
  useEffect(() => {
    if (state.TCP) {
      dispatch({ type: "DELETE", payload: command.srcTCP });
      dispatch({ type: "DELETE", payload: command.dstTCP });
      _setTextVal("srcTCP", "");
      _setTextVal("dstTCP", "");
      _setCommand("srcTCP", "tcp");
    } else {
      dispatch({ type: "PARAMETRE", payload: command.srcTCP });
    }
  }, [state.TCP]);

  useEffect(() => {
    // Get the previous dataObject value using the ref
    const prevtextVal = prevtextValRef.current;

    // Iterate through the keys of the current dataObject
    Object.keys(textVal).forEach((key) => {
      const currentValue = textVal[key];
      const prevValue = prevtextVal[key];

      // Check if the value for this key has changed
      if (currentValue !== prevValue) {
        if (key == "srcUDP" || key == "dstUDP") {
          dispatch({ type: "DELETE", payload: command.srcUDP });
          dispatch({ type: "DELETE", payload: command.dstUDP });
        } else if (key == "srcTCP" || key == "dstTCP") {
          dispatch({ type: "DELETE", payload: command.srcTCP });
          dispatch({ type: "DELETE", payload: command.dstTCP });
        }

        applyLogic(key, textVal[key]);
      }
    });

    // Update the previous dataObject ref with the current value
    prevtextValRef.current = textVal;
  }, [textVal]); // dataObject is the dependency array
  function _dispatch(type, field, pair, e) {
    if (e.key == "Enter") {
      console.log(command[field], command[pair]);

      dispatch({ type: "DELETE", payload: command[field] });
      dispatch({ type: "DELETE", payload: command[pair] });
      if (command[field] == "") {
        dispatch({ type: "PARAMETRE", payload: command[pair] });
      } else if (command[pair] == "") {
        dispatch({ type: "PARAMETRE", payload: command[field] });
      } else {
        dispatch({ type: "PARAMETRE", payload: command["src" + type] });
        dispatch({ type: "PARAMETRE", payload: command["dst" + type] });
      }
    }
  }

  return (
    <>
      <button
        onClick={() => _setState("UDP")}
        className="filterButton btn"
        id="VLANbutton"
        style={{
          background: state.UDP ? "blue" : "white",
          color: state.UDP ? "white" : "blue",
        }}
      >
        UDP
      </button>
      <button
        onClick={() => _setState("TCP")}
        className="filterButton btn"
        id="VLANbutton"
        style={{
          background: state.TCP ? "blue" : "white",
          color: state.TCP ? "white" : "blue",
        }}
      >
        TCP
      </button>
      {!state.UDP && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <label htmlFor="srcIP">UDP src port</label>
              <input
                id="srcIP"
                type="text"
                className="form-control"
                placeholder="integer or blank"
                value={textVal.srcUDP}
                onChange={(e) => _setTextVal("srcUDP", e.target.value)}
                onKeyDown={(e) => _dispatch("UDP", "srcUDP", "dstUDP", e)}
              />
            </div>
            <div className="col">
              <label htmlFor="srcIP">UDP dst port</label>
              <input
                id="srcIP"
                type="text"
                className="form-control"
                placeholder="integer or blank"
                value={textVal.dstUDP}
                onChange={(e) => _setTextVal("dstUDP", e.target.value)}
                onKeyDown={(e) => _dispatch("UDP", "dstUDP", "srcUDP", e)}
              />
            </div>
          </div>
        </div>
      )}

      {!state.TCP && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <label htmlFor="srcTCP">TCP src port</label>
              <input
                id="srcTCP"
                type="text"
                className="form-control"
                placeholder="integer or blank"
                value={textVal.srcTCP}
                onChange={(e) => _setTextVal("srcTCP", e.target.value)}
                onKeyDown={(e) => _dispatch("TCP", "srcTCP", "dstTCP", e)}
              />
            </div>
            <div className="col">
              <label htmlFor="dstTCP">TCP dst port</label>
              <input
                id="dstTCP"
                type="text"
                className="form-control"
                placeholder="integer or blank"
                value={textVal.dstTCP}
                onChange={(e) => _setTextVal("dstTCP", e.target.value)}
                onKeyDown={(e) => _dispatch("TCP", "dstTCP", "srcTCP", e)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
