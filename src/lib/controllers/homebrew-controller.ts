import { $ } from 'bun';

import type { Package, PackageType, Response, Update } from '@/types';

export default class HomebrewController {
  private listToOptions(input: string): Package[] {
    const output = input
      .split('\n')
      .filter((row: string) => {
        if (row.length === 0) return false;
        if (row.includes('==>')) return false;
        return true;
      })
      .map((result: string) => {
        const splitString = result.split(': ');

        return {
          name: splitString[0],
          description: splitString[1],
        };
      });

    return output;
  }

  async search(type: string, query: string): Promise<Package[]> {
    const output = await $`brew desc ${type} --name ${query} --eval-all`.text();

    const results = this.listToOptions(output);

    return results;
  }

  async list(type: PackageType): Promise<Package[]> {
    let output: string = '';

    switch (type) {
      case '--formula':
        output = await $`brew leaves | xargs brew desc --eval-all`.text();
        break;
      case '--cask':
        output = await $`brew ls --casks | xargs brew desc --eval-all`.text();
        break;
    }

    const results = this.listToOptions(output);

    return results;
  }

  async getUpdates(): Promise<Update[]> {
    const updatesArr: Update[] = [];

    const updates = await $`brew outdated --json=v2`.text();

    const updatesObj: Response = JSON.parse(updates);

    updatesObj.formulae.forEach((formula) =>
      updatesArr.push({
        name: formula.name,
        installed_versions: formula.installed_versions,
        new_version: formula.current_version,
        type: 'Formula',
      }),
    );

    updatesObj.casks.forEach((cask) =>
      updatesArr.push({
        name: cask.name,
        installed_versions: cask.installed_versions,
        new_version: cask.current_version,
        type: 'Cask',
      }),
    );

    return updatesArr;
  }

  async tap(path: string) {
    try {
      await $`brew tap ${path}`.text();

      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async install(type: PackageType, name: string) {
    try {
      await $`brew install ${type} ${name} --quiet`.text();

      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async uninstall(type: PackageType, name: string, zap: boolean = false) {
    try {
      await $`brew uninstall ${type} ${zap ? '--zap' : ''} ${name} --quiet`.text();

      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async update(packages: string[]) {
    try {
      await $`brew upgrade ${packages.join(' ')}`.text();
      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
