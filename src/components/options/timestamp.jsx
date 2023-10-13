import { useEffect } from "react";
import { useState } from "react";
export var timestampFlag = "";

export default function Timestamp() {
  const [selectedTime, setSelectedTime] = useState(() => {
    if (localStorage.getItem("TIMESTAMP")) {
      return localStorage.getItem("TIMESTAMP");
    } else {
      return "TimeStampRadio1";
    }
  });
  useEffect(() => {
    document.getElementById(selectedTime).checked = true;
    document.getElementById("bashTIME").innerHTML =
      document.getElementById(selectedTime).value;
    localStorage.setItem("TIMESTAMP", selectedTime);
    timestampFlag = document.getElementById(selectedTime).value;
  }, [selectedTime]);
  return (
    <>
      <div className="container option">
        <p>Timestamp preference?</p>
        <div className="row">
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="TimeStampRadios"
                id="TimeStampRadio1"
                value=""
                onChange={() => setSelectedTime("TimeStampRadio1")}
              />
              <label className="form-check-label" htmlFor="TimeStampRadio1">
                Print time normally
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="TimeStampRadios"
                id="TimeStampRadio2"
                value="t"
                onChange={() => setSelectedTime("TimeStampRadio2")}
              />
              <label className="form-check-label" htmlFor="TimeStampRadio2">
                Do not print time at all
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="TimeStampRadios"
                id="TimeStampRadio3"
                value="tt"
                onChange={() => setSelectedTime("TimeStampRadio3")}
              />
              <label className="form-check-label" htmlFor="TimeStampRadio3">
                Linux time
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="TimeStampRadios"
                id="TimeStampRadio4"
                value="ttt"
                onChange={() => setSelectedTime("TimeStampRadio4")}
              />
              <label className="form-check-label" htmlFor="TimeStampRadio4">
                Delta since the previous packet
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="TimeStampRadios"
                id="TimeStampRadio5"
                value="tttt"
                onChange={() => setSelectedTime("TimeStampRadio5")}
              />
              <label className="form-check-label" htmlFor="TimeStampRadio5">
                Time with the calendar date
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="TimeStampRadios"
                id="TimeStampRadio6"
                value="ttttt"
                onChange={() => setSelectedTime("TimeStampRadio6")}
              />
              <label className="form-check-label" htmlFor="TimeStampRadio6">
                Delta since the start of the command
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
