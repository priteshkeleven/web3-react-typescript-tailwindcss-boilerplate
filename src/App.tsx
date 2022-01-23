import { useState, useEffect, Fragment } from "react";
import { useWeb3React } from "@web3-react/core";
import { MetaMask } from "./connectors";
import Bignumber from "bignumber.js";

import "./App.css";

const App = () => {
    const { active, account, activate, library } = useWeb3React();
    const [blockNumber, setBlockNumber] = useState(null);
    const [network, setNetwork] = useState<any>(null);
    const [balance, setBalance] = useState<any>(null);

    const handleClick = async () => {
        if (!active) {
            activate(MetaMask);
        }
    };

    useEffect(() => {
        if (!active) {
            activate(MetaMask);
        }

        if (active) {
            library.getBlockNumber().then(setBlockNumber);
            library.getNetwork().then(setNetwork);
            library.getBalance(account).then(setBalance);
        }
    }, [active, library, activate, account]);

    console.log();

    return (
        <Fragment>
            <h1 className='text-3xl font-bold text-center'>Hello world!!!</h1>

            <div className='text-center mt-3'>
                <button
                    className='bg-slate-400 px-3 py-2 rounded-md text-white'
                    onClick={handleClick}
                >
                    {!active ? "connect" : "disconnect"}
                </button>
            </div>

            <p className='text-lg text-center mt-5 font-mono'>
                Account: {account}<br />
                Balance: {balance ? new Bignumber(balance.toString()).dividedBy(1e18).toString() : "0"}<br />
                Block Number: {blockNumber}<br />
                Chain: {network?.name} ({network?.chainId})
            </p>
        </Fragment>
    );
};

export default App;
