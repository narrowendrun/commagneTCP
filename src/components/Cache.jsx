import { useEffect } from "react";
import { useState } from "react";

export function copy() {
  let output = document.getElementById("commandtocopy").textContent;

  //console.log(output);
  navigator.clipboard.writeText(output);
  return output;
}
function copyWIRE() {
  let output =
    document.getElementById("wireSTART").textContent +
    document.getElementById("wireFLOW").textContent +
    document.getElementById("wireINT").textContent +
    document.getElementById("wireCMD").textContent +
    document.getElementById("wireEND").textContent;
  navigator.clipboard.writeText(output);
  return output;
}

export default function CacheSection() {
  const [cache, setCache] = useState(() => {
    if (localStorage.getItem("commandCache")) {
      return JSON.parse(localStorage.getItem("commandCache"));
    } else {
      return [{}];
    }
  });
  useEffect(() => {
    localStorage.setItem("commandCache", JSON.stringify(cache));
  }, [cache]);
  const today = new Date();
  const f = new Intl.DateTimeFormat("en-in", {
    dateStyle: "short",
    timeStyle: "medium",
  });
  function cacheIT(cmd) {
    let add = 1;
    for (let i = 0; i < cache.length; i++) {
      if (cache[i].command == cmd) {
        add = 0;
        break;
      }
    }
    if (add) {
      setCache((currentcache) => {
        return [
          ...currentcache,
          {
            id: crypto.randomUUID(),
            date: f.format(today),
            command: cmd,
            comments: "",
          },
        ];
      });
    }
  }
  function setComments(id, comment) {
    setCache((currentcache) => {
      return currentcache.map((item) => {
        if (item.id == id) {
          return { ...item, comments: comment };
        }

        return item;
      });
    });
  }
  function deleteCache(id) {
    setCache((currentcache) => {
      return currentcache.filter((item) => item.id !== id);
    });
  }
  function logCmd(actionstring, cachetime, commentlength) {
    const today = new Date();
    const g1 = new Intl.DateTimeFormat("en-gb", {
      timeStyle: "medium",
      timeZone: "GMT",
    });
    const g2 = new Intl.DateTimeFormat("en-gb", {
      dateStyle: "short",
      timeZone: "GMT",
    });
    fetch("/commagenetcp/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "user",
        date: g2.format(today),
        time: g1.format(today),
        cacheTime: cachetime,
        cacheCount: cache.length,
        action: actionstring,
        commentLength: commentlength,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div id="commandContainer" className="container">
        <br />
        <div className="row ">
          <div className="col-11 commandRow">
            <h6 id="commandtocopy">
              bash tcpdump -<span id="bashHS"></span>
              <span id="bashMAC"></span>
              <span id="bashVERBOSE"></span>
              <span id="bashTIME"></span>
              <span id="bashQUICK"></span>
              <span id="bashINT"></span>
              <span id="bashCOUNT"></span>
              <span id="bashFLOW"></span>
              <span id="bashFILENAME"></span>
              <span id="bashFILESIZE"></span>
              <span id="bashFILECOUNT"></span>
              <span id="bashFREQUENCY"></span>
              <span id="filterFlags"></span>
            </h6>
          </div>
          <div className="col-1">
            <button
              className="btn btn-light copyButton"
              onClick={() => {
                copy(), cacheIT(copy()), logCmd("bashcopy", "na", "na");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>
          </div>
        </div>
        <br />
        <div className="row ">
          <div className="col-11 commandRow">
            <h6>
              <span id="wireSTART">ssh root@switch "tcpdump -s 0 -Un -w -</span>
              <span id="wireFLOW"></span>
              <span id="wireINT"></span>
              <span id="wireCMD"></span>
              <span id="wireEND">" | wireshark -k -i -</span>
            </h6>
          </div>
          <div className="col-1">
            <button
              className="btn btn-light copyButton"
              onClick={() => {
                copyWIRE(), cacheIT(copyWIRE()), logCmd("wirecopy", "na", "na");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>
          </div>
        </div>
        <br />
      </div>
      <br />
      <div className="container OPandF">
        <h3>Command Cache</h3>

        {cache.map((item) => {
          return (
            <div className="row" key={item.id}>
              <div className="col-2 cachecolumn">{item.date}</div>
              <div className="col-4 cachecolumn">{item.command}</div>
              <div className="col cachecolumn">
                <textarea
                  className="form-control"
                  placeholder="user comments"
                  id="floatingTextarea"
                  value={item.comments}
                  onChange={(e) => setComments(item.id, e.target.value)}
                ></textarea>
              </div>
              <div
                className="col-2 cachecolumn"
                style={{
                  padding: "2% 0",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <button
                  className="btn btn-light"
                  onClick={() => {
                    navigator.clipboard.writeText(item.command),
                      logCmd("cachecopy", item.date, item.comments.length);
                  }}
                  style={{ margin: "8% 3%" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-clipboard"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                  </svg>
                </button>
                {/* <button className="btn btn-primary" style={{ margin: "8% 3%" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-balloon-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.48 10.901C11.211 10.227 13 7.837 13 5A5 5 0 0 0 3 5c0 2.837 1.789 5.227 4.52 5.901l-.244.487a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.244-.487ZM4.352 3.356a4.004 4.004 0 0 1 3.15-2.325C7.774.997 8 1.224 8 1.5c0 .276-.226.496-.498.542-.95.162-1.749.78-2.173 1.617a.595.595 0 0 1-.52.341c-.346 0-.599-.329-.457-.644Z"
                    />
                  </svg>
                </button> */}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteCache(item.id),
                      logCmd("deleted", item.date, item.comments.length);
                  }}
                  style={{ margin: "8% 3%" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
        <br />
        <center>
          <p>{cache.length} commands cached</p>
        </center>
      </div>
    </>
  );
}
