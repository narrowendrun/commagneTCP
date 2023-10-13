import { useEffect } from "react";
import { useState } from "react";

export var f2s_string = "";

export default function SaveToFile() {
  const [state, setState] = useState(true);
  const [Name, setName] = useState("");
  const [Size, setSize] = useState("");
  const [Count, setCount] = useState("");
  const [Frequency, setFrequency] = useState("");
  useEffect(() => {
    if (!state) {
      setName("");
      setSize("");
      setCount("");
      setFrequency("");
      document.getElementById("bashFILENAME").textContent = "";
      document.getElementById("bashFILESIZE").textContent = "";
      document.getElementById("bashFILECOUNT").textContent = "";
      document.getElementById("bashFREQUENCY").textContent = "";
    }
  }, [state]);
  useEffect(() => {
    if (Name != "") {
      if (Name.includes(".pcap") || Name.includes(".")) {
        document.getElementById("bashFILENAME").textContent =
          " -w /mnt/flash/" + Name;
      } else {
        document.getElementById("bashFILENAME").textContent =
          " -w /mnt/flash/" + Name + ".pcap";
      }
    } else {
      document.getElementById("bashFILENAME").textContent = "";
    }
    if (Size != "") {
      document.getElementById("bashFILESIZE").textContent = " -C " + Size;
    } else {
      document.getElementById("bashFILESIZE").textContent = "";
    }
    if (Count != "") {
      document.getElementById("bashFILECOUNT").textContent = " -W " + Count;
    } else {
      document.getElementById("bashFILECOUNT").textContent = "";
    }
    if (Frequency != "") {
      document.getElementById("bashFREQUENCY").textContent = " -G " + Frequency;
    } else {
      document.getElementById("bashFREQUENCY").textContent = "";
    }
    f2s_string =
      document.getElementById("bashFILENAME").textContent +
      document.getElementById("bashFILESIZE").textContent +
      document.getElementById("bashFILECOUNT").textContent +
      document.getElementById("bashFREQUENCY").textContent;
  }, [Name, Size, Count, Frequency]);
  return (
    <>
      <div id="SaveToFile" className="container">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                onClick={() => {
                  setState(!state), console.log(state);
                }}
              >
                Save to File?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="F2SInput">
                  <label htmlFor="fileName">File Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fileName"
                    placeholder="file.pcap"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="F2SInput">
                  <label htmlFor="fileSize">File Size</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fileSize"
                    placeholder="integer (MB) or blank"
                    value={Size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>

                <div className="F2SInput">
                  <label htmlFor="fileCount">File Count</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fileCount"
                    placeholder="integer or blank"
                    value={Count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                </div>
                <div className="F2SInput">
                  <label htmlFor="Frequency">Frequency</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Frequency"
                    placeholder="integer or blank"
                    value={Frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
