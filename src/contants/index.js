const getData = async (url) => {
  const data = await fetch(`${url}`);
  return data;
};
const role = {
  user:"users",
  admin:"admin"
}
export { getData, role };
