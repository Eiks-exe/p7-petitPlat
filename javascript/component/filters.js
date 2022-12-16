const filterList = (container, tags)=>{
    tags.forEach(element => {
        const tagElement = document.createElement("li")
        tagElement.setAttribute("class", "tags")
        tagElement.textContent = element
        container.append(tagElement)
    });
    const ingredientsBtn = document.getElementById("filter-ingredients") 
    
    ingredientsBtn.addEventListener("click", ()=>{
        if(container.style.display == "none"){
            container.style.display = "grid"
        } else {
            container.style.display = "none"
        }
    })
    console.log(container)
}

export default filterList