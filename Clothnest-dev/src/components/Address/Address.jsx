import React from "react";
import { useData } from "../../contexts";
import "./Address.css";
import { AddressCard } from "./AddressCard";
import { AddressModal } from "./AddressModal";

export const Address = () => {
  const { state, showAddressModal, setShowAddressModal } = useData();
  const addressList = [...state.address];

  return (
    <>
      {addressList.length === 0 ? (
        <>
          <p className="no-address-para">No Saved Address found</p>
        </>
      ) : (
        <div className="address-list">
          {addressList.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      )}
      <div
        className="new-address-button"
        onClick={() => setShowAddressModal(true)}
      >
        + Add New Address
      </div>

      {showAddressModal && (
        <AddressModal setShowAddressModal={setShowAddressModal} />
      )}
    </>
  );
};
