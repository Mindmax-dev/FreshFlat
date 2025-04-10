export default function chooseFlat() {
  return (
    <div className="container">
      <div className="box">
        <div>CREATE FLAT</div>
        <input type="text" placeholder="Enter flat name" />
        <button>Done</button>
      </div>
      <div className="box">
        <div>JOIN FLAT</div>
        <input type="text" placeholder="Enter flat code" />
        <button>Done</button>
      </div>
    </div>
  );
}
