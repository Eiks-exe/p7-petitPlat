import {recipes} from "../data/recipe.js"


//DOM Elements
const recipeCardTemplate = document.querySelector("[recipe-template]")
const recipesContainer = document.querySelector("[recipes-container]")
const searchInput = document.querySelector("[search-input]")


// Getting and displaying data
const displayRecipes = (data) => {
    const dataArray = data.map(recipe => {
        const card = recipeCardTemplate.content.cloneNode('true').children[0]
        
        const cardImg = card.querySelector('[data-card-img]')
        const cardTitle = card.querySelector('[data-card-title]')
        const cardText = card.querySelector('[data-card-text]')

        cardImg.src = "../assets/pictures/restaurant-wallpapers-44763-15495-1531137.png"
        cardTitle.textContent = recipe.name
        
        recipesContainer.appendChild(card)
        
        
        return {name: recipe.name, description: recipe.description, time:recipe.time, ingredients: recipe.ingredients, element: card}

    });
    // search 
    searchInput.addEventListener("input", (e)=>{
        const args = e.target.value
        dataArray.forEach(recipe => {
            const isVisible = recipe.name.toLowerCase().includes(args.toLowerCase()) || !recipe.ingredients.every(item => item.ingredient.toLowerCase().indexOf(args.toLowerCase()) === -1) 
            
            

            recipe.element.classList.toggle("hide", !isVisible)
        });
    })
}



displayRecipes(recipes)
 