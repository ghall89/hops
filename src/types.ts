export enum PackageType {
  formula = '--formula',
  cask = '--cask',
}

export interface Package {
  name: string;
  description: string;
}

export interface Update {
  name: string;
  installed_versions: string[];
  new_version: string;
  type: 'Cask' | 'Formula';
}

export interface Formula {
  name: string;
  installed_versions: string[];
  current_version: string;
  pinned: boolean;
  pinned_version: string | null;
}

export interface Cask {
  name: string;
  installed_versions: string[];
  current_version: string;
}

export interface Response {
  formulae: Formula[];
  casks: Cask[];
}
