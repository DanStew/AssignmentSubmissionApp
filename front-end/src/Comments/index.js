import { jwtDecode } from "jwt-decode";
import { useUser } from "../UserProvider";

const Comment = ({
  id,
  createdDate,
  createdBy,
  text,
  emitEditComment,
  emitDeleteComment,
}) => {
  const { jwt } = useUser();
  const decodedJwt = jwtDecode(jwt);

  return (
    <div className="mt-5">
      <div className="comment-bubble">
        <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
          {`${createdBy.name} :  `}
          {decodedJwt.sub === createdBy.username ? (
            <div className="d-flex gap-5">
              <div
                onClick={() => emitEditComment(id)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Edit
              </div>
              <div
                onClick={() => emitDeleteComment(id)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Delete
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Comment;
