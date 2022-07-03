import React, { useEffect, useState } from "react";
import { ContainerNFT } from "../components/ContainerNFT";

import { contractGenerator } from "../utils/contractGenerator";
import {
  tokenAddress,
  marketplaceAddress,
  tokenAbi,
  maketplaceAbi,
} from "../constants";

import "../styles.css";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice";
import { Loader } from "../components/Loader/Loader";

const HomePage: React.FC = () => {
  const tokenContract = contractGenerator(tokenAddress, tokenAbi, "goerli");
  const marketplaceContract = contractGenerator(
    marketplaceAddress,
    maketplaceAbi,
    "goerli"
  );
  const userObj = useSelector(userSelector);

  const [latestID, setLatestID] = useState(0);
  const [baseURI, setBaseURI] = useState("");
  const [URIs, setURIs] = useState<any>([]);
  const [IDs, setIDs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTotalIDs = async () => {
    return await marketplaceContract.getCurrentId();
  };

  const getBaseURI = async () => {
    return await tokenContract.uri(latestID);
  };

  const getURI = async (id: number) => {
    return await tokenContract.idToUri(id);
  };

  const formatedAmount = (amount: any, dec: number, fixed = 0) => {
    return (amount / dec).toFixed(fixed);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    URIs.length !== 0 ? setIsLoading(false) : null;
    getTotalIDs().then((data: any) => setLatestID(data.toNumber()));
    getBaseURI().then((data: any) => setBaseURI(data));
  }, [marketplaceContract, tokenContract, URIs]);

  useEffect(() => {
    for (let i = 1; i <= latestID; i++) {
      getURI(i).then((data: any) => {
        setURIs((oldArray: any) => [...oldArray, data]);
        setIDs((oldArray: any) => [...oldArray, i]);
      });
    }
  }, [latestID]);

  return (
    <div className="flex w-screen flex-column bg-gradient-to-r from-sky-500 to-purple-500 home-container flex-wrap items-start pl-5">
      {URIs.length > 0 ? (
        URIs.map((uri: string, index: number) => (
          <ContainerNFT
            uri={uri}
            index={IDs[index]}
            key={index}
            user={userObj.user}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default HomePage;
