// Create object with property of: name,price,rating. category and image.
const pokemonData = [
    {
        name: "Pikachu",
        price: 25.99,
        rating: 4.5,
        category: "Electric",
        image: "assets/img/pikachu.jpg",
    },
    {
        name: "Charmander",
        price: 49.99,
        rating: 4.8,
        category: "Fire/Flying",
        image: "assets/img/charmander.jpg",
    },
    {
        name: "Bulbasaur",
        price: 19.99,
        rating: 4.2,
        category: "Grass/Poison",
        image: "assets/img/bulbasaur.jpg",
    },
    {
        name: "Squirtle",
        price: 22.99,
        rating: 4.3,
        category: "Water",
        image: "assets/img/squirtle.jpg",
    },
    {
        name: "Graveler",
        price: 18.99,
        rating: 4.1,
        category: "Rock",
        image: "assets/img/graveler.jpg",
    },
    {
        name: "Mewtwo",
        price: 59.99,
        rating: 4.9,
        category: "Psychic",
        image: "assets/img/mewtwo.jpg",
    },
    {
        name: "Eevee",
        price: 29.99,
        rating: 4.6,
        category: "Normal",
        image: "assets/img/eevee.jpg",
    },
    {
        name: "Jolteon",
        price: 39.99,
        rating: 4.7,
        category: "Electric",
        image: "assets/img/jolteon.jpg",
    },
    {
        name: "Mew",
        price: 69.99,
        rating: 5.0,
        category: "Psychic",
        image: "assets/img/mew.jpg",
    },
    {
        name: "Lugia",
        price: 34.99,
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
        const name = pokemonData[i].name;
        const price = pokemonData[i].price;
        const rating = pokemonData[i].rating;
        const category = pokemonData[i].category;
        const image = pokemonData[i].image;
        // Create a list item
        const listItem = document.createElement("li");
        listItem.classList.add("pokemon-item");
        console.log(pokemonData[i].name)
    
         // Create HTML content for the list item
      listItem.innerHTML = `
      <div class="property-style">
        <h2>${name}</h2>
        <p>Price: $${price}</p>
        <p>Rating: ${rating}</p>
        <p>Category: ${category}</p>
        <img src="${image}" alt="${name}" width="100" class="pokemon-avatar">
        <button type="button" id="add-btn"> + </button>
        <p> ${pokemonData.length}</p>
        <div>
      `;
    
      // Append the list item to the list
      pokemonList.appendChild(listItem);
    
    }
  }
  displayPokemon();