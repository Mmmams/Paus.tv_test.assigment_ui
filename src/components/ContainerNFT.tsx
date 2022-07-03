import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { contractGenerator } from "../utils/contractGenerator";
import {
  LOCAL_IPFS_NODE_URL,
  maketplaceAbi,
  marketplaceAddress,
  tokenAbi,
  tokenAddress,
} from "../constants";
import { Button } from "@material-tailwind/react";

export const ContainerNFT = (props: any) => {
  let navigate = useNavigate();
  const tokenContract = contractGenerator(tokenAddress, tokenAbi, "goerli");
  const IPFS_URL = LOCAL_IPFS_NODE_URL;
  const marketplaceContract = contractGenerator(
    marketplaceAddress,
    maketplaceAbi,
    "goerli"
  );

  const [metaData, setMetaData] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [name, setName] = useState<any>(null);

  const { uri, index, user } = props;
  const id = index;
  const amount = 1;
  const data = "0x";
  const bought = async () => {
    return await tokenContract.balanceOf(user, id);
  };

  const getPrice = async (id: number | string) => {
    return await marketplaceContract.idToNft(id);
  };

  const getMetaData = async (uri: string) => {
    const data = await axios.get(`${IPFS_URL}${uri}`);
    setMetaData(data.data);
    setName(JSON.parse(metaData.video).name);
  };

  useEffect(() => {
    getMetaData(uri);
    getPrice(id).then((data) => setPrice(data.price.toNumber()));
  }, [id]);

  const buyOrWatchHandler = async () => {
    const allowance = await bought();
    if (allowance.toNumber() === 0) {
      return await marketplaceContract.buy(id, amount, data, {
        value: price,
      });
    }
    navigate(`/watch`, { state: JSON.parse(metaData.video) });
  };

  const logo = metaData
    ? `${IPFS_URL}/${metaData.image}`
    : require("../assets/logo.png");

  return (
    <div className="flex flex-col justify-start items-center px-20 py-14 bg-white rounded-xl my-5 mx-5 h-fit z-10 transition-all ease-in-out duration-300 shadow hover:shadow-2xl hover:shadow-slate-900">
      <img src={logo} alt="NFT" className="w-64 h-64 p-2" />
      <div className="flex flex-col w-full flex font-bold leading-relaxed justify-center items-center">
        <span className="mb-2 text-2xl font-bold text-indigo-500">
          {name ? name : "name"}
        </span>
        <div className="flex flex-row w-full justify-between  mb-3">
          <span className="text-3xs font-bold text-black">ID {id}</span>
          <span className="text-3xs font-bold text-black">{price} WEI</span>
        </div>
        <Button
          className="rounded-lg bg-indigo-600 px-8 py-3 capitalize transition-all ease-in-out duration-300 hover:scale-105"
          onClick={buyOrWatchHandler}
        >
          Buy / Watch
        </Button>
      </div>
    </div>
  );
};
