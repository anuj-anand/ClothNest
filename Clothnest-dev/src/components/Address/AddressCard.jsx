import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useAddressHandler } from "../../customHooks/Customhooks";
import { useData } from "../../contexts";

export const AddressCard = ({ address }) => {
  const { removeAddress } = useAddressHandler();
  const { setEditAddress, setShowAddressModal } = useData();
  return (
    <div className="address-list-item">
      <div className="address-item-row">
        <div className="address-username">{address.name}</div>
        <div className="address-mobile">+91 - {address.phone}</div>
      </div>
      <div className="address-item-row address-row">
        <div className="address-item">{address.street}, </div>
        <div className="address-item">{address.city}, </div>
        <div className="address-item">{address.state} </div>
        <div className="address-item">- {address.pincode}</div>
      </div>
      <div className="address-item-row address-row">
        <div className="address-item">{address.email}</div>
      </div>
      <div className="address-button-container addressList-button-container">
        <button
          type="submit"
          className="save-address-button"
          onClick={() => {
            setShowAddressModal(true);
            setEditAddress(address);
          }}
          title="Edit Address"
        >
          <ModeEditIcon /> Edit
        </button>
        <button
          onClick={() => removeAddress(address._id)}
          className={
            address._id === 1
              ? "cancel-address-button btn-disabled"
              : "cancel-address-button"
          }
          title="Delete Address"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
