import { getData } from "./src/contants/index.js";

async function callMockData() {
  const data = await getData("src/data/mockData.json");
  data.json().then((res) => {
    const dataMap = res.map((item, index, currentArray) => {
      return {
        id: index + 1,
        name: item.full_name,
        age: item.age,
      };
    });
    const student15age = dataMap.filter((item) => item.age < 15);
    const studentbang15 = dataMap.findIndex((item) => item.age === 15);
    // find: trả về giá trị đầu tiên tìm thấy
    const student15 = dataMap.find((item) => item.age === 15);

    const number = [1, 2, 3, 4, 5];

    let total = 0;
    for (let i = 0; i < number.length; i++) {
      // 0
      total = total + number[i];
      // 0 + 1 = 1
      // vong lặp thứ 2
      // 1 + 2 = 3
      // vong lặp thứ 3
      // 3 + 3 = 6
    }
    console.log("total", total);

    const totalage = number.reduce((total, item, index, currentArray) => {
      return total + item;
    }, 0);
    // reduce: giúp tính tổng của mảng, trả về 1 giá trị

    console.log(totalage);
  });
}
callMockData();
