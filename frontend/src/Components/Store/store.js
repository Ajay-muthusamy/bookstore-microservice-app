import { create } from 'zustand';

const useStore = create((set) => ({
  islogin: false,
  checkislogin: () => set((state) => ({ islogin: !state.islogin })),
}));

export default useStore;
