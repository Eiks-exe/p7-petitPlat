import {categorieExtractor, tags} from "../data/categories.js"
import { recipes, Shared } from "../data/recipe.js"



let results = []
results = recipes


//DOM Elements

const recipeCardTemplate = document.querySelector("[recipe-template]")
const recipesContainer = document.querySelector("#recipes-container")
const searchInput = document.getElementById("search")
const ingredientContainer = document.getElementById("ingredients-container")
const applianceContainer = document.getElementById("appliances-container")
const ustensilsContainer = document.getElementById("ustensils-container")


// filters


// Getting and filtering data
export const searchFunction = (data, keywords, pins) => {

    const words = (keywords.toLowerCase() + (pins?.length > 0 ? (" " + pins.join(' ').toLowerCase()) : "")).split(' ');
    console.log(keywords, words);
    return data.filter((recipe) => {
        return words.every((searchWord) => {
            return !(
                recipe.name.toLowerCase().indexOf(searchWord) === -1 &&
                recipe.description.toLowerCase().indexOf(searchWord) === -1 &&
                recipe.ingredients.every(
                    (ingredient) => ingredient.ingredient.toLowerCase().indexOf(searchWord) === -1,
                ) &&
                recipe.ustensils.every((ustensil) => ustensil.toLowerCase().indexOf(searchWord) === -1) &&
                recipe.appliance.toLowerCase().indexOf(searchWord) === -1 
            );
        });
    });
    
}


// Card creation

export const displayFunction = (data) => {
    const card = data.map((recipe)=>{

        const ingredientList = recipe.ingredients.map(item => {
            if(!item.quantity){
                return `<li><b>${item.ingredient}</b></li>`
            } else if(!item.unit) {
                return `<li><b>${item.ingredient}</b>: ${item.quantity}</li>`
            }
            if (item.unit == "grammes") {
                return `<li><b>${item.ingredient}</b>: ${item.quantity}g</li>`
            }
            return `<li><b>${item.ingredient}</b>: ${item.quantity}${item.unit}</li>`
        });

        return `
        <div class="recipe-card p-0" style="width: 28rem;">
        <img src="./assets/pictures/restaurant-wallpapers-44763-15495-1531137.png"
            class="card-img-top" alt="..." data-card-img>
        <div class="card-body" data-card-body>
            <div class="card-title " data-card-title>
                <h5 class="recipe-name ">${recipe.name}</h5>
                <p class="recipe-timestamp "><i class="fa-regular fa-clock"></i> ${recipe.time} min</p>
            </div>
            <div class="card-text row" data-card-text>
                <ul class="recipe-ingredients col-6">
                ${ingredientList.join('')}
                </ul>
                <div class="recipe-description col-6" style="
                    font-size:12px
                ">
                ${recipe.description}
                </div>
            </div>
        </div>
    </div>
        `
    }).join('')

    recipesContainer.innerHTML = card;
}

document.addEventListener("search", (e) => {
    results = searchFunction(recipes, Shared.search, Shared.pinsArray.map(element => element.tag))
    displayFunction(results)
})


searchInput.addEventListener("input", async (e) => {
    const args = e.target.value
    if(args.length === 0) {
        displayFunction(recipes)
    } else if (args.length >= 3) {
        Shared.search = args
        document.dispatchEvent(new CustomEvent('search', { }));
    }
    if(results.length === 0 && args.length >= 3){
        recipesContainer.innerHTML = 'aucun article ne corresspond a votre recherche'
    }
})
displayFunction(results)

categorieExtractor()
