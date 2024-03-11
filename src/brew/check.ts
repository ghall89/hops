// check if homebrew is installed
export default async () => {
  const { stdout } = Bun.spawn(['brew', '-v']);

  const output = await new Response(stdout).text();

  return !output.includes('command not found');
};
