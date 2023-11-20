//Array to save the object and properties when user clicks add to basket.
const Basketarray = [];
const d = new Date();
const day = d.toLocaleString('sv', { weekday: 'long' });
const time = d.getHours();
// Create object with property of: name,price,rating. category and image.
const pokemonData = [{
    id: 1,
    name: "Pikachu",
    price: 30,
    rating: 4.5,
    category: "Electric",
    image: "assets/img/pikachu.jpg",
},
{
    id: 2,
    name: "Charmander",
    price: 50,
    rating: 4.8,
    category: "Fire/Flying",
    image: "assets/img/charmander.jpg",
},
{
    id: 3,
    name: "Bulbasaur",
    price: 20,
    rating: 4.2,
    category: "Grass/Poison",
    image: "assets/img/bulbasaur.jpg",
},
{
    id: 4,
    name: "Squirtle",
    price: 23,
    rating: 4.3,
    category: "Water",
    image: "assets/img/squirtle.jpg",
},
{
    id: 5,
    name: "Graveler",
    price: 20,
    rating: 4.1,
    category: "Rock",
    image: "assets/img/graveler.jpg",
},
{
    id: 6,
    name: "Mewtwo",
    price: 60,
    rating: 4.9,
    category: "Psychic",
    image: "assets/img/mewtwo.jpg",
},
{
    id: 7,
    name: "Eevee",
    price: 30,
    rating: 4.6,
    category: "Normal",
    image: "assets/img/eevee.jpg",
},
{
    id: 8,
    name: "Jolteon",
    price: 40,
    rating: 4.7,
    category: "Electric",
    image: "assets/img/jolteon.jpg",
},
{
    id: 9,
    name: "Mew",
    price: 70,
    rating: 5.0,
    category: "Psychic",
    image: "assets/img/mew.jpg",
},
{
    id: 10,
    name: "Lugia",
    price: 100,
    rating: 4.4,
    category: "Legendary",
    image: "assets/img/lugia.jpg",
},
];

/**
Loop over the object and properties with a for loop and then
create a class to put the data inside the class and output the data
in the html file
*/

displayPokemon = () => {
    // Loop over each Pokémon in the array using a regular for loop
    const basketContainer = document.querySelector(".basket-container")
    basketContainer.style.display = "none";
    for (let i = 0; i < pokemonData.length; i++) {
        // Access each property of the current Pokémon
        const id = pokemonData[i].id;
        const name = pokemonData[i].name;
        const basePrice = pokemonData[i].price;
        const rating = pokemonData[i].rating;
        const category = pokemonData[i].category;
        const image = pokemonData[i].image;
        const price = ((day.toLowerCase() === 'fredag' && time >= 15) || (day.toLowerCase() === 'lördag' || day.toLowerCase() === 'söndag' && time < 3)) ? basePrice * 0.15 + basePrice : basePrice;
        // Create a list item
        const listItem = document.createElement("li");
        listItem.classList.add("pokemon-item");
        // Create HTML content for the list item
        listItem.innerHTML = `
      <div class="property-style">
        <h2>${name}</h2>
        <p> Price: ${price} </p>
        <p>Rating: ${rating}</p>
        <p>Category: ${category}</p>
        <img src="${image}" alt="${name}" width="100" class="pokemon-avatar">
        <button type="button" class="add-btn"> + </button>
        <p class="id-counter"></p>
        <button type="button" class="delete-btn"> - </button>
        <p class="price-counter"> Totalt price: 0 </p>
        <p class="counter"> </p>
        <div>
      `;
        // Append the list item to the list
        pokemonList.appendChild(listItem);
        // Call functions and pass variables
        addBasket(listItem, pokemonData[i], id);
        deleteBasket(listItem, pokemonData[i]);
        updatePriceCount(id, price, listItem);
        decreasePriceCount(id, price, listItem);
        sortByPrice(pokemonData[i], price, listItem);

    }
};
/**
   add the object property that is stored in an arrar with the push method and keep track of the id in the object property
   to display how many id is inside the basket.
   */
const addBasket = (listItem, pokemon, id) => {
    // Add event listener to the button inside the listItem
    const addBtn = listItem.querySelector(".add-btn");
    addBtn.addEventListener('click', () => addToBasketAndCalculatePrice(listItem, pokemon, id));
};

/**
 * Change the price when user clicks the + button, the id in the array is used to calculate
 * how many objects is inside the array and then multiply it with the price to get the right value.
 */
const updatePriceCount = (id, pokemon, listItem) => {
    const addBtn = listItem.querySelector(".add-btn");
    addBtn.addEventListener('click', () => findRightIndexAndShowPrice(id, pokemon, listItem));
};
/**
 * Change the price when user clicks the - button, the id in the array is used to calculate
 * how many objects is inside the array and then multiply it with the price to get the right value.
 */
const decreasePriceCount = (id, pokemon, listItem) => {
    const addBtn = listItem.querySelector(".delete-btn");
    // You can update your Basketarray or perform other actions based on the new price
    addBtn.addEventListener('click', () => findRightIndexAndShowPrice(id, pokemon, listItem));
};

/** 
 *Function for displaying the total price of the choosen product, when the user increments the value
 *this function takes the id of the product and multiplies it with the pokemon id to display the total value price.
 */
const findRightIndexAndShowPrice = (id, pokemon, listItem) => {
    const priceCounter = listItem.querySelector(".price-counter");
    const basketContainer = document.querySelector(".basket-container")
    const priceValueText = priceCounter.textContent;
    const idCounts = {};
    Basketarray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        console.log(idCounts[id]);
        let sumAll = idCounts[id] * pokemon.price;

        if (day.toLowerCase() === 'fredag') {
            const priceFifteen = sumAll * 0.15;
            const newPriceFifteen = sumAll + priceFifteen
            priceCounter.innerHTML = `Total Pre:$${newPriceFifteen >= 0 ? newPriceFifteen : "0"}`;;
            basketContainer.innerHTML = showBasketArea();
        }
        else {
            priceCounter.innerHTML = `Total Price:$${sumAll >= 0 ? sumAll : "0"}`;
            basketContainer.innerHTML = showBasketArea();

        }


    });
};
/**
 * This function returns the html for the basket area when the user clicks on basket, using
 * .map array functions to get acess to the objects inside the area and display that information. This function also filters when there is
 * a object with the same index twice inside the array to not show 2 of the same properites and it shows the length instead to show many of the same
 * id is inside the array.
 */
const showBasketArea = () => {
    const basketContainer = document.querySelector(".basket-container")
    const uniquePokemons = Array.from(new Set(Basketarray.map(pokemon => pokemon.id))).map(id => {
        return Basketarray.find(pokemon => pokemon.id === id);
    });

    return basketContainer.innerHTML = uniquePokemons.map(pokemon =>
        `
    <div class="th-heading" id="pokemon-${pokemon.id}">
    <table>
    <tr>
    </tr>
    <tbody>
    <tr>
    <td> ${pokemon.name} </td>
    <td><img src="${pokemon.image}" alt="${pokemon.name}" width="100" class="pokemon-avatar"> </td>
    <td> ${pokemon.price}$ </td>
    <td> pcs/x ${Basketarray.filter(p => p.id === pokemon.id).length}</td>
    </tr>
    <hr>
    </tbody>
    </table>
    </div>
    `);
}


/**
  Delete the object property that is stored in an array, track the clicked object with the id parameter and
  use the splice method do display the new array. This part of this code was taken from Stakoverflow.
  */
/*
 */
const deleteBasket = (listItem, pokemon) => {
    const deleteBtn = listItem.querySelector(".delete-btn");
    const idCounter = listItem.querySelector(".counter");
    const showTotalPrice = document.querySelector("#total-varukorg");
    const totalBillBasket = document.querySelector(".total-bill-basket");
    const totalPcsBasket = document.querySelector(".total-pcs-basket");

    deleteBtn.addEventListener("click", function () {
        // code from stakeoverflow
        const indexToRemove = Basketarray.findIndex(item => item.id === pokemon.id);
        if (indexToRemove !== -1) {
            Basketarray.splice(indexToRemove, 1);
            // Update the count 
            const idCount = Basketarray.filter(item => item.id === pokemon.id).length;
            idCounter.innerHTML = `Quantity: ${idCount}`;
            console.log(Basketarray);
            const totalPrice = sumAllPriceBasket(Basketarray);
            console.log(totalPrice);
            console.log(`Id av ${idCount}`);
            if (totalPrice > 0) {
                // Update the HTML content only if totalPrice is above zero
                totalBillBasket.classList.add("total-bill-basket")
                totalBillBasket.innerHTML = `Total: ${totalPrice}$`;
                totalPcsBasket.innerHTML = `Items: ${Basketarray.length}`;
            } else {
                // Optionally, you can handle the case where totalPrice is not above zero
                totalBillBasket.innerHTML = `Total:0$`;
                totalPcsBasket.innerHTML = `Items: 0`;
            }

            console.log(Basketarray, Basketarray.length);
        }

    });
};

const sumAllPriceBasket = (basket) => {
    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        total += basket[i].price;
    }

    return total;
}

const addToBasketAndCalculatePrice = (listItem, pokemon, id) => {
    const idCounter = listItem.querySelector(".counter");
    const totalBillBasket = document.querySelector(".total-bill-basket");
    const mondayOffer = document.querySelector(".monday-offer");
    const shippingInfo = document.querySelector(".shipping-info");
    const totalPcsBasket = document.querySelector(".total-pcs-basket");
    const dayAndTime = `Today is ${day} and the time is ${time}`;
    console.log("Clicked Pokemon:", pokemon);
    // Add the selected Pokemon to the array
    Basketarray.push(pokemon);
    const idCounts = {};
    Basketarray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        console.log(idCounts[id] * pokemon.price);
    });
    idCounter.innerHTML = `Quantity: ${idCounts[id]}`;
    const totalPrice = sumAllPriceBasket(Basketarray);
    const shippingPrice = 25
    console.log(totalPrice);
    if (totalPrice > 0) {
        // Update the HTML content only if totalPrice is above zero
        totalBillBasket.classList.add("total-bill-basket")
        totalBillBasket.innerHTML = `Total: ${totalPrice}$`;
        totalPcsBasket.innerHTML = `Items: ${Basketarray.length}`;
        if (day.toLowerCase() === 'måndag' && time < 10) {
            const discountPrice = totalPrice / 10;
            const newTotalPrice = totalPrice - discountPrice
            mondayOffer.innerHTML = ` Today is monday and it¨s before 10 o clock. you get an special offer 10% discount !! Your new Total: ${newTotalPrice}$`;
            if (Basketarray.length > 10) {
                mondayOffer.innerHTML = `No shipping charged! Total: ${totalPrice}$`;
            }
            else if (Basketarray.length < 10) {
                mondayOffer.innerHTML = `Total: ${totalPrice + 2}$`;
            }
        }



    }

    console.log(Basketarray, Basketarray.length);
};
/**
 * Finds the total id of how many pokemon is in the basket and multiplies with the price
 * and shows the total of how many ids is inside the array.
 * 
 */
const addToBasketAndFindRightId = (id, listItem, pokemon) => {
    const idCounter = listItem.querySelector(".id-counter");
    console.log("Clicked Pokemon:", pokemon);
    // Add the selected Pokemon to the array with the specified quantity of the id that is inside the array and multiply with price.
    Basketarray.push(pokemon);
    const idCounts = {};
    Basketarray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        console.log(idCounts[id] * pokemon.price);
    });

    for (const id in idCounts) {
        idCounter.innerHTML = `${idCounts[id]}`;
    }

    console.log(Basketarray, Basketarray.length);
};

// Functions for sorting starts here
const compareByAge = (a, b) => {
    return a.price - b.price;
}

const compareByRating = (a, b) => {
    return a.rating - b.rating;
}

const compareByName = (a, b) => {
    return a.name.localeCompare(b.name);
}

const compareByCategory = (a, b) => {
    return a.category.localeCompare(b.category);
}
const sortByPrice = (pokemonData, listItem) => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Append the list item to the list
        // Clone the array to avoid modifying the original array
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByAge);
        console.log(pokemonData);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = `
    <a href="#" id="sort-btn">Sort By price</a>
    <a href="#" id="name-btn">Sort by name</a>
    <a href="#" id="rating-btn">Sort by rating</a>
    <a href="#" id="category-btn">Sort by category</a>
`;
        displayPokemon(pokemonData);

    }
};

const sortByName = () => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByName);
        console.log(pokemonData);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = `
        <a href="#" id="sort-btn">Sort By price</a>
        <a href="#" id="name-btn">Sort by name</a>
        <a href="#" id="rating-btn">Sort by rating</a>
        <a href="#" id="category-btn">Sort by category</a>
    `;
        displayPokemon(pokemonData);
    }
}

const sortByRating = () => {
    // displayPokemon();
    for (let i = 0; i < pokemonData.length; i++) {
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByRating);
        console.log(pokemonData);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = `
        <a href="#" id="sort-btn">Sort By price</a>
        <a href="#" id="name-btn">Sort by name</a>
        <a href="#" id="rating-btn">Sort by rating</a>
        <a href="#" id="category-btn">Sort by category</a>
    `;
        displayPokemon(pokemonData);
    }

}

const sortByCategory = () => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Append the list item to the list
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByCategory);
        console.log(pokemonData);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = `
        <a href="#" id="home-btn">Back home </a>
    `;
        displayPokemon(pokemonData);
    }
}

const clearBasket = () => {
    Basketarray.splice(0, Basketarray.length);
    showBasketArea();
    console.log(Basketarray)
}

const showBasket = () => {
    // for testing to show and hide basket
    const pokemonContainer = document.querySelector(".pokemon-container");
    const basketContainer = document.querySelector(".basket-container");
    const basketContainerBtn = document.querySelector(".btn-basket-container").classList;
    basketContainerBtn.remove("btn-basket-container-hide");
    basketContainer.style.display = "block";
    pokemonContainer.style.display = "none";

}
const BasketShow = document.getElementById("basket-btn");
BasketShow.addEventListener('click', showBasket)



// Main loading from here:
document.addEventListener('DOMContentLoaded', () => {
    const clearArray = document.getElementById("clear-basket-btn");
    const sortButton = document.querySelector("#sort-btn");
    const sortNameButton = document.querySelector("#name-btn");
    const sortRatingButton = document.querySelector("#rating-btn");
    const sortCategoryButton = document.querySelector("#category-btn");
    sortButton.addEventListener('click', () => sortByPrice(pokemonData));
    sortNameButton.addEventListener('click', () => sortByName(pokemonData));
    sortRatingButton.addEventListener('click', () => sortByRating(pokemonData));
    sortCategoryButton.addEventListener('click', () => sortByCategory(pokemonData));
    clearArray.addEventListener('click', clearBasket);
    displayPokemon(pokemonData);
});
