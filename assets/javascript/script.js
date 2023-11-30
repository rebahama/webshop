//Array to save the object and properties when user clicks add to basket.
const basketArray = [];
const d = new Date();
const dayNumber = d.getDay();
const time = d.getHours();
const BasketShow = document.getElementById("basket-btn");
const clearArray = document.getElementById("clear-basket-btn");
const sortButton = document.querySelector("#sort-btn");
const sortNameButton = document.querySelector("#name-btn");
const sortRatingButton = document.querySelector("#rating-btn");
const sortCategoryButton = document.querySelector("#category-btn");
const homeButton = document.querySelector("#home-btn");
const cardDetails = document.getElementById("card-detail");
const securityNumber = document.querySelector(".securitynumber");
const basketContainer = document.querySelector(".basket-container");
const pokemonContainer = document.querySelector(".pokemon-container");
const sortLinksShow = document.querySelector(".sort-links");
const btnBasketBtn = document.querySelector(".btn-basket-container");
const formContainer = document.querySelector(".form-container");
const mondayOffer = document.querySelector(".monday-offer");
const inputValue = document.querySelectorAll(".checkValue");
const submitButton = document.getElementById("submitBtn");
const totalBillBasket = document.querySelector(".total-bill-basket");
const totalPcsBasket = document.querySelector(".total-pcs-basket");
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
    const basketContainer = document.querySelector(".basket-container");

    for (let i = 0; i < pokemonData.length; i++) {
        // Access each property of the current Pokémon
        const id = pokemonData[i].id;
        const name = pokemonData[i].name;
        const basePrice = pokemonData[i].price;
        const rating = pokemonData[i].rating;
        const category = pokemonData[i].category;
        const image = pokemonData[i].image;
        const price = (
            (dayNumber === 5 && time >= 15) ||
            (dayNumber === 6 || (dayNumber === 0 && time < 3))
        ) ? basePrice * 0.15 + basePrice : basePrice;
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
        <hr class="hr-list">
        <p class="price-counter"> </p>
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
    const deleteBtn = listItem.querySelector(".delete-btn");
    // You can update your Basketarray or perform other actions based on the new price
    deleteBtn.addEventListener('click', () => findRightIndexAndShowPriceDecrease(id, pokemon, listItem));
};


/** 
 *Function for displaying the total price of the choosen product, when the user increments the value
 *this function takes the id of the product and multiplies it with the pokemon id to display the total value price.
 */
const findRightIndexAndShowPrice = (id, pokemon, listItem) => {
    const priceCounter = listItem.querySelector(".price-counter");
    const basketContainer = document.querySelector(".basket-container");

    const idCounts = {};
    basketArray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        let sumAll = idCounts[id] * pokemon.price;
        if ((dayNumber === 5 && time >= 15) || (dayNumber === 6 || dayNumber === 0 && time < 3)) {
            console.log(idCounts[id]);
            const priceFifteen = sumAll * 0.15;
            const newPriceFifteen = sumAll + priceFifteen;
            basketContainer.innerHTML = showBasketArea();
        }
        else {
            console.log(idCounts[id]);
            basketContainer.innerHTML = showBasketArea();
        }

    });
};
/** 
 * This function will search for the right id and the it will decrease the price
 * based on the id that is inside tha array. After displaying the right price it will
 * take the index number and * with the quantity to display the right price.
*/
const findRightIndexAndShowPriceDecrease = (id, pokemon, listItem) => {
    const priceCounter = listItem.querySelector(".price-counter");
    const basketContainer = document.querySelector(".basket-container");
    const idCounts = {};
    basketArray.forEach((pokemon, index, array) => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
        let sumAll = idCounts[id] * pokemon.price;
        if ((dayNumber === 5 && time >= 15) || (dayNumber === 6 || dayNumber === 0 && time < 3)) {
            const priceFifteen = sumAll * 0.15;
            const newPriceFifteen = sumAll + priceFifteen;
            basketContainer.innerHTML = showBasketArea();
        } else {
            console.log(`Quantity for ID ${id}: ${idCounts[id]}`);
            console.log(`Price: ${pokemon.price}`);

            // Check if idCounts[id] is undefined or null
            if (idCounts[id] == null) {
                priceCounter.innerHTML = "0";
            } else {

                basketContainer.innerHTML = showBasketArea();

            }


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
    const basketContainer = document.querySelector(".basket-container");
    const uniquePokemons = Array.from(new Set(basketArray.map(pokemon => pokemon.id))).map(id => {
        return basketArray.find(pokemon => pokemon.id === id);
    });

    return basketContainer.innerHTML = uniquePokemons.map(pokemon => `
    <div class="container-basket-grid"  id="pokemon-${pokemon.id}">
      <div class="basket-card">
        ${pokemon.name} 
        <img src="${pokemon.image}" alt="${pokemon.name}" width="100" class="pokemon-avatar">
        
        ${dayNumber === 5 && time >= 15 || dayNumber === 6 || dayNumber === 0 && time < 3
            ? fifteenPercantage(pokemon.price) : pokemon.price}$
        x ${basketArray.filter(p => p.id === pokemon.id).length}
      </div>
      <div>
        <hr class="hr-list">
      </div>
    </div>
  `).join('');
};

/**
 * This function will caluclate the total price that is inside the arraybasket
 * And then it will take 10% off and display a message only when its monday and the time is before 10oclock.
 */
const mondaySpecialPriceBeforeTen = () => {
    const totalPrice = sumAllPriceBasket(basketArray);
    const discountPrice = totalPrice / 10;
    const newTotalPrice = totalPrice - discountPrice;
    const mondayOffer = document.querySelector(".monday-offer");
    if (dayNumber === 1 && time < 10) {
        mondayOffer.innerHTML = ` Today is monday and it¨s before 10 o clock. you get an special offer 10% discount !! Your new Total: ${newTotalPrice}$`;
    }

};


/**
  Delete the object property that is stored in an array, track the clicked object with the id parameter and
  use the splice method do display the new array. This part of this code was taken from Stakoverflow.
  */
/*
 */
const deleteBasket = (listItem, pokemon) => {
    const deleteBtn = listItem.querySelector(".delete-btn");
    const idCounter = listItem.querySelector(".counter");
    const totalBillBasket = document.querySelector(".total-bill-basket");
    const totalPcsBasket = document.querySelector(".total-pcs-basket");
    deleteBtn.addEventListener("click", function () {
        // code from stakeoverflow
        const indexToRemove = basketArray.findIndex(item => item.id === pokemon.id);
        if (indexToRemove !== -1) {
            basketArray.splice(indexToRemove, 1);
            // Update the count 
            const idCount = basketArray.filter(item => item.id === pokemon.id).length;
            idCounter.innerHTML = `Quantity: ${idCount}`;
            const totalPrice = sumAllPriceBasket(basketArray);
            if (totalPrice > 0) {
                // Update the HTML content only if totalPrice is above zero
                fifteenPercantageOutput();
                mondaySpecialPriceBeforeTen();

            }
            else {
                totalBillBasket.innerHTML = `Total:0$`;
                totalPcsBasket.innerHTML = `Items: 0`;
            }

            /*
                        if (totalPrice > 0) {
                            change basket price
                            // Update the HTML content only if totalPrice is above zero
                            totalBillBasket.classList.add("total-bill-basket")
                            totalBillBasket.innerHTML = `Total: ${totalPrice}$`;
                            totalPcsBasket.innerHTML = `Items: ${Basketarray.length}`;
                        } else {
                            // Optionally, you can handle the case where totalPrice is not above zero
                            totalBillBasket.innerHTML = `Total:0$`;
                            totalPcsBasket.innerHTML = `Items: 0`;
                        }
            
            
                    }
            
                });
                */




        }

    });
};
/** 
 * Function to sum all the numbers that are inside the basket array.
*/
const sumAllPriceBasket = (basket) => {
    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        total += basket[i].price;
    }

    return total;
};
/** 
 * Function to take ten percatnage of the total price and add it to the total price
*/
const tenPercantageOfAll = (newSumPriceTwo) => {

    let newSum = newSumPriceTwo * 0.10;
    let newSumTen = newSumPriceTwo + newSum;
    return newSumTen;


}
/**  Function to Take 15 percantage of the total sum in the basket
 * and display it only on fridays to sunday before 3 am.
*/
const fifteenPercantageOutput = () => {
    const mondayOffer = document.querySelector(".monday-offer");
    const totalPrice = sumAllPriceBasket(basketArray);
    if ((totalPrice > 0 && dayNumber === 5 && time >= 15) || (dayNumber === 6 || dayNumber === 0 && time < 3)) {
        let newSumFifteen = fifteenPercantage(totalPrice);
        totalBillBasket.classList.add("total-bill-basket");
        totalBillBasket.innerHTML = `Total: ${newSumFifteen}$`;
        totalPcsBasket.innerHTML = `Items: ${basketArray.length}`;
        mondayOffer.innerHTML = `Total: $${newSumFifteen} + $2 dollar Shipping`;
        if (basketArray.length > 15) {
            mondayOffer.innerHTML = `No shipping charged! Total: ${newSumFifteen}$`;
        }
        else {
            let newSumFifteen = fifteenPercantage(totalPrice);
            mondayOffer.innerHTML = `Total: $${newSumFifteen} + $2 dollar Shipping`;
        }
    }
    else {
        totalBillBasket.innerHTML = `Total: ${totalPrice}$`;
        totalPcsBasket.innerHTML = `Items: ${basketArray.length}`;
        if (basketArray.length > 15) {
            mondayOffer.innerHTML = `Total: $${totalPrice} No shipping charged!`;

        }
        else {
            let newSumVat = tenPercantageOfAll(totalPrice);
            mondayOffer.innerHTML = `Total: $${newSumVat} + $2 dollar Shipping and 10% VAT`;
        }

    }

};


const addToBasketAndCalculatePrice = (listItem, pokemon, id) => {
    const idCounter = listItem.querySelector(".counter");
    const mondayOffer = document.querySelector(".monday-offer");
    const shippingInfo = document.querySelector(".shipping-info");
    const dayAndTime = `Today is ${dayNumber} and the time is ${time}`;
    // Add the selected Pokemon to the array
    basketArray.push(pokemon);
    const idCounts = {};
    basketArray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
    });
    idCounter.innerHTML = `Quantity: ${idCounts[id]}`;
    const totalPrice = sumAllPriceBasket(basketArray);
    if (totalPrice > 0) {
        // Update the HTML content only if totalPrice is above zero
        fifteenPercantageOutput();
        mondaySpecialPriceBeforeTen();
    }

};
/**
 * Function for taking a variable and outputing fiffteen percatange of that variable
 */
const fifteenPercantage = (newSumPrice) => {
    let newSum = newSumPrice * 0.15;
    let newSumFifteen = newSumPrice + newSum;
    return newSumFifteen;
};
/**
 * Finds the total id of how many pokemon is in the basket and multiplies with the price
 * and shows the total of how many ids is inside the array.
 * 
 */
const addToBasketAndFindRightId = (id, listItem, pokemon) => {
    const idCounter = listItem.querySelector(".id-counter");
    // Add the selected Pokemon to the array with the specified quantity of the id that is inside the array and multiply with price.
    basketArray.push(pokemon);
    const idCounts = {};
    basketArray.forEach(pokemon => {
        const id = pokemon.id;
        idCounts[id] = (idCounts[id] || 0) + 1;
    });
    for (const id in idCounts) {
        idCounter.innerHTML = `${idCounts[id]}`;
    }
};

// Functions for sorting starts here
const compareByAge = (a, b) => {
    return a.price - b.price;
};

const compareByRating = (a, b) => {
    return a.rating - b.rating;
};

const compareByName = (a, b) => {
    return a.name.localeCompare(b.name);
};

const compareByCategory = (a, b) => {
    return a.category.localeCompare(b.category);
};
const sortByPrice = (pokemonData, listItem) => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Append the list item to the list
        // Clone the array to avoid modifying the original array
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByAge);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = "";
        displayPokemon(pokemonData);

    }
};

const sortByName = () => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByName);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = "";
        displayPokemon(pokemonData);
    }
};

const sortByRating = () => {
    // displayPokemon();
    for (let i = 0; i < pokemonData.length; i++) {
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByRating);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = "";
        displayPokemon(pokemonData);
    }

};

const sortByCategory = () => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Append the list item to the list
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");
        pokemonData.sort(compareByCategory);
        // Clear the container before adding the sorted Pokémon
        container.innerHTML = "";
        displayPokemon(pokemonData);
    }
};
/**
 * Function for only showing the pokemon list when clicking the home btn
 * And hideing the rest of the page.
 */
const homeBtn = () => {
    for (let i = 0; i < pokemonData.length; i++) {
        // Append the list item to the list
        // Sort the cloned array based on the 'price' property
        const container = document.querySelector("#pokemonList");

        // Clear the container before adding the sorted Pokémon
        container.innerHTML = "";
        displayPokemon(pokemonData);
        btnBasketBtn.style.display = "none";
        pokemonContainer.style.display = "block";
        basketContainer.style.display = "none";
        sortLinksShow.style.display = "block";
        formContainer.style.display = "none";

    }

};
/**  Clear the basket when clickng the clear button*/
const clearBasket = () => {
    const mondayOffer = document.querySelector(".monday-offer");
    basketArray.splice(0, basketArray.length);
    mondayOffer.innerHTML = "Basket have been cleared!";
    totalBillBasket.innerHTML = "Total: 0$";
    totalPcsBasket.innerHTML = "Items: 0";
    showBasketArea();
};

/**  Function for displaying card details and invoice details based on what
 * The user clicks on in the option window.
*/
const showMoreFieldsPayment = () => {
    if (paymentMethod.value === "card") {
        cardDetails.style.display = "block";
        securityNumber.style.display = "none";

    } else {
        cardDetails.style.display = "none";
        securityNumber.style.display = "block";
    }

};



/**  Function for making the confirm payment button greyd out if not all the fields are filled in.
 * If all the field are filled in the button will not be greyed out.
*/
const checkInputFieldsAllFilled = () => {
    const acceptTerm = document.querySelector(".acceptTerm");
    const inputValues = document.getElementsByClassName("checkValue");
    const formValid = document.getElementById("myForm");
    const thirdCheckValueInput = inputValues[6];

    console.log(acceptTerm.value);
    for (const input of inputValues) {
        let inputValue = input.value;
        if (inputValue === "") {
            console.log("Number three node is :" + thirdCheckValueInput.value);

            if (thirdCheckValueInput.value === "") {
                submitButton.disabled = true;

            }
            else {
                submitButton.disabled = false;

            }
        }
        else {

            submitButton.disabled = false;
        }

    }


};

/** Function for displaying that payment have been completed and confirmed when user clicks the 
 * Confirm button on the basket area.
 */
const displayMessageConfirm = () => {
    const checkBox = document.getElementById("info");
    const messageField = document.querySelector(".messageField");

    if (!checkBox.checked) {
        messageField.innerHTML = "Please accept our terms";
    } else if (checkBox.checked) {
        messageField.innerHTML = "";
    }
};

/** Function for displaying that payment have been completed and confirmed when user clicks the 
 * Confirm button on the basket area. Also the user will be redirected when payment have been completed.
 */
const displayPaymentConfirmMessage = () => {
    const formValid = document.getElementById("myForm");
    const basketBtnContainer = document.querySelector(".btn-container");
    const basketContainer = document.querySelector(".basket-container");
    const paymentContainer = document.querySelector(".payment-confirm-message");

    if (formValid.checkValidity()) {
        formValid.style.display = "none";
        basketContainer.style.display = "none";
        basketBtnContainer.style.display = "none";
        clearArray.style.display = "none";
        submitButton.style.display = "none";
        paymentContainer.innerHTML = "Payment confirmed thank you you will be redirected to the main page in 10 seconds!";

        setTimeout(() => {
            location.reload();
        }, 10000);
        // Here you might proceed with form submission or other actions
        return true; // Allow form submission
    } else {
        paymentContainer.innerHTML = "Something went wrong please check you details again";
        return false; // Prevent form submission
    }
};

/** Function for displaying and hideing the incovice and card details.*/
const showsocialSecurityField = () => {
    if (paymentMethod.value === "invoice") {
        securityNumber.style.display = "block";
        securityNumber.style.display = "block";
    } else {
        securityNumber.style.display = "none";

    }
    console.log(paymentMethod.value);
};

const showBasket = () => {
    //Will change to class method later
    formContainer.style.display = "block";
    btnBasketBtn.style.display = "block";
    if (pokemonContainer.style.display === "none") {
        basketContainer.style.display = "block";
        pokemonContainer.style.display = "none";
    } else {
        pokemonContainer.style.display = "none";
        sortLinksShow.style.display = "none";
        basketContainer.style.display = "block";
    }
};
/** Function for clearing basket when the user have been inactive for more than 15 minutes, the set intervall is used in the DOM loading event listner */
const clearBasketAfterTime = () => {

    if (basketArray.length > 0) {
        location.reload();
        alert("Your basket will be deleted, more than 15 minutes have been passed");
    }

};


const removeSocialSecurity = () => {
    const getInvoiceOption = document.querySelector(".invoiceOption");
    const totalPrice = sumAllPriceBasket(basketArray);
    if (totalPrice > 800) {
        getInvoiceOption.style.display = "none";
        cardDetails.style.display = "block";
        securityNumber.style.display = "none";
    }
};

// Main loading from here:
document.addEventListener('DOMContentLoaded', () => {
    sortButton.addEventListener('click', () => sortByPrice(pokemonData));
    sortNameButton.addEventListener('click', () => sortByName(pokemonData));
    sortRatingButton.addEventListener('click', () => sortByRating(pokemonData));
    sortCategoryButton.addEventListener('click', () => sortByCategory(pokemonData));
    clearArray.addEventListener('click', clearBasket);
    BasketShow.addEventListener('click', showBasket);
    BasketShow.addEventListener('click', removeSocialSecurity);
    paymentMethod.addEventListener('change', showMoreFieldsPayment);
    homeButton.addEventListener('click', () => homeBtn(pokemonData));
    inputValue.forEach(input => {
        input.addEventListener('change', checkInputFieldsAllFilled);
    });
    submitButton.addEventListener('click', displayMessageConfirm);
    submitButton.addEventListener('click', displayPaymentConfirmMessage);
    displayPokemon(pokemonData);
    setTimeout(() => {
        clearBasketAfterTime();
        setInterval(() => {
            clearBasketAfterTime();
        }, 100000); // Run the function every 1 and half minut.
    }, 900000); //Restart and clear basket in 15 minutes in milliseconds

});
