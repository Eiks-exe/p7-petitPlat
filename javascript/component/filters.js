import { displayFunction, searchFunction } from "../index.js";
import { recipes } from "../../data/recipe.js";
import { tags } from "../../data/categories.js";

const pin = document.createElement("div")
const pinContainer = document.getElementById("pinsContainer")


const filterList = (container, tags) => {
    const ingredientsBtn = document.getElementById("filter-ingredients")
    const appliancesBtn = document.getElementById("filter-appliances")
    const ustensilsBtn = document.getElementById("filter-ustensils")
    
    const tagMap =tags.map((element) => {
        return `<li class="tags">${element}</li>`
    }).join('');
    container.innerHTML = tagMap
    Array.from(container.childNodes).forEach((element, i) => {
        element.addEventListener("click" , ()=>{
            const tagFilter = searchFunction(recipes, element.innerHTML)
            console.log(tagFilter)
            displayFunction(tagFilter)
            if (container.style.display == "none") {
                container.style.display = "grid"
                tagsSearch1.style.display = "block"
                tagsText1.style.display= "none"
                tagsSearch1.focus()
                
            } else {
                container.style.display = "none"
                tagsSearch1.style.display = "none"
                tagsText1.style.display= "block"
                pin.innerHTML = element.innerHTML
                pin.setAttribute("class", "pin")
                pinContainer.append(pin)
            }
        }) 
    });
    
    switch (container.id) {
        case "ingredients-container":
            btnToogle(ingredientsBtn, container)
            break;
        case "appliances-container":
            btnToogle(appliancesBtn, container)
            break;
        case "ustensils-container":
            btnToogle(ustensilsBtn, container)
            break;
        default:
            break;
    }

}

const tagsSearch1 = document.getElementById("tags-search")
const tagsText1 = document.getElementById("fi-text")
const btnToogle = (button, Container) => {
    
    button.addEventListener("click", () => {
        if (Container.style.display == "none") {
            Container.style.display = "grid"
            tagsSearch1.style.display = "block"
            tagsText1.style.display= "none"
            button.setAttribute("class", "btn btn-primary filter-opened")
            tagsSearch1.focus()
            
        } else {
            Container.style.display = "none"
            tagsSearch1.style.display = "none"
            tagsText1.style.display= "block"
            button.setAttribute("class", "btn btn-primary")
        }
    })
}



tagsSearch1.addEventListener("input", (e)=>{
    e.preventDefault()
    tagsSearch(e.target.value)
})
const tagsSearch = (args)=>{
    const ingredientContainer = document.getElementById("ingredients-container")
    const res = tags.ingredients.filter(tag => tag.toLowerCase().includes(args))
    console.log(res)
    filterList(ingredientContainer, res)
}

export default filterList