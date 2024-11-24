import { useState } from "react";

function Home() {
  const [message, setMessage] = useState("");

  const handleButtonClick = (color) => {
    setMessage(`O botão ${color} foi pressionado.`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Teste</h1>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          margin: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => handleButtonClick("vermelho")}
      >
        Vermelho
      </button>
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "10px 20px",
          margin: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => handleButtonClick("azul")}
      >
        Azul
      </button>
      {message && <p style={{ marginTop: "20px", fontSize: "18px" }}>{message}</p>}
    </div>
  );
}

export default Home;
