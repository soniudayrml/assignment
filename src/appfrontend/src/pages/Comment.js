import React from "react";

function Comment(props) {
  return (
    <div>
      <div className="card" style={{ marginBottom: "10px" }}>
        <div className="card-body">{props.commenti.userName} : {props.commenti.comment}</div>
      </div>
    </div>
  );
}

export default Comment;
