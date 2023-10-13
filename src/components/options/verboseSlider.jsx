import { useEffect, useState } from "react";
export default function VerboseSlider() {
  const [verboseInterger, setverboseInterger] = useState(() => {
    if (localStorage.getItem("VERBOSITY")) {
      return localStorage.getItem("VERBOSITY");
    } else {
      return 0;
    }
  });
  const [text, setText] = useState("no");
  const [verboseOption, setVerboseOption] = useState("");
  useEffect(() => {
    if (verboseInterger == 0) {
      setText("no");
      setVerboseOption("");
    } else if (verboseInterger == 1) {
      setText("very");
      setVerboseOption("v");
    } else if (verboseInterger == 2) {
      setText("vvery");
      setVerboseOption("vv");
    } else {
      setText("vvvery");
      setVerboseOption("vvv");
    }
    localStorage.setItem("VERBOSITY", verboseInterger);
    document.getElementById("bashVERBOSE").innerHTML = verboseOption;
  }, [verboseInterger, verboseOption]);
  return (
    <>
      <div className="container option">
        <label htmlFor="verbose_slider" className="form-label">
          How do you like your verbosity?
        </label>
        <div className="row">
          <div className="col-md-9">
            <input
              type="range"
              className="form-range"
              id="verbose_slider"
              min="0"
              max="3"
              step="1"
              value={verboseInterger}
              onChange={(e) => setverboseInterger(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <p
              style={{
                background: "blue",
                borderRadius: "10px",
                textAlign: "center",
                padding: "1% 0",
              }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
