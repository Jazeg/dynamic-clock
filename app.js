const CLOCK_CONTAINER = document.querySelector(".clock-container");

const createItem = (index) => {
  const item = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = index;
  item.appendChild(span);
  return item;
};

const createStripe = (numberOfItems) => {
  const stripe = document.createElement("ul");
  stripe.classList.add("stripe");
  for (let i = 0; i < numberOfItems; i++) {
    stripe.appendChild(createItem(i));
  }
  CLOCK_CONTAINER.appendChild(stripe);
};

const moveStripe = (selectedItem, stripe) => {
  const items = Array.from(stripe.children);
  const item = items.find((elem) => elem.textContent === selectedItem);
  if (!item) return;

  const offset = item.offsetTop;
  stripe.style.transform = `translateY(-${offset}px)`;

  items.forEach((elem) => elem.classList.remove("selected"));
  item.classList.add("selected");
};

const updateClock = () => {
  const date = new Date();
  const timeParts = [
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0")
  ].join('').split('');

  const stripes = Array.from(CLOCK_CONTAINER.querySelectorAll(".stripe"));
  stripes.forEach((stripe, index) => moveStripe(timeParts[index], stripe));
};

// Generate stripes
[3, 10, 6, 10, 6, 10].forEach(createStripe);

updateClock();
setInterval(updateClock, 1000);
