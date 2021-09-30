import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    console.log("IN USE EFFECT");
    await axios
      .get("/api/users")
      .then(response => {
        console.log("RESPONSE: ", response.data);
        setUsers(response.data);
      })
      .catch(ex => console.log(ex));
  }, []);

  return (
    <div>
      <div>My great app</div>
      <div>{users && users.length}</div>
      <ul>{users && users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
};

export default App;
