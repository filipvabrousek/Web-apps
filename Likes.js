// 1 - connect to API
const S = el => document.querySelector(el);
const elements = {
    people: S("#people"),
    liked: S("#liked"),
    img: S("img"),
    imgButton: S(".img-button")
}

const database = [];

const chatController = () =>{

const url = 'https://randomuser.me/api/?results=10';
fetch(url)
.then(res => res.json())

.then(data => data.results.map(a => {
    database.push({name: a.name.first, img: a.picture.large, liked: 0});
    
    elements.people.innerHTML += "<ul>";
    database.map(el =>  elements.people.innerHTML += 
    `<li data-id=${el.name} data-img=${el.img}>${el.name}</li>`);
    elements.people.innerHTML += "</ul>"; 
}))
    
.catch(err => console.log(err));
    
}

chatController();






const liked = [];


elements.people.addEventListener("click", e => {
   if (e.target.matches("li")){
           elements.img.src = e.target.closest("li").dataset.img;
       elements.img.dataset.name = e.target.closest("li").dataset.id;
   }
});


elements.img.addEventListener("dblclick", e => {
        elements.liked.innerHTML += e.target.dataset.name + "<br>";    
});






/*
<!DOCTYPE html>
<head>

</head>


<body>
<header>
    
<input type="text" placeholder="Enter the name"/>   
<button id="search">Search</button>
</header>

<div id="people">

</div>
    
<div id="liked">
<h2>Liked people</h2>  
</div>
    
<img data-name = "O" class="img" src="https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"/>  

    
<style>
* {
margin: 0;
padding: 0;
font-family: Arial;
    }
    
header{
background: #1abc9c;
width: 100%;
height: 6em;
display: flex;
justify-content: center;
align-items: center;
    }    
    
input{
padding: 1em;
border: none;
border-radius: 0.3em;
    }
    
li, button {
list-style-type: none;
color: gray;
font-weight: bold;
margin: 1em;
    }
    
    .h{ 
        color: red;
    border: none;
    font-size: 1em;}
    
    #people{
    float: left;
    }
    
   .img{
    float: right;
    width: 300px;
    }
    
    
    .highlight{
    color: green;
    }
    
</style>
<script src="script.js"></script>
</body>
*/
