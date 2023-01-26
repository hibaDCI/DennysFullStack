import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const AppLayout = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 5px;
`;

const Header2 = styled.h2`
  color: whitesmoke;
  text-align: center;
`;

const Button = styled.button`
  color: whitesmoke;
  background-color: #2d3a2d;
  text-align: center;
  font-size: 2rem;
  border-radius: 1rem;
  margin-left: 40%;
  padding: 1%;
`;
function ShowUsers() {
  const [users, setUsers] = useState([]);
  console.log(users);
  const getAllUsers = async () => {
    const res = await axios.get("/api/auth/all");
    console.log(res.data);
    setUsers(res.data.allUser);
  };

  return (
    <div className=" bg-dark d-flex-">
      <Header2>Meet Friends</Header2>

      <AppLayout>
        {users.length > 0 &&
          users.map((user, i) => (
            <div key={i} className="card border border-warning m-4">
              <img
                className="card-img-top"
                src={user.userPic}
                alt="your face"
              />
              <div className="card-body">
                <h3 className="card-text"> {user.fullname}</h3>
                <h3 className="card-text"> {user.email}</h3>
              </div>
            </div>
          ))}
      </AppLayout>
      <Button onClick={getAllUsers}>Show All Users</Button>
    </div>
  );
}

export default ShowUsers;