import {categorieExtractor, tags} from "../data/categories.js"
import { recipes } from "../data/recipe.js"
import filterList from "./component/filters.js"

let results = []
results = recipes


//DOM Elements

const recipeCardTemplate = document.querySelector("[recipe-template]")
const recipesContainer = document.querySelector("[recipes-container]")
const searchInput = document.querySelector("[search-input]")
const ingredientContainer = document.getElementById("ingredients-container")
const applianceContainer = document.getElementById("appliances-container")
const ustensilsContainer = document.getElementById("ustensils-container")


// filters




// Getting and filtering data
export const searchFunction = (data, keywords) => {
    if(!keywords){
        return data
    }
    const filter = data.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(keywords.toLowerCase()) ||
            !recipe.ingredients.every(item => item.ingredient.toLowerCase().indexOf(keywords.toLowerCase()) === -1)||
            recipe.appliance.toLowerCase().includes(keywords.toLowerCase())
        );
    })
    
    return filter 
}


// Card creation

export const displayFunction = (data) => {
    const card = data.map((recipe)=>{

        const ingredientList = recipe.ingredients.map(item => {
            if(!item.quantity){
                return `<li>${item.ingredient}</li>`
            } else if(!item.unit) {
                return `<li>${item.ingredient}: ${item.quantity}</li>`
            }
            return `<li>${item.ingredient}: ${item.quantity}${item.unit}</li>`
        });

        return `
        <div class="recipe-card bg-secondary p-0" style="width: 28rem;">
        <img src="./assets/pictures/restaurant-wallpapers-44763-15495-1531137.png"
            class="card-img-top h-50" alt="..." data-card-img>
        <div class="card-body" data-card-body>
            <div class="card-title " data-card-title>
                <h5 class="recipe-name ">${recipe.name}</h5>
                <p class="recipe-timestamp ">${recipe.time}</p>
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


searchInput.addEventListener("input", async (e) => {
    const args = e.target.value
    if(args.length === 0) {
        displayFunction(recipes)
    } else if(args.length >= 3) {
        results = searchFunction(recipes, args)
        displayFunction(results)
    }
    if(results.length === 0 && args.length >= 3){
        recipesContainer.innerHTML = 'aucun article ne corresspond a votre recherche'
    }
})
displayFunction(results)

categorieExtractor()

console.log(ingredientContainer)
filterList(ingredientContainer, tags.ingredients)
filterList(applianceContainer, tags.appliance)
filterList(ustensilsContainer, tags.ustensils)
