"use client"
import { useState } from "react";

export default function ShenayaPage() {
    const [counter, setCounter] = useState(0)

  return (
    <>
    <div>Shenaya</div>
    <div>{counter}</div>
    <button onClick={() => setCounter(counter + 1)}></button>
    </>
  );
}
