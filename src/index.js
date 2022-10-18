console.log("you are ready");
import "./index.css";
import { isValid } from "./utils";
import { data } from "./data";

console.log(isValid(null));

let filteredData = data;

const state = {
  item: data,
  currentItem: {
    name: "",
    size: "",
    price: 0,
    category: "",
  },
};

const changeState = (element) => {
  const { id, value } = element.target;
  if (!isValid(id) || !isValid(value)) return;

  setValue(id, value);

  const result = {
    ...state,
    currentItem: {
      ...(state.currentItem[id] = value),
    },
  };
  console.log(result);
  return result;
};

const setValue = (id, value) => {
  if (isValid(value)) {
    document.getElementById(id).value = value;
  }
};

const inputs = document.getElementsByTagName("input");

for (let input of inputs) {
  input.addEventListener("change", changeState);
}

const buildTable = () => {
  console.log(filteredData);
  let html = '<table style="width:90%; margin: 20px auto; color: #000">';
  html += "<tr><th>Product</th>";
  html += "<th>Size</th>";
  html += "<th>Price</th>";
  html += "<th>Category</th>";
  html += "<th>Delete</th></tr>";
  filteredData.map((item) => {
    const { name, id, price, category, size } = item;
    html += `<tr><td>${name}</td>`;
    html += `<td>${size}</td>`;
    html += `<td>${price}</td>`;
    html += `<td>${category}</td>`;
    html += `<td><button>Delete</button></td>`;
    html += `</tr>`;
  });
  html += `</table>`;
  document.getElementById("items").innerHTML = html;
};

buildTable();

Array.prototype.unique = function (field) {
  const newArray = [];
  this.forEach((record) => {
    const { [field]: targetField } = record;
    if (!newArray.includes(targetField)) {
      newArray.push(targetField);
    }
  });
  return newArray;
};

const filterData = (property) => {
  return function (value) {
    return data.filter((i) => i[property] === value);
  };
};

// const curriedFilter = filterData("category");
// const fruits = curriedFilter("fruit");
// const drinks = curriedFilter("beverages");
// const candy = curriedFilter("candy");

// console.log(fruits);
// console.log(drinks);
// console.log(candy);
