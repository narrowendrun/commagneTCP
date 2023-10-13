import { useState, useEffect } from "react";
function deleteRfe(id) {
  fetch("/commagenetcp/rfe/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
  window.location.reload();
}

function editRfe(FormData) {
  fetch("/commagenetcp/rfe/" + FormData.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: FormData.name,
      comments: FormData.comments,
      status: FormData.status,
      worker: FormData.worker,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}

export default function EditRfe({ data }) {
  const [formData, setFormData] = useState(() => {
    if (data == null) {
      return {
        id: "",
        type: "",
        name: "",
        date: "",
        comments: "",
        status: "",
        worker: "",
      };
    } else {
      return { ...data };
    }
  });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  function handleChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <>
      <div className="container editordelete">
        <input
          type="text"
          value={formData.id}
          onChange={(e) => handleChange("id", e.target.value)}
        />
        <br />
        <input
          type="text"
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />
        <br />
        <input
          type="text"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
        <br />
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <br />

        <textarea
          className="form-control"
          placeholder="user comments"
          id="floatingTextarea"
          value={formData.comments}
          onChange={(e) => handleChange("comments", e.target.value)}
        ></textarea>

        <input
          id="edited_status"
          type="text"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        />
        <br />
        <input
          id="edited_worker"
          type="text"
          value={formData.worker}
          onChange={(e) => handleChange("worker", e.target.value)}
        />
        <br />
        <button className="btn btn-light" onClick={() => editRfe(formData)}>
          edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteRfe(formData.id)}
        >
          delete
        </button>
      </div>
    </>
  );
}
