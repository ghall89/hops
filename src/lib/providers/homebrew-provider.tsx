import { useContext, createContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { create } from 'zustand';

import HomebrewController from '../controllers/homebrew-controller';
import { Package, PackageType } from '../controllers/homebrew-controller';

const HomebrewContext = createContext<{
	brew: HomebrewController | null;
	store: HomebrewStore | null;
}>({
	brew: null,
	store: null,
});

export function useHomebrew() {
	return useContext(HomebrewContext);
}

interface HomebrewStore {
	installedFormulae: Package[];
	installedCasks: Package[];
	loading: false;
	setInstalledPackages: (f: Package[], c: Package[]) => void;
}

const useHomebrewStore = create<HomebrewStore>((set) => ({
	installedFormulae: [],
	installedCasks: [],
	loading: false,
	setInstalledPackages: (formulae: Package[], casks: Package[]) => {
		set({ installedFormulae: formulae, installedCasks: casks });
	},
}));

interface HomebrewProviderProps {
	children: ReactNode;
}

export default function HomebrewProvider({ children }: HomebrewProviderProps) {
	const brew = new HomebrewController();
	const store = useHomebrewStore();

	useEffect(async () => {
		const formulae = await brew.list(PackageType.formula);
		const cask = await brew.list(PackageType.cask);

		store.setInstalledPackages(cask, formulae);
	}, []);

	return (
		<HomebrewContext.Provider value={{ brew, store }}>
			{children}
		</HomebrewContext.Provider>
	);
}
