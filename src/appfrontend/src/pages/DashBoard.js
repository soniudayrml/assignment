import React, { useEffect, useState } from "react";
import { addCommentToUser, getAllComments, getUser } from "../api/ApiService";
import { useNavigate } from "react-router-dom";

import Comment from "./Comment";

function DashBoard() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    comment: "",
  });
  const [allComments, setAllComments] = useState([]);

  //   let commentType = "all";
  let user;

  const changeComment = (event) => {
    event.preventDefault();
    console.log("changing");
    // commentType = "user";
    getUser()
      .then((response) => {
        if (response.status === 200) {
          user = response.data;
          localStorage.setItem("USER_NAME", user.userName);
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("USER_KEY")) {
      navigate("/");
    }
    getAllComments()
      .then((response) => {
        console.log("response", response);

        if (response.status === 200) {
          console.log(response.data);
          setAllComments(response.data);
          console.log(allComments);
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleOnChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpClick = (event) => {
    event.preventDefault();
    addCommentToUser(values)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          setValues({
            comment: "",
          });
          alert("Added Successfully");
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          alert("Something Went Wrong");
        }
      });
  };

  const signingOut = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <h4 className="mb-3">What would you like to share with world?</h4>
        <button
          className="btn btn-primary"
          onClick={signingOut}
          style={{ float: "right", marginBottom: "10px" }}
        >
          Sign Out
        </button>
        <div className="mb-2">
          <textarea
            name="comment"
            className="form-control"
            value={values.comment}
            onChange={handleOnChange}
            id="myBox"
            rows="4"
          ></textarea>
        </div>
        <button
          disabled={values.comment.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Submit
        </button>
        <button
          onClick={changeComment}
          className="btn btn-primary"
          style={{ marginLeft: "900px" }}
        >
          Filter
        </button>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            {allComments.map((commente) => (
              <Comment id={commente.id} commenti={commente} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
