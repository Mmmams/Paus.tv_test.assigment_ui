import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import PlayVideoPage from '../pages/PlayVideoPage';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/slices/userSlice';
import { paths } from '../constants';

const Navigator: React.FC<{
  setWalletAddress(walletAddress: string): void;
}> = ({ setWalletAddress }) => {
  const [isEthereum, setIsEthereum] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const currentUser = useSelector(userSelector);

  useEffect(() => {
    if (window.ethereum) {
      setIsEthereum(true);
    } else {
      setIsEthereum(false);
    }
  }, []);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          currentUser.user.length === 0 ? (
            <Navigate replace to={paths.Login} />
          ) : (
            <HomePage />
          )
        }
      />
      <Route
        path='/login'
        element={
          isEthereum ? (
            <LoginPage setAddress={setAddress} />
          ) : (
            <ErrorPage errorTitle={'You need to get Metamask extension'} />
          )
        }
      />
      <Route path='*' element={<ErrorPage />} />
      <Route
        path='/watch'
        element={
          currentUser.user.length === 0 ? (
            <Navigate replace to={paths.Login} />
          ) : (
            <PlayVideoPage />
          )
        }
      />
    </Routes>
  );
};

export default Navigator;
