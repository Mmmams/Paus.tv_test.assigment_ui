import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import "./App.css";
import { Modal } from "./components/Modal";
import Navbar from "./components/Navbar";
import Navigator from "./navigation/Navigator";
import { userSelector } from "./redux/slices/userSlice";
import { paths } from "./constants";
import { getChainId } from "./utils/utils";

export interface IVideoMetaData {
  key: string;
  Location: string;
  Bucket: string;
  ETag: string;
  Key: string;
}

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [videoMetaData, setVideoMetaData] = useState<IVideoMetaData | {}>({});
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    getChainId().then((chainId) => setChainId(chainId));
  }, []);

  return (
    <>
      {showModal ? (
        <Modal
          setVideoMetaData={setVideoMetaData}
          setShowModal={setShowModal}
        />
      ) : null}
      <Navbar
        chainId={chainId}
        setShowModal={setShowModal}
        walletAddress={walletAddress}
      />
      <Navigator setWalletAddress={setWalletAddress} />
    </>
  );
}
