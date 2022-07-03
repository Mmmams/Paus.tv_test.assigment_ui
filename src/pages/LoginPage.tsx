import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@material-tailwind/react';

import { setUser } from '../redux/slices/userSlice';
import '../styles.css';
import { ethers } from 'ethers';
import { paths } from '../constants';
import { store } from '../redux/store';

const LoginPage: React.FC<{ setAddress(address: string): void }> = ({
  setAddress,
}) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const navigate = useNavigate();

  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setWalletAddress(accounts[0]);
        store.dispatch(setUser(accounts[0]));
        setAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...', error);
      }
    }
  };

  useEffect(() => {
    if (walletAddress) {
      navigate(paths.Home);
    }
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== undefined) {
      await requestAccount();

      // to interact with smart contracts
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  };

  return (
    <div className='flex flex-col w-screen justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-purple-500 main'>
      <Button
        onClick={connectWallet}
        className='px-5 py-4 text-white hover:scale-105 hover:text-black/80 ease-in duration-300 animate-bounce'
        variant='text'
        size='lg'
      >
        Connect Wallet
      </Button>
    </div>
  );
};

export default LoginPage;
