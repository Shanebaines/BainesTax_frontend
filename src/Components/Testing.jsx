import "./testing.css"
import { useState } from "react"

export default function Testing() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Students");
    
    return (
        <div className="background">   
            <h1>{name}</h1> 
            <button className="count-button" onClick={() => setCount(count > 0 ? count - 1 : count)}>-</button>
            <span>{count}</span>
            <button className="count-button" onClick={() => setCount(count + 1)}>+</button>
            <div className="Buttons_panel">
                <button className="role-button" onClick={() => setName("Students")}>Students</button>
                <button className="role-button" onClick={() => setName("Teachers")}>Teachers</button>
                <button className="role-button" onClick={() => setName("Parents")}>Parents</button>
                <button className="role-button" onClick={() => setName("Other")}>Other</button>
            </div>
        </div>
    )
}