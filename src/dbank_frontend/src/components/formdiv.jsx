import React, { useState, useRef } from 'react'
import { dbank_backend } from "../../../declarations/dbank_backend";
export default function formdiv() {
    const btndis = false;

    window.addEventListener("load", async function () {
        // console.log("finsihed loading ")
        await funbalance();

    })
    const funbalance = async () => {
        const currentamt = await dbank_backend.checkbalance();
        setcureentamt(parseFloat(currentamt.toFixed(2)))
    }
    const inputref = useRef("null")
    const [topamt, settopamt] = useState("")
    const [cureentamt, setcureentamt] = useState(0)
    const [withdrawamt, setwithdraw] = useState("")
    const [disable, setdisable] = useState(false)
    const [err1, seterr1] = useState("")
    const formsubmmit = async (event) => {
        event.preventDefault();
        // inputRef.current.disabled = true;
        if (topamt && withdrawamt) {

            setdisable(true)
            seterr1("")
            await dbank_backend.topup(parseFloat(topamt))
            await dbank_backend.minus(parseFloat(withdrawamt))
            await dbank_backend.compoundintrest()
            await funbalance()
            settopamt("")
            setwithdraw("")
            setdisable(false)
        } else {
            seterr1("Kindly Fill all The required Fields")
        }
    }
    return (
        <div className="container">
            <img src="/dbank_logo.png" alt="DBank logo" width="100" />
            <h1>Current Balance: $<span id="value">{cureentamt}</span></h1>
            <p className='Error'>{err1}</p>
            <div className="divider"></div>
            <form action="#" onSubmit={formsubmmit}>
                <h2>Amount to Top Up</h2>
                <input id="input-amount" type="number" step="0.01" min="0" name="topUp" value={topamt} onChange={(e) => {
                    settopamt(e.target.value)
                }} />
                <h2>Amount to Withdraw</h2>
                <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min="0" value={withdrawamt} onChange={(e) => {
                    setwithdraw(e.target.value)
                }} />
                <input id="submit-btn" type="submit" readOnly value="Finalise Transaction" ref={inputref} disabled={disable} />
            </form>
        </div>
    )
}
