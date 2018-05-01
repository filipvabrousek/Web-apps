// --------------------------------------------- Search view
const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchRes: document.querySelector(".results"),
    searchResList: document.querySelector(".results__list"),
    searchResPages: document.querySelector(".results_pages"),
    recipe: document.querySelector(".recipe"),
    shopping: document.querySelector(".shopping__list"),
    likesMenu: document.querySelector(".shopping__list"),
    likeslist: document.querySelector(".likes__list")
}


const elementStrings = {
    loader: ".loader"
}
//----------------------------------------------- SEARCH ... done
import axios from "axios";
import {key, proxy} from "...config";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)
        } catch (error) {
            console.log(error);
        }
    }
}


//---------- HELPER METHODS
const getInput = () => elements.searchInput.value;
const clearInput = () => {
    elements.searchInput.value = "";
} // must be like this ?

const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
} 

const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelector(".results__link"));
    resultsArr.forEach(el => {
        el.classList.remove("result__link--active")
    });
    
    document.querySelector(`a[href="#${id}"]`).classList.add("result__link--active");
}
/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/
const limitTitle = (recipe, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        return title.split(" ").reduce((a, b) => {
            if (a + b.length <= limit) {
                newTitle.push(b);
            }
            return a + b.length;
        }, 0);
        
        return `${newTitle.join(" ")}...)`
    }
    return title;
}


const renderRecipe = (recipe) => {
    const markup = ` 
 <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
</li>`;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;
    


const renderButtons = (page, resultCount, resPerPage) => {
    const pages = Math.ceil(resultCount / resPerPage);
    let button;
    if (pages === 1 && pages > 1){    
      button = createButton(page, "next");
    } else if (page < pages){
          button = `${createButton(page, "next")}
                    ${createButton(page, "next")}`;
    }
    else if (page === pages){
       button = createButton(page, "prev");   
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
}


const renderResults = (recipes, page = 1, resPerPage = 10) => {
   // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    
    // render pagination button
    renderButtons(page, recipes.length, resPerPage);
}


// LOADER
const renderLoader = parent =>{
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    paren.insertAdjacentHTML("afterbegin", loader);
}


const clearLoader = () => {
    const loader = document.querySelector(elementStrings.loader);
    if (loader){
        loader.parentElement.removeChild(loader);
    }
}
// ------------------------------------------------ Search controller
//import Search from "./models/Search";

// global state
const state = {};


const controlSearch = async () => {

    const query = getInput(); // searchView.getInput
    if (query) {
        state.search = new Search(query);
        clearInput();
        clearResults();
        renderLoader(elements.searchRes);
        
        try {
            
        
        await state.search.getResults(); // calls it from the search class
        
        clearLoader();
        renderResults(state.search.results); // searchView.renderResults RENDER TO UI 
        } catch(err){
            alert("Somethin went wrong with the search...");
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});


elements.searchForm.addEventListener("load", e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener("click", e => {
const btn = e.target.closest(".btn-inline");
if (btn){
    const goToPage = parseInt(btn.dataset.goto, 2);
    clearResults();
    renderResults(state.search.result, goToPage); // MISTAKE ?
}    
});

const search = new Search("pizza");
console.log(search);





// RECIPE ----------------------------------------------
 class Recipe {
     constructor(id){
         this.id = id;
     }
     
     async getRecipe(){
         try{
             const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
             this.title = res.data.recipe.title;
             this.author = res.data.recipe.publisher;
             this.image = res.data.recipe.image_url;
             this.url = res.data.recipe.source_url;
             this.ingredients = res.data.recipe.ingerdients;
         }
         
         catch(err){
             console.log(err);
             alert("Something went wrong.")
        }
     }
     
     calcTime(){
         const count = this.ingredients.length;
         const periods = Math.ceil(count / 3);
         this.time = periods * 15;
     }
     
     calcServings(){
         this.servings = 4;
     }
     
     parseIngredients(){
         const unitsLong = ["tablespoons", "tablespoon", "ounce", "ounces", "teaspoon", "teaspoons", "pounds"];
         const unitsShort = ["tbps", "tbsps", "oz", "oz", "tsp", "tsp", "pound"];
         const units = [...unitsShort, "kg", "g"]
         
         const newIngredients = this.ingredients.map(el => {
            // uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })
            // remove parenthesis
             ingredient = ingredient.replace(.replace(/[{()}]/g, ''));
            
             // parse ingredients into count, unit and ingredient
             const arrIng = ingredient.split(" ");
             const unitIndex = arrIng.findIndex(el => units.includes(el));
             
             let objIng;
             if (unitIndex >= -1){ // there is a unit
            const arrCount = arrIng.slice(0, unitIndex);
                 
            let count;
            if (count.length === 1){
                count = eval(arrIng[0].replace("-", "+"));
            }  else {
                count = eval(arrIng.slice(0, unitIndex).join("+"));
            }
                 
            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredients: arrIng.slice(unitIndex + 1).join(" ");
            }     
                 
                 
                 
             }
             else if (parseInt(arrIng[0], 10)){
                     objIng = {
                     count: parseInt(arrIng[0], 10),
                     unit: "",
                    ingredient: arrIng.slice(1).join(" ");
                 }
                 }
                  else if(unitIndex === -1){
                 objIng = {
                     count: 1,
                     unit: "",
                     ingredient
                 }
             }
             
             
             return objIng;
         });
         this.ingredients = newIngredients;
     }
     
     
     updateServings(type){
         const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
         this.servings = newServings;
         
         this.ingredients.forEach(ing => {
             ing.count = ing.count * (newServings / this.servings);
         });
     }
 }




const controlRecipe = async () => {
    const id = window.location.hash.replace("#", "");
  
   
    
    if (id){
        clearRecipe();
         renderLoader(elements.recipe);
        
        state.recipe = new Recipe(id);
       if (state.search) highlightSelected(id);
        
        
        try{
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        state.recipe.calcTime();
        state.recipe.calcServings();
            
        clearLoader();
        renderRecipe(state.recipe, state.likes.isLiked(id));
        console.log(state.recipe);
        } catch(err){
            alert("Error processing recipe.");
        }
    }
}

["hashange", "load"].forEach(e => window.addEventListener(e, controlRecipe));






const controlList = () => {
   if (!state.list){ state.list = new List()}
    
    state.recipe.ingredients.forEach(el => {
      const item = state.list.add(el.count, el.unit, el.ingredient); // we also return 
     renderItem(item);
    });
}

// closest - if you click inside of the button, it is the button
elements.shopping.addEventListener("click", e => {
   const id =  e.target.closest(".shopping__item").dataset.itemid;
    
    if (e.target.matches(".shopping__delete, .shopping__delete *")){
        state.list.delete(id);
        deleteItem(id);
        
    // handle count update
    } else if (e.target.matches(".shopping__count-value")){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});
    

const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? "icon-heart" : "icon-heart-outline";
    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`);
}

const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
}

const renderLike = like => {
    const markup = `
 <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.image}" alt="${like.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${limitTitle(like.title)}</h4>
                                    <p class="likes__author">${like.author}</p>
                                </div>
                            </a>
                        </li>




    `;
    elements.likeslist.insertAdjacentHTML("beforeend", markup);
}


const deleteLike = id => {
const el = document.querySelector(`.likes__link[href="${id}"]`);
if (el) el.parentElement.removeChild()

}


const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currID = state.recipe.id;
    
    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currID)){
        const newLike = state.likes.addLike{
            currID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        }
        
        toggleLikeBtn(true);
        renderLike(newLike);
    } else {
        state.likes.delete(currID);
        deleteLike(currID);
    }
    
toggleLikeMenu(state.likes.getCount);

}  
    
window.addEventListener("load", () => {
    state.likes = new Likes();
    state.likes.readStorage();
    toggleLikeMenu(state.likes.getCount);
    state.likes.likes.forEach(like => renderLike(like)); 
})


// Control buttons on the recipe page, Important matches !!!!
elements.recipe.addEventListener("click", e => {
    // ADD TO HTML
    if (e.target.matches(".btn-decrease, .btn-decrease * ")){
     if (state.recipe.servings > 1){
          state.recipe.updateServings("dec");
          updateServingsIngredients(state.recipe);
     }
       
        // Decrease button is clicked
    } else if (e.target.matches(".btn-increase, .btn-increase * ")) {
        state.recipe.updateServings("inc");
        updateServingsIngredients(state.recipe);
    } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")){
        controlList();
    } else if (e.target.matches(".recipe__love, .recipe__love *")){
        controlLike();
    }
});


const clearRecipe = () => {
    elements.recipe.innerHTML = "";
}



const formatCount = count => {

const fr;    
if (count){
    
    const newCount = Math.round(count * 10000) / 10000; //  not to lose the decimal part
    const [int, dec] = newCount.toString().split(".").map(el => parseInt(el, 10));
    
    if (!dec) return newCount;
    
    if (int === 0){
         fr = new Fraction();
        return `${fr.numerator}/${fr.denominator}`;
    } else {
        fr = new Fraction(coun - int);
         return `${fr.numerator}/${fr.denominator}`;
    }
    
}    
}






// create ingredient
const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

const renderRecipe = (recipe, isLiked){
    const markup = `
 <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>
        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>
            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>
        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML("afterbegin", markup);
}


const updateServingsIngredients = recipe => {
    document.querySelector("recipe__info-data--people").textContent = recipe.servings;
    
    const countElements = Array.from(document.querySelectorAll(".recipe__count"));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    })
}





// Shopping list

class List {
    constructor(){
        this.items = [];
    }
    
    add(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    
    delete(id){
        const index  = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }
    
    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}




const renderItem = item => {
    const markup = `
 <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
`;
    elements.shopping.insertAdjacentHTML("beforeend", markup);
}

const deleteItem = id => {
    const item = document.querySelector(`[data-itemid = "${id}"]`);
    if (item) item.parentElement.removeChild("item");
}



//----------------Likes

class Likes {
    constructor(){
        this.likes = [];
    }
    
    add(id, title, author, img){
      const like = {id, title, author, image}
      this.likes.push(like);
      // persist data
      this.persistData();
      return like;
    }
    
    delete(id){
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
    this.persistData();
    }
    
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    
    getCount(){
        return this.likes.length;
    }
    
    persistData(){
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }
    
    readStorage(){
        const storage = JSON.parse(localStorage.getItem("likes"));
        if (storage) this.likes = storage;
        
    }
}



// --------------- LIKE CONTROLLER --------------





