import { displayFunction, searchFunction } from "../index.js";
import { recipes, Shared } from "../../data/recipe.js";
import { tags } from "../../data/categories.js";

const pin = document.createElement("div")
const pinContainer = document.getElementById("pinsContainer")
const filtersContainer = document.getElementById("filters_container")


const displayPins = () => {
    const frag = document.createDocumentFragment()
    Shared.pinsArray.forEach((element , y) => {
        console.log(element)
        const emLi = document.createElement("li");
        emLi.classList.add("pins")
        emLi.classList.add(`pin${Shared.pinsArray[y].category}`)
        emLi.innerHTML = element.tag + " <i class='fa-light fa-circle-xmark fa-regular'></i>"
        emLi.addEventListener("click", () => {
            const i = Shared.pinsArray.indexOf(element);
            console.log(i)
            if (i != -1) {
                console.log(Shared.pinsArray[y].tag)
                if (Shared.pinsArray[y].tag == element.tag) { 
                    Shared.pinsArray.splice(i, 1)
                    console.log("remove")
                    document.dispatchEvent(new CustomEvent('show_em_li', { detail: element.tag }));
                    document.dispatchEvent(new CustomEvent('search', { }));
                    emLi.remove();
                }
            }
            
        })
        frag.appendChild(emLi)
    });
    pinContainer.replaceChildren(frag)
}

const displayTags = (category ,tagsArray) => {
    const frag = document.createDocumentFragment();
    tagsArray.forEach((tag) => {
        const emLi = document.createElement("li")
        emLi.className = "tags"
        emLi.innerHTML = tag
        const pinObject = {"category": category, "tag": tag}
        emLi.addEventListener("click", () => {
            if (!Shared.pinsArray.includes(pinObject)) {
                Shared.pinsArray.push(pinObject)
                emLi.style.display = "none"
                document.dispatchEvent(new CustomEvent('search', { }));
                displayPins();
            }
        })
        document.addEventListener("show_em_li", (e) => {
            console.log(e.detail)
            if (e.detail == tag) {
                emLi.style.display = "inline"
            }
        })
        frag.appendChild(emLi);
    });
    return frag;
}

const displayFilter = (filterName, tagsArray)=>{
    console.log(filterName, tagsArray, 'hey')
    const container = document.createElement("div");
    const button = document.createElement("button");
    const searchInput = document.createElement("input"); 
    const listContainer = document.createElement("ul");
    const chevron = document.createElement("i")
    chevron.classList.add("fa-solid", "fa-chevron-down", "filter-icon")
    console.log(chevron.className)
    searchInput.placeholder = filterName;

    button.classList.add("filter-button")
    listContainer.classList.add("listContainer")
    button.addEventListener("click", (e) => {
        listContainer.className.includes("listShow") ? listContainer.classList.remove("listShow") : listContainer.classList.add("listShow")
        button.className.includes("btn-expanded") ? button.classList.remove("btn-expanded") : button.classList.add("btn-expanded")
        chevron.className.includes("r180") ? chevron.classList.remove("r180") : chevron.classList.add("r180")
    })
    
    searchInput.addEventListener("keydown", (e) => {
        if (e.currentTarget.value.length >= 3) {
            listContainer.replaceChildren(displayTags(filterName, tagsArray.filter(element=> element.includes(e.target.value.toLowerCase()))))
            
        } else {
            listContainer.replaceChildren(displayTags(filterName, tagsArray))
        }
    })
    
    listContainer.replaceChildren(displayTags(filterName, tagsArray))
    button.appendChild(searchInput)
    button.appendChild(chevron)
    container.appendChild(button)
    container.appendChild(listContainer)
    return container;
}

const Trad = {
    ingredients: "Ingredients",
    appliance: "Appareils",
    ustensils: "Ustensiles",
}

const fg = document.createDocumentFragment()
Object.entries(tags).forEach(([k, v]) => {
    fg.appendChild(displayFilter(Trad[k],v))
    console.log(k,v,Trad[k])
})
filtersContainer.replaceChildren(fg);