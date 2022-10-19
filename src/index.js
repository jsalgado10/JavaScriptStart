console.log("you are ready");
import "./index.css";
import { isValid } from "./utils";
import { data } from "./data";

console.log(isValid(null));

let filteredData = data;

const state = {
  items: data,
  currentItem: {
    name: "",
    size: "",
    price: 0,
    category: "",
  },
};

const getCheapestItem = () => {
  return filteredData.reduce((acc, cur) => {
    if (acc.price < cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 9999);
};

const getExpensierItem = () => {
  return filteredData.reduce((acc, cur) => {
    if (acc.price > cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 0);
};

const displayCheapest = () => {
  const parent = document.getElementById("stats");
  const divName = "cheapest-div";
  const existing = document.getElementById(divName);
  if (existing) {
    parent.removeChild(existing);
  }

  const cheapest = getCheapestItem();

  const div = document.createElement("div");
  div.id = divName;
  div.innerHTML = `The Cheapest item is ${cheapest.name} for ${cheapest.price}`;
  parent.appendChild(div);
};

const displayExpensive = () => {
  const parent = document.getElementById("stats");
  const divName = "expensive-div";
  const existing = document.getElementById(divName);
  if (existing) {
    parent.removeChild(existing);
  }

  const cheapest = getExpensierItem();

  const div = document.createElement("div");
  div.id = divName;
  div.innerHTML = `The Expensive item is ${cheapest.name} for ${cheapest.price}`;
  parent.appendChild(div);
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

const deleteItem = (id) => {
  const itemIndex = state.items.findIndex((i) => i.id === id);
  if (itemIndex >= 0) {
    const tempData = Array.from(state.items);
    tempData.splice(itemIndex, 1);
    state.items = tempData;
    filteredData = tempData;
    buildTable();
  }
};

const buildDeleteLinks = () => {
  const deletes = document.querySelectorAll("td[data-delete]");
  for (let del of deletes) {
    del.addEventListener("click", (e) => {
      deleteItem(+e.currentTarget.id.substring(3));
    });
  }
};

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
    html += `<td style="cursor:pointer" id="tr-${id}" data-delete=${id}>Delete</td>`;
    html += `</tr>`;
  });
  html += `</table>`;
  document.getElementById("items").innerHTML = html;

  buildDeleteLinks();
  displayCheapest();
  displayExpensive();
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
  console.log("filter data");
  console.log(property);
  return function (value) {
    console.log(value);
    console.log("filter data return");
    return data.filter((i) => i[property] === value);
  };
};

const onFilterChange = (element) => {
  if (element.target.value === "0") {
    filteredData = data;
  } else {
    filteredData = state.items.filter(
      (d) => d.category === element.target.value
    );
  }
  buildTable();
};

const buildFilterBox = () => {
  const categories = data.unique("category");
  let html = '<select id="category-filter">';
  html += '<option value="0">All Categories</option>';
  categories.map((category) => {
    html += `<option value="${category}">${category}</option>`;
  });
  html += "</select>";
  document.getElementById("filter").innerHTML = html;
  const newSelect = document.getElementById("category-filter");
  newSelect.addEventListener("change", onFilterChange);
};

buildFilterBox();

const curriedFilter = filterData("category");
// const fruits = curriedFilter("fruit");
// const drinks = curriedFilter("beverages");
// const candy = curriedFilter("candy");
const findCategoryMostExpensive = (records) => {
  console.log("filter most expensive");
  return records.reduce((acc, cur) => {
    return acc.price > cur.price ? acc : cur;
  }, 0);
};

const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const pipedFn = compose(findCategoryMostExpensive, curriedFilter)("beverages");
console.log(pipedFn);
// console.log(fruits);
// console.log(drinks);
// console.log(candy);

const Box = (x) => ({
  map: (f) => Box(f(x)),
  inspect: `Box(${x})`,
  fold: (f) => f(x),
});

const getFoodBetweenOneandTwo = (data) =>
  Box(data)
    .map((x) => x.filter((f) => f.category == "beverages"))
    .map((x) => x.filter((f) => f.price > 1))
    .map((x) => x.filter((f) => f.price < 2))
    .map((x) => x.map((f) => f.price))
    .map((x) => x.map((f) => parseFloat(f)))
    .map((x) => x.reduce((a, c) => a + c), 0)
    .fold((x) => x);

console.log(getFoodBetweenOneandTwo(data));
