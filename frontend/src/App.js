import React, { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [name, setName] = useState("");
  const [registed, setRegisted] = useState(false);

  const register = (e) => {
    e.preventDefault();
    if (name !== "") {
      setRegisted(true);
    }
  };

  return (
    <div className="App">
      {!registed ? (
        <form onSubmit={register}>
          <label htmlFor="Name">Insert Your Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button>Go to chat</button>
        </form>
      ) : (
        <Chat name={name} />
      )}
    </div>
  );
}

export default App;
