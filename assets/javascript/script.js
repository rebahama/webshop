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


displayPokemon = () => {
    /**
Loop over the object and properties with a for loop and then
create a class to put the data inside the class and output the data
in the html file
*/

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
        if (id === 0) {
            let id = "Nothing in basket"
        }
        else if (id != 0) {

        }
        listItem.innerHTML = `
      <div class="property-style">
        <h2>${name}</h2>
        <p>Price: $${price}</p>
        <p>Rating: ${rating}</p>
        <p>Category: ${category}</p>
        <img src="${image}" alt="${name}" width="100" class="pokemon-avatar">
        <button type="button" class="add-btn"> + </button>
        <p> hello </p>
        <button type="button" class="delete-btn"> - </button>
        
        <p class="id-counter">${id < 0 ? { id } : " 0 "}</p>
        <div>
      `;

        // Append the list item to the list
        pokemonList.appendChild(listItem);
        addBasket(listItem, pokemonData[i]);
        deleteBasket(listItem, pokemonData[i].name);


    }
}

addBasket = (listItem, pokemon) => {
    /**
    add the object property that is stored in an arrary with the push method.
    */
    // Add event listener to the button inside the listItem
    const addBtn = listItem.querySelector(".add-btn");
    const idCounter = listItem.querySelector(".id-counter");
    addBtn.addEventListener("click", function () {
        console.log("Clicked Pokemon:", pokemon);

        // Add the selected Pokemon to the array with the specified quantity

        Basketarray.push(pokemon);
        const idCounts = {};

        Basketarray.forEach(pokemon => {
            const id = pokemon.id;
            idCounts[id] = (idCounts[id] || 0) + 1;
        });

        for (const id in idCounts) {
            idCounter.innerHTML = `${idCounts[id]}`;
        }

        console.log(Basketarray, Basketarray.length)
        /**
        for (let i = 0; i < pokemonData.length; i++) {
            console.log(Basketarray[i].name.includes(pokemon))
        }
         */
    });

}

deleteBasket = (listItem, pokemon) => {
    /**
     Delete the object property that is stored in an arrary with the pop method.
     */
    const addBtn = listItem.querySelector(".delete-btn");
    addBtn.addEventListener("click", function () {
        console.log("Clicked Pokemon:", pokemon);
        // Remove the clicked Pokemon from the Basketarray
        Basketarray.pop(pokemon)
        console.log(Basketarray, Basketarray[0].length)

    });

}

displayPokemon();