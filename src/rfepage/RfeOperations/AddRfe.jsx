import { useState, useEffect } from "react";

const today = new Date();
const f = new Intl.DateTimeFormat("en-in", {
  dateStyle: "short",
});

function postData(type, user, desc) {
  fetch("/commagenetcp/rfe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type,
      date: f.format(today),
      name: user,
      comments: desc,
      status: "open",
      worker: "narendran.srinivasan",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setLocalRfeTable((current) => {
        return [...current, data];
      });
    })
    .catch((err) => console.log(err));
}

export default function () {
  const [type, setType] = useState("RFE");
  const [user, setUser] = useState("");
  const [desc, setDesc] = useState("");
  const [localRfeTable, setLocalRfeTable] = useState(() => {
    if (localStorage.getItem("localRfeTable")) {
      return JSON.parse(localStorage.getItem("localRfeTable"));
    } else {
      return [{}];
    }
  });
  useEffect(() => {
    fetch("/commagenetcp/login")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);
  function formDisappear() {
    document.getElementById("RFEform").style.top = "-300%";
    setType("RFE");
    setDesc("");
  }
  function _setType() {
    setType(document.getElementById("requestType").value);
  }

  useEffect(() => {
    localStorage.setItem("localRfeTable", JSON.stringify(localRfeTable));
  }, [localRfeTable]);
  function addItem() {
    if (desc == "") return;
    if (user == "logged out") return;
    setLocalRfeTable((current) => {
      return [
        ...current,
        {
          type: type,
          date: f.format(today),
          name: user,
          comments: desc,
          status: "open",
          worker: "narendran.srinivasan",
        },
      ];
    });
    postData(type, user, desc);
    formDisappear();
    window.location.reload();
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form id="RFEform" onSubmit={handleSubmit}>
        <button
          id="closeForm"
          className="btn btn-light"
          onClick={() => formDisappear()}
        >
          X
        </button>
        <br />
        <br />
        <div className="container">
          <div className="row formColumn">
            <select
              id="requestType"
              className="form-select"
              aria-label="Default select example"
              onChange={() => _setType()}
            >
              <option value="RFE">RFE</option>
              <option value="bug">bug</option>
            </select>
          </div>
          <div className="row formColumn">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                disabled
              />
            </div>
          </div>
          <div className="row formColumn">
            <textarea
              className="form-control"
              placeholder="please add a description"
              id="floatingTextarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ minHeight: "30vh" }}
              required
            ></textarea>
          </div>
        </div>
        <br />
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => addItem()}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
