import prompts from 'prompts';
import { brewSearch } from '../brew';

export default async () => {
  // request search params
  const { searchQuery } = await prompts({
    type: 'text',
    name: 'searchQuery',
    message: 'Package name:',
    validate: (value: string) =>
      value.length < 1 ? 'Package name cannot be blank!' : true,
  });

  // search homebrew and create an array of options
  const choices = await brewSearch(searchQuery);

  if (!choices) return;

  // prompt user to select from results
  const { installSelection } = await prompts([
    {
      type: 'select',
      name: 'installSelection',
      message: 'Select a package...',
      choices,
    },
  ]);
};
