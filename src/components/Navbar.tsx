import React from "react";
import { Link } from "react-router-dom";

import { paths } from "../constants";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice";

const Navbar: React.FC<{
  walletAddress: string;
  chainId: number | null;
  setShowModal(condition: boolean): void;
}> = ({ walletAddress, setShowModal, chainId }) => {
  const logo = require("../assets/logo.png");
  const currentUser = useSelector(userSelector);

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black flex items-center hover:text-indigo-500  ease-in duration-150"
            to={paths.Home}
          >
            <img
              className="object-contain h-10 w-10 mr-2"
              src={logo}
              alt="logo-img"
            />
            marketplace
          </Link>
        </div>
        {chainId !== 5 && (
          <h1 className="text-lg uppercase font-bold text-red-500 ml-44 z-50">
            You need to switch your network to Goerli
          </h1>
        )}
        <div
          className={"lg:flex flex-grow items-center"}
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item disabled:true">
              <h2
                onClick={() => {
                  currentUser.user.length !== 0 && setShowModal(true);
                }}
                className={
                  currentUser.user.length === 0
                    ? "cursor-no-drop px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-gray-300"
                    : `cursor-pointer px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-sky-500 hover:text-indigo-500 hover:scale-110 ease-in duration-150 mr-10`
                }
              >
                Create
              </h2>
            </li>
            <li className="nav-item flex items-center">
              {walletAddress ? (
                <h4 className="text-black font-sm ">
                  {walletAddress.slice(0, 5) +
                    "..." +
                    walletAddress.slice(38, 42)}
                </h4>
              ) : (
                <Link
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-black hover:text-indigo-500 hover:scale-110 ease-in duration-150"
                  to={paths.Login}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
