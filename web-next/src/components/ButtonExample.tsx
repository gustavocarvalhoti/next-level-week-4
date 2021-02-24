import {useState} from "react";

// For receive props
// children - Equals slot of Vue.js
interface ButtonProps {
    color: string,
    children: string
}

export function ButtonExample(props: ButtonProps) {
    // State on the memory
    const [counter, setCounter] = useState(1);

    function increment() {
        setCounter(counter + 1);
    }

    return (
        <button type="button"
                style={{backgroundColor: props.color}}
                onClick={increment}
        >
            {props.children} <strong>{counter}</strong>
        </button>
    )
}