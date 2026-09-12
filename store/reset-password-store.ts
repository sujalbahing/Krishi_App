import { create } from "zustand";

type ResetPasswordStore = {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

export const useResetPasswordStore = create<ResetPasswordStore>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: "" }),
}));