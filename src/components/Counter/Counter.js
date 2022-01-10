import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [isDisabled, setDisabled] = useState(false);
    const increase = () => {
        setCount(count + 1);
    };
    const decrease = () => {
        setCount(count - 1);
    };
    const handleOff = () => {
        setDisabled(!isDisabled);
    };
    return (
        <>
            <h3 data-testid="counter">{count}</h3>
            <div>
                <button disabled={isDisabled} onClick={decrease} data-testid="minus-button">
                    -
                </button>
                <button disabled={isDisabled} onClick={increase} data-testid="plus-button">
                    +
                </button>
            </div>
            <button style={{ backgroundColor: 'blue' }} onClick={handleOff} data-testid="on/off-button">
                on/off
            </button>
        </>
    )
}
export default Counter