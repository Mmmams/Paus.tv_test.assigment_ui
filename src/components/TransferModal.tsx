import React, {useEffect, useState} from 'react';

import '../styles.css';
import {Contract} from "ethers";
import {Input} from "@material-tailwind/react";

export const TransferModal: React.FC<{
    setOpenModal(condition: string | number): void;
    contract: Contract;
    id: number | string;
}> = ({setOpenModal, contract, id}) => {
    const [address, setAddress] = useState<string>('')
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] =
        useState<boolean>(true);

    useEffect(() => {
        if (address) {
            setIsConfirmButtonDisabled(false)
        }
    }, [address])

    const handleConfirm = async () => {
        await contract.transfer(address, id);
        setOpenModal(0)
    }
    return (
        <>
            <div
                className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                    <div
                        className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        <div
                            className='flex items-start justify-between p-5  rounded-t'>
                            <h3 className='text-3xl font-semibold mr-10'>
                                Send your NFT to another address.
                            </h3>
                        </div>
                        <div className='flex justify-center items-center h-20'>
                            <Input
                                className='p-2 mx-4 w-96 border border-slate-300 hover:border-indigo-300 rounded '
                                size='md'
                                variant='outlined'
                                placeholder='Address'
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div
                            className='flex items-center justify-end p-6  rounded-b'>
                            <button
                                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:opacity-70'
                                type='button'
                                onClick={() => setOpenModal(0)}
                            >
                                Close
                            </button>
                            <button
                                className={
                                    isConfirmButtonDisabled
                                        ? 'cursor-not-allowed disabled:opacity-80 bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                        : 'bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                }
                                type='button'
                                disabled={isConfirmButtonDisabled}
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
    );
};
