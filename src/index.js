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
