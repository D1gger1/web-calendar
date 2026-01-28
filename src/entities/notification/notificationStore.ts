import { create } from 'zustand';

interface NotificationState {
  message: string | null;
  isOpen: boolean;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  isOpen: false,

  showNotification: (message) => {
    set({ message, isOpen: true });

    setTimeout(() => {
      set({ isOpen: false, message: null });
    }, 3000);
  },

  hideNotification: () => set({ isOpen: false, message: null }),
}));