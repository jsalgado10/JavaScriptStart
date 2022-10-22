export const createToast = (text, title = "", duration = 4000, type) => {
  const toastElem = document.createElement("div");

  toastElem.classList.add("toast");
  if (type) {
    toastElem.classList.add(type);
  }

  const titleElem = document.createElement("p");
  titleElem.classList.add("t-title");
  titleElem.innerHTML = title;
  toastElem.appendChild(titleElem);

  const textElem = document.createElement("p");
  textElem.classList.add("t-text");
  if (Array.isArray(text)) {
    const s = text
      .map((s) => {
        if (typeof s === "object") {
          return s.name;
        } else {
          return s;
        }
      })
      .join(", ");
    textElem.innerHTML = s;
  } else {
    textElem.innerHTML = text;
  }

  toastElem.appendChild(textElem);

  const toastContainer = document.getElementById("toastContainer");
  toastContainer.appendChild(toastElem);

  setTimeout(() => {
    toastElem.classList.add("active");
  }, 1);

  setTimeout(() => {
    toastElem.classList.remove("active");
    setTimeout(() => {
      toastElem.remove();
    }, 350);
  }, duration);
};
