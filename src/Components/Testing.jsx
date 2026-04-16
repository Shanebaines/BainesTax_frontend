import "./testing.css"
import { useState } from "react"

export default function Testing() {
    const [count, setCount] = useState(0);
    
    return (
        <div className="background">    
            <button onClick={() => setCount(count > 0 ? count - 1 : count)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>

        </div>
    )
}