//Array to save the object and properties when user clicks add to basket.
let Basketarray = []
// Create object with property of: name,price,rating. category and image.
const pokemonData = [
    {
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
    for (let i = 0; i < pokemonData.length; i++) {
        // Access each property of the current Pokémon
        const id = pokemonData[i].id;
        const name = pokemonData[i].name;
        const price = pokemonData[i].price;
        const rating = pokemonData[i].rating;
        const category = pokemonData[i].category;
        const image = pokemonData[i].image;
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

    }
}
/**
   add the object property that is stored in an arrary with the push method and keep track of the id in the object property
   to display how many id is inside the basket.
   */
addBasket = (listItem, pokemon, id) => {
    // Add event listener to the button inside the listItem
    const addBtn = listItem.querySelector(".add-btn");
    addBtn.addEventListener('click', () => addToBasketAndCalculatePrice(listItem, pokemon, id));
}

const addToBasketAndFindRightId = (id, listItem, pokemon) => {
    const idCounter = listItem.querySelector(".id-counter");
    console.log("Clicked Pokemon:", pokemon);
    // Add the selected Pokemon to the array with the specified quantity of the id that is inside the array and multiply with price.
    Basketarray.push(pokemon);
    const idCounts = {};
    Basketarray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        console.log(idCounts[id] * pokemon.price)
    });

    for (const id in idCounts) {
        idCounter.innerHTML = `${idCounts[id]}`;
    }

    console.log(Basketarray, Basketarray.length)
}
/**
  Delete the object property that is stored in an array, track the clicked object with the id parameter and
  use the splice method do display the new array. This part of this code was taken from Stakoverflow.
  */
/*
*/
const deleteBasket = (listItem, pokemon) => {
    const deleteBtn = listItem.querySelector(".delete-btn");
    const idCounter = listItem.querySelector(".id-counter");
    deleteBtn.addEventListener("click", function () {
        // code from stakeoverflow
        const indexToRemove = Basketarray.findIndex(item => item.id === pokemon.id);
        if (indexToRemove !== -1) {
            Basketarray.splice(indexToRemove, 1);
            // Update the count 
            const idCount = Basketarray.filter(item => item.id === pokemon.id).length;
            idCounter.innerHTML = `${idCount || 0}`;
            console.log(Basketarray);
        }
    });
}
/**
    * Change the price when user clicks the + button, the id in the array is used to calculate
    * how many objects is inside the array and then multiply it with the price to get the right value.
    */
const updatePriceCount = (id, pokemon, listItem) => {
    const addBtn = listItem.querySelector(".add-btn");
    addBtn.addEventListener('click', () => findRightIndexAndShowPrice(id, pokemon, listItem));
}
/**
   * Change the price when user clicks the - button, the id in the array is used to calculate
   * how many objects is inside the array and then multiply it with the price to get the right value.
   */
const decreasePriceCount = (id, pokemon, listItem) => {
    const addBtn = listItem.querySelector(".delete-btn");
    // You can update your Basketarray or perform other actions based on the new price
    addBtn.addEventListener('click', () => findRightIndexAndShowPrice(id, pokemon, listItem));
}

/** 
   *Function for displaying the total price of the choosen product, when the user increments the value
   *this function takes the id of the product and multiplies it with the pokemon id to display the total value price.
   */
const findRightIndexAndShowPrice = (id, pokemon, listItem) => {
    const priceCounter = listItem.querySelector(".price-counter");
    const idCounts = {};
    Basketarray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        console.log(idCounts[id]);
        let sumAll = idCounts[id] * pokemon.price;
        priceCounter.innerHTML = `Total Price: ${sumAll}$`;
    });
}


const addToBasketAndCalculatePrice = (listItem, pokemon, id) => {
    const idCounter = listItem.querySelector(".counter");
    console.log("Clicked Pokemon:", pokemon);
    // Add the selected Pokemon to the array with the specified quantity
    Basketarray.push(pokemon);
    const idCounts = {};
    Basketarray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        console.log(idCounts[id] * pokemon.price)
    });

    for (const id in idCounts) {
        idCounter.innerHTML = `Quantity: ${idCounts[id]}`;
    }

    console.log(Basketarray, Basketarray.length)
    /**
    for (let i = 0; i < pokemonData.length; i++) {
        console.log(Basketarray[i].name.includes(pokemon))
    }
     */
}
displayPokemon();


