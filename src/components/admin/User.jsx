import React, { useEffect } from "react";
import { getAllUsers } from "../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
const User = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  useEffect(() => {
    // Fetch all users when the component mounts
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h1>User</h1>
      {allUsers?.map((users) => {
        return (
          <>
            id:{users?._id}
             {  } ||
            email:{users?.email}
            <br />
          </>
        );
      })}
    </div>
  );
};

export default User;
