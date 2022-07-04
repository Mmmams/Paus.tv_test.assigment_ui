import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ContainerNFT } from '../components/ContainerNFT';
import { contractGenerator } from '../utils/contractGenerator';
import {
  tokenAddress,
  marketplaceAddress,
  tokenAbi,
  maketplaceAbi,
} from '../constants';
import { userSelector } from '../redux/slices/userSlice';
import { Loader } from '../components/Loader/Loader';
import '../styles.css';

const HomePage: React.FC = () => {
  const tokenContract = contractGenerator(tokenAddress, tokenAbi, 'goerli');
  const marketplaceContract = contractGenerator(
    marketplaceAddress,
    maketplaceAbi,
    'goerli'
  );
  const userObj = useSelector(userSelector);

  const [latestID, setLatestID] = useState(0);
  const [baseURI, setBaseURI] = useState(null);
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

  useEffect(() => {
    getTotalIDs().then((data: any) => {
      setLatestID(data.toNumber());
      setIsLoading(false);
    });
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex w-screen flex-column bg-gradient-to-r from-sky-500 to-purple-500 home-container flex-wrap justify-center items-center pl-5'>
          {latestID > 0 ? (
            URIs.map((uri: string, index: number) => (
              <ContainerNFT
                uri={uri}
                index={IDs[index]}
                key={index}
                user={userObj.user}
              />
            ))
          ) : (
            <div className='flex justify-center items-center px-20 py-14 bg-white rounded-xl my-5 mx-5'>
              <span className='text-lg uppercase font-bold'>
                There are no NFT yet. Create first!
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
