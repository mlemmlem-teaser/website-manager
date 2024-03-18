const getData = async (url) => {
  const data = await fetch(`${url}`);
  return data;
};

export { getData };
