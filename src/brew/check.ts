// check if homebrew is installed
export default () => {
  try {
    const { stdout } = Bun.spawn(['brew', '-v']);

    return true;
  } catch {
    return false;
  }
};
