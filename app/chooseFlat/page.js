export default function chooseFlat() {
  
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        className="box"
        style={{
          border: '1px solid black',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div>CREATE FLAT</div>
          <input type="text" placeholder="Enter flat name" />
          <button>Done</button>
        </div>
        <div>
          <div>JOIN FLAT</div>
          <input type="text" placeholder="Enter flat code" />
          <button>Done</button>
        </div>
      </div>
    </div>
  );
}
