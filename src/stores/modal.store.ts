import { create } from "zustand";

export type ModalType = "success" | "error" | "warning" | "info";

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  showModal: (title: string, message: string, type?: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: "info",
  title: "",
  message: "",
  showModal: (title, message, type = "info") =>
    set({ isOpen: true, title, message, type }),
  closeModal: () => set({ isOpen: false }),
}));
