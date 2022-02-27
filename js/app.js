const Coktail = () => {
  const inputId = document.getElementById("inputid");
  spinner();
  const inputValue = inputId.value;
  inputId.value = "";
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`
  )
    .then((res) => res.json())
    .then((data) => displayShow(data.drinks));
};
// Coktail();

const displayShow = (Coktail) => {
  const cards = document.getElementById("card");
  cards.textContent = "";
  Coktail.forEach((drink) => {
    // console.log(drink);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card border p-5">
    <img class="w-100"  src="${
      drink.strDrinkThumb
    }" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${drink.strDrink}</h5>
      <p class="card-text">
        ${drink.strInstructionsIT.slice(0, 100)}
      </p>
      <button class="btn-delete btn btn-danger">Delete</button>
      <button onclick="displayId(${
        drink.idDrink
      })" class="btn btn-success">Details</button>
    </div>
    </div>
  
    `;
    cards.appendChild(div);
    deletes();
    block();
  });
};

const displayId = (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => details(data.drinks));
};

const details = (show) => {
  const showDetails = document.getElementById("show");
  showDetails.textContent = "";
  show.forEach((shows) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card border p-5">
        <img class="w-100"  src="${shows.strDrinkThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${shows.strAlcoholic}</h5>
          <p class="card-text">
            Glass:${shows.strGlass}
          </p>
          <button class="btn-delete btn btn-danger">Delete</button>
          
        </div>
        </div>`;

    showDetails.appendChild(div);
    deletes();
  });
};

//delete
const deletes = () => {
  const deletes = document.getElementsByClassName("btn-delete");
  for (const dele of deletes) {
    dele.addEventListener("click", function (e) {
      e.target.parentNode.parentNode.style.display = "none";
    });
  }
};

//spinner
const spinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const block = () => {
  document.getElementById("spinner").style.display = "none";
};
