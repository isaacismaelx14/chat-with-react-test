import React, { useEffect, useRef, useState } from "react";
import socket from "./Socket";

function Chat({ name }) {
  const MessageDiv = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", name, message);
    setMessage("");
  };
  //   Getting Connected User
  useEffect(() => {
    socket.emit("connected", name);
  }, [name]);
  //   Getting messages
  useEffect(() => {
    socket.on("messages", (getterMessage) => {
      setMessages([...messages, getterMessage]);
    });

    socket.on("connectedUser", (getterMessage) => {
      setMessages([...messages, getterMessage]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    MessageDiv.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      <div style={stylesChat}>
        {messages.map((e, i) => (
          <div key={i}>{`${(e.name && `${e.name}: `) || ""} ` + e.message}</div>
        ))}
        <div ref={MessageDiv}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Write a message</label>
        <input type={"text"} value={message} onChange={handleChange}></input>
        <button>Send Message</button>
      </form>
    </>
  );
}

const stylesChat = {
  width: "50%",
  height: "50vh",
  overflow: "scroll",
  overflowX: "hidden",
  border: "2px solid black",
};

export default Chat;
