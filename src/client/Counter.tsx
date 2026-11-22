/** @jsxImportSource react */
// The theme compiles JSX against the HBX runtime; client code ships to the browser and must use plain React's.
"use client"

import {useState} from "react";

export const Counter = () => {
    const [counter, setCounter] = useState<number>(0);
    return <button onClick={() => setCounter(counter + 1)}>{counter}</button>;
}
