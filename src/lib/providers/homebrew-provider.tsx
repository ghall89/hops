import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { create } from 'zustand';

import type { Package } from '@/types';
import { PackageType } from '@/types';

import HomebrewController from '../controllers/homebrew-controller';

const HomebrewContext = createContext<{
  installedCasks: Package[];
  installedFormulae: Package[];
  loading: boolean;
}>({
  installedCasks: [],
  installedFormulae: [],
  loading: false,
});

export function useHomebrew() {
  return useContext(HomebrewContext);
}

interface HomebrewStore {
  installedFormulae: Package[];
  installedCasks: Package[];
  loading: false;
  setInstalledPackages: () => void;
}

const useHomebrewStore = create<HomebrewStore>((set) => ({
  installedFormulae: [],
  installedCasks: [],
  loading: false,
  setInstalledPackages: async () => {
    const brew = new HomebrewController();

    const formulae = await brew.list(PackageType.formula);
    const casks = await brew.list(PackageType.cask);

    set({ installedFormulae: formulae, installedCasks: casks });
  },
}));

interface HomebrewProviderProps {
  children: ReactNode;
}

export default function HomebrewProvider({ children }: HomebrewProviderProps) {
  const { installedCasks, installedFormulae, loading, setInstalledPackages } =
    useHomebrewStore();

  useEffect(() => {
    setInstalledPackages();
  }, []);

  return (
    <HomebrewContext.Provider
      value={{ installedCasks, installedFormulae, loading }}
    >
      {children}
    </HomebrewContext.Provider>
  );
}
