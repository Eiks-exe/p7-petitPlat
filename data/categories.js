import { recipes } from "../data/recipe.js"


export let tags = {
    ingredients: [],
    appliance: [],
    ustensils: [],
}
// toLowerCase
export const categorieExtractor = ()=>{
    let allIngredient = []
    let allUstensile = []
    let allAppliance = []

    recipes.map((recipe =>{
        recipe.ustensils.map((ustensil)=>{
            allUstensile.push(ustensil.toLowerCase())
        })
        recipe.ingredients.map((item)=>{
            allIngredient.push(item.ingredient.toLowerCase())
        })
        allAppliance.push(recipe.appliance.toLowerCase())
    }))
    
    // extraire sans doublon
    tags.ingredients = [...new Set(allIngredient)]
    tags.ustensils = [...new Set(allUstensile)]
    tags.appliance = [...new Set(allAppliance)]
    console.log(tags)
}

 
