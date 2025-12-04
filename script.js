let URL = "https://www.themealdb.com/api/json/v1/1/search.php";
const search_inpt = document.getElementById("search_inpt");
const form = document.querySelector(".form1");
const search_btn = document.querySelector(".search_btn");
const main_div = document.querySelector(".main_row_div");
const errorOrSuccessDiv = document.querySelector(".error_sucess_div");
const instructionsDiv = document.querySelector(".instructions_div");


// prevent form default
form.addEventListener("submit", (e)=>{
    e.preventDefault();
});


// reusable error display function
function showError(message) {
    errorOrSuccessDiv.innerHTML = `
        <div class="error_box">
            <p>${message}</p>
        </div>
    `;
}


// click event for search button
search_btn.addEventListener("click", ()=>{
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_inpt.value}`;

    // clear instruction area
    instructionsDiv.innerHTML = "";

    getData().then((message) =>{
        createDivforDate(message, search_inpt.value);
    });
});


// function for API request
async function getData() {
    try {
        const getApiData = await fetch(URL);

        // API failed case
        if (!getApiData.ok) {
            showError("⚠ API error — please try again!");
            return { meals: null };
        }

        return await getApiData.json();

    } catch (error) {
        showError("⚠ Network issue — check your connection.");
        return { meals: null };
    }
}


// display meal cards
function createDivforDate(data , nameMeals){
    
    main_div.textContent = "";

    if (data.meals && data.meals.length > 0) {

        errorOrSuccessDiv.innerHTML = "";

        let h1 = document.createElement("h1");
        h1.innerText = `Search results for "${nameMeals}"`;
        errorOrSuccessDiv.appendChild(h1);

        data.meals.forEach((meal) => {
            let div = `
            <div class="col-9 col-md-5 meals_div">
                <img src="${meal.strMealThumb}" class="meals_img">
                <h1>${meal.strMeal}</h1>
                <button class="meal_btn" id=${meal.idMeal}><a href="#infoMeal">${nameMeals}</a></button>
            </div>`;
            main_div.innerHTML += div;
        });

        // add event to each meal button
        let btn = document.querySelectorAll(".meal_btn");
        btn.forEach((btn)=>{
            btn.addEventListener("click", ()=>getInfoOfMeal(btn));
        });

    } else {

        // no result found case
        showError("⚠ No meal found — please try another food name!");
    }
}


// get individual meal info
function getInfoOfMeal(btn){
    const id = btn.getAttribute("id");
    URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    infoOfMeal().then((message)=>{
        createDivForInfoMeal(message);
    });
}


// API request for detail page
async function infoOfMeal(){
    try {
        const data = await fetch(URL);

        if (!data.ok) {
            showError("⚠ API failed fetching meal details.");
            return { meals: null };
        }

        return await data.json();

    } catch {
        showError("⚠ Internet issue — try again later");
        return { meals: null };
    }
}


// display meal info
function createDivForInfoMeal(data){
    
    if(data.meals){

        instructionsDiv.innerHTML = "";

        let div = `
            <div class="instrct_div">
                <button class="back_btn"><a href="#${data.meals[0].idMeal}">
                    <i class="fa fa-arrow-left"></i> Go Back
                </a></button>
                <img class="img_info" src="${data.meals[0].strMealThumb}"/>
                <h4>Instructions</h4>
                <p>${data.meals[0].strInstructions}</p> 
            </div>
        `;

        instructionsDiv.innerHTML += div;

        let divFor = document.createElement("div");
        divFor.className = "how_to_cook";
        divFor.innerHTML = "<h1>Ingredients</h1>";

        for (let i = 1; i <= 20; i++) {
            let ingredient = data.meals[0][`strIngredient${i}`];
            let measure = data.meals[0][`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                divFor.innerHTML += `
                <div class="inner_ingredient">
                    <i class="fas fa-check"></i>
                    <p>${measure} ${ingredient}</p>
                </div>`;
            }
        }

        instructionsDiv.appendChild(divFor);


        let divForYout = document.createElement("div");
        divForYout.className = "youtube_div";
        divForYout.innerHTML = `
            <a href=${data.meals[0].strYoutube} target="_blank">
                <i class="fab fa-youtube"></i> Watch Video
            </a>`;

        instructionsDiv.appendChild(divForYout);

    } else {

        showError("⚠ Meal details not found — please try again.");
    }
}
