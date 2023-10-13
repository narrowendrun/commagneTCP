import { useState, useEffect, useRef } from "react";

export default function IPparamButtons({ dispatch }) {
  const [state, setState] = useState({
    IPv4: true,
    IPv6: true,
  });
  const [command, setCommand] = useState({
    srcIPv4: "",
    dstIPv4: "",
    srcIPv6: "",
    dstIPv6: "",
  });
  const [textVal, setTextVal] = useState({
    srcIPv4: "",
    dstIPv4: "",
    srcIPv6: "",
    dstIPv6: "",
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
  function IP_Logic(type, version, src, dst) {
    let s_arr = src.split(" ").join("").split(",");
    let d_arr = dst.split(" ").join("").split(",");
    if (src !== "" && dst !== "") {
      _setCommand("srcIPv" + version, "'(" + type + " src " + src);
      _setCommand("dstIPv" + version, "" + type + " dst " + dst + ")'");
    } else if (src == "" && dst == "") {
      _setCommand("srcIPv" + version, type);
      _setCommand("dstIPv" + version, "");
    } else if (src == "") {
      _setCommand("srcIPv" + version, "");
      _setCommand("dstIPv" + version, "" + type + " dst " + dst);
    } else if (dst == "") {
      let temp = "" + type + " src " + s_arr[0];
      for (let i = 1; i < s_arr.length; i++) {
        temp += " or src " + s_arr[i];
      }
      console.log(temp);
      _setCommand("srcIPv" + version, temp);
      _setCommand("dstIPv" + version, "");
    }
  }
  function applyLogic(key, value) {
    if (key == "srcIPv4") {
      IP_Logic("ip", 4, value, textVal.dstIPv4);
    } else if (key == "dstIPv4") {
      IP_Logic("ip", 4, textVal.srcIPv4, value);
    } else if (key == "srcIPv6") {
      IP_Logic("ip6", 6, value, textVal.dstIPv6);
    } else if (key == "dstIPv6") {
      IP_Logic("ip6", 6, textVal.srcIPv6, value);
    }
  }
  useEffect(() => {
    if (state.IPv4) {
      dispatch({ type: "DELETE", payload: command.srcIPv4 });
      dispatch({ type: "DELETE", payload: command.dstIPv4 });
      _setTextVal("srcIPv4", "");
      _setTextVal("dstIPv4", "");
      _setCommand("srcIPv4", "ip");
    } else {
      dispatch({ type: "PARAMETRE", payload: command.srcIPv4 });
    }
  }, [state.IPv4]);
  useEffect(() => {
    if (state.IPv6) {
      dispatch({ type: "DELETE", payload: command.srcIPv6 });
      dispatch({ type: "DELETE", payload: command.dstIPv6 });
      _setTextVal("srcIPv6", "");
      _setTextVal("dstIPv6", "");
      _setCommand("srcIPv6", "ip6");
    } else {
      dispatch({ type: "PARAMETRE", payload: command.srcIPv6 });
    }
  }, [state.IPv6]);

  useEffect(() => {
    // Get the previous dataObject value using the ref
    const prevtextVal = prevtextValRef.current;

    // Iterate through the keys of the current dataObject
    Object.keys(textVal).forEach((key) => {
      const currentValue = textVal[key];
      const prevValue = prevtextVal[key];

      // Check if the value for this key has changed
      if (currentValue !== prevValue) {
        if (key == "srcIPv4" || key == "dstIPv4") {
          dispatch({ type: "DELETE", payload: command.srcIPv4 });
          dispatch({ type: "DELETE", payload: command.dstIPv4 });
        } else if (key == "srcIPv6" || key == "dstIPv6") {
          dispatch({ type: "DELETE", payload: command.srcIPv6 });
          dispatch({ type: "DELETE", payload: command.dstIPv6 });
        }

        applyLogic(key, textVal[key]);
      }
    });

    // Update the previous dataObject ref with the current value
    prevtextValRef.current = textVal;
  }, [textVal]); // dataObject is the dependency array
  function _dispatch(field, version, e) {
    if (e.key == "Enter") {
      if (field == "srcIPv" + version || field == "dstIPv" + version) {
        dispatch({ type: "DELETE", payload: command["srcIPv" + version] });
        dispatch({ type: "DELETE", payload: command["dstIPv" + version] });
        if (command["srcIPv" + version] == "") {
          dispatch({ type: "PARAMETRE", payload: command["dstIPv" + version] });
        } else if (command["dstIPv" + version] == "") {
          dispatch({ type: "PARAMETRE", payload: command["srcIPv" + version] });
        } else {
          dispatch({ type: "PARAMETRE", payload: command["srcIPv" + version] });
          dispatch({ type: "PARAMETRE", payload: command["dstIPv" + version] });
        }
      }
    }
  }

  return (
    <>
      <button
        onClick={() => _setState("IPv4")}
        className="filterButton btn"
        id="VLANbutton"
        style={{
          background: state.IPv4 ? "blue" : "white",
          color: state.IPv4 ? "white" : "blue",
        }}
      >
        IPv4
      </button>
      <button
        onClick={() => _setState("IPv6")}
        className="filterButton btn"
        id="VLANbutton"
        style={{
          background: state.IPv6 ? "blue" : "white",
          color: state.IPv6 ? "white" : "blue",
        }}
      >
        IPv6
      </button>
      {!state.IPv4 && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <label htmlFor="srcIP">src IPv4</label>
              <input
                id="srcIP"
                type="text"
                className="form-control"
                placeholder="a.b.c.d &#10;or blank"
                value={textVal.srcIPv4}
                onChange={(e) => _setTextVal("srcIPv4", e.target.value)}
                onKeyDown={(e) => _dispatch("srcIPv4", 4, e)}
              />
            </div>
            <div className="col">
              <label htmlFor="srcIP">dst IPv4</label>
              <input
                id="srcIP"
                type="text"
                className="form-control"
                placeholder="a.b.c.d &#10;or blank"
                value={textVal.dstIPv4}
                onChange={(e) => _setTextVal("dstIPv4", e.target.value)}
                onKeyDown={(e) => _dispatch("dstIPv4", 4, e)}
              />
            </div>
          </div>
        </div>
      )}

      {!state.IPv6 && (
        <div className="container vlanInput">
          <div className="row">
            <div className="col">
              <label htmlFor="srcIPv6">src IPv6</label>
              <input
                id="srcIPv6"
                type="text"
                className="form-control"
                placeholder="y:y:y:y:y:y:y:y &#10;or blank"
                value={textVal.srcIPv6}
                onChange={(e) => _setTextVal("srcIPv6", e.target.value)}
                onKeyDown={(e) => _dispatch("srcIPv6", 6, e)}
              />
            </div>
            <div className="col">
              <label htmlFor="dstIPv6">dst IPv6</label>
              <input
                id="dstIPv6"
                type="text"
                className="form-control"
                placeholder="y:y:y:y:y:y:y:y &#10;or blank"
                value={textVal.dstIPv6}
                onChange={(e) => _setTextVal("dstIPv6", e.target.value)}
                onKeyDown={(e) => _dispatch("dstIPv6", 6, e)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
