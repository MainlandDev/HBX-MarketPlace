/** @jsxImportSource react */
// The theme compiles JSX against the HBX runtime; client code ships to the browser and must use plain React's.
"use client"

import {useState} from "react";

export const CounterStatic = ({start = 0}: {start?: number}) => {
    const [counter, setCounter] = useState<number>(start);
    return <button onClick={() => setCounter((current) => current + 1)}>{counter}</button>;
}
