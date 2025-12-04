# Recipe-Finder
Recipe Finder is a web application that allows users to search for meals and view cooking instructions using live data from TheMealDB API.
🍽️ Recipe Finder — JavaScript Web App

A simple and responsive recipe search application that allows users to search meals, view ingredients, and read cooking instructions using TheMealDB API.

✨ Features

✔ Search meals by name or keywords
✔ Fetch recipe data dynamically via API
✔ Responsive UI (mobile & desktop)
✔ Display images, ingredients, and instructions
✔ “Watch on YouTube” link for tutorials
✔ Loading/error message handling

🧰 Tech Stack

HTML5

CSS3

JavaScript (Vanilla JS)

Bootstrap 5

Font Awesome icons

TheMealDB API

📌 API Used

This app fetches data from:

🔗 https://www.themealdb.com/api.php

🚀 How It Works

User enters a meal name

JavaScript sends a request to:

https://www.themealdb.com/api/json/v1/1/search.php?s=YOUR_QUERY


Results are displayed with:

meal image

meal name

“view details” button

Clicking a meal fetches detailed instructions via:

https://www.themealdb.com/api/json/v1/1/lookup.php?i=MEAL_ID


UI updates with:

instructions

ingredients list

YouTube recipe link

📂 Project Structure
📁 Recipe Finder
 ├── index.html
 ├── style.css
 └── script.js

🖼️ Screenshots (Optional)

You can add screenshots later like:

![Home Page](screenshots/home.png)
![Recipe Details](screenshots/details.png)

🔧 How to Run Locally

Download / Clone repository

git clone https://github.com/your-username/recipe-finder.git


Open index.html in your browser

✔ No server required — it runs directly as static web app.

📌 Improvements To Add (Future Enhancements)

🔹 Loading spinner
🔹 Pagination
🔹 Save favorite meals
🔹 Speech search
🔹 Dark mode

👨‍💻 Author

Sahil — Frontend Developer in progress 🚀
Learning & building real projects with JavaScript.
