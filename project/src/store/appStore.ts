import { create } from 'zustand';

interface AppState {
  authToken: string;
  activeUser: string;
  sidebarCollapsed: boolean;
  setAuthToken: (token: string) => void;
  setActiveUser: (user: string) => void;
  toggleSidebar: () => void;
}

const tokenFromStorage = localStorage.getItem('repowire_token') || '';

export const useAppStore = create<AppState>((set) => ({
  authToken: tokenFromStorage,
  activeUser: '',
  sidebarCollapsed: false,
  setAuthToken: (token) => {
    localStorage.setItem('repowire_token', token);
    set({ authToken: token });
  },
  setActiveUser: (activeUser) => set({ activeUser }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
