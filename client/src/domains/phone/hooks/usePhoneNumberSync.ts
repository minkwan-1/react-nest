import { useState } from "react";
import { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";

export const usePhoneNumberSync = (
  setUserInfo: (u: SetStateAction<signupUserInfo | null>) => void
) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (phone: string) => {
    setPhoneNumber(phone);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber: phone } : null));
  };

  const syncPhoneNumberToUserInfo = () => {
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));
  };

  return {
    phoneNumber,
    setPhoneNumber,
    handlePhoneNumberChange,
    syncPhoneNumberToUserInfo,
  };
};
