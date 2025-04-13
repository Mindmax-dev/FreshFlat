export default function chooseFlat() { 

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div className="box" style={{ marginBottom: "20px", textAlign: "center" }}>
        <div>CREATE FLAT</div>
        <input type="text" placeholder="Enter flat name" />
        <button>Done</button>
      </div>
      <div className="box" style={{ textAlign: "center" }}>
        <div>JOIN FLAT</div>
        <input type="text" placeholder="Enter flat code" />
        <button>Done</button>
      </div>
    </div>
  );
}
