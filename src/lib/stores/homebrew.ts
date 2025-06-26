import { create } from 'zustand';

import type { Package } from '@/types';
import { PackageType } from '@/types';

import HomebrewController from '../controllers/homebrew-controller';

interface HomebrewStore {
  installedFormulae: Package[];
  installedCasks: Package[];
  loading: boolean;
  initialized: boolean;
  getInstalledPackages: () => void;
}

export const useHomebrewStore = create<HomebrewStore>((set) => ({
  installedFormulae: [],
  installedCasks: [],
  loading: false,
  initialized: true,
  getInstalledPackages: async () => {
    const brew = new HomebrewController();
    set({ loading: true });
    const formulae = await brew.list(PackageType.formula);
    const casks = await brew.list(PackageType.cask);

    set({ installedFormulae: formulae, installedCasks: casks, loading: false });
  },
}));

useHomebrewStore.getState().getInstalledPackages();
