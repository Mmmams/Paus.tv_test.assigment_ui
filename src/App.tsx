import {useEffect, useState} from 'react';

import './App.css';
import {VideoModal} from './components/VideoModal';
import Navbar from './components/Navbar';
import Navigator from './navigation/Navigator';
import {getChainId} from './utils/utils';

export interface IVideoMetaData {
    key: string;
    Location: string;
    Bucket: string;
    ETag: string;
    Key: string;
}

export default function App() {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [videoMetaData, setVideoMetaData] = useState<IVideoMetaData | {}>({});
    const [chainId, setChainId] = useState<number | null>(null);

    useEffect(() => {
        getChainId().then((chainId) => setChainId(chainId));
    }, []);

    return (
        <>
            {showModal ? (
                <VideoModal
                    setVideoMetaData={setVideoMetaData}
                    setShowModal={setShowModal}
                />
            ) : null}
            <Navbar
                chainId={chainId}
                setShowModal={setShowModal}
                walletAddress={walletAddress}
            />
            <Navigator setWalletAddress={setWalletAddress}/>
        </>
    );
}
