// 1 - connect to API
const S = el => document.querySelector(el);
const elements = {
    people: S("#people"),
    liked: S("#liked"),
    img: S("img"),
    imgButton: S(".img-button"),
    age: S("#age")
}

const database = [];

const chatController = () =>{

const url = 'https://randomuser.me/api/?results=6';
fetch(url)
.then(res => res.json())

.then(data => data.results.map(a => {
    database.push({name: a.name.first, img: a.picture.large, city: a.location.city, liked:false});
    
    elements.people.innerHTML += "<ul>";
    database.map(el =>  elements.people.innerHTML += 
    `<li data-id=${el.name} data-img=${el.img} data-city=${el.city} data-liked = ${el.liked}>${el.name}</li>
    `);
    
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
       elements.age.innerHTML = ` Name: ${e.target.closest("li").dataset.id}
       <br> City: ${e.target.closest("li").dataset.city}`;
   }
});


elements.img.addEventListener("dblclick", e => {

             e.target.dataset.liked = true;
            elements.liked.innerHTML += e.target.dataset.name + "<br>";  
});



// Highlight element we s.earch


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
    

    
<img data-name = "O" class="img" src="https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"/>  
<p id="age">18</p>
    
<div id="liked">
<h2>Liked people</h2>  
</div>
    
    
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
    
   img{
    float: right;
    width: 300px;
    position: absolute;
    left: 130px;
    top: 100px;
    }
    
    p{
        position: absolute;
        left: 130px;
        top: 323px;
        color: white;
        font-size: 2em;
        font-family: Arial;
        background: black;
        opacity: 0.8;
    }
    
    #liked{
        position: absolute;
        left: 500px;
        top: 90px;
    }
    
    .profile{
        margin:0;
        padding: 0;
        width: 100px;
        height: 100px;
    }
    
    .highlight{
    color: green;
    }
    
    li:hover{
        cursor: hand;
    }
</style>
<script src="script.js"></script>
</body>

*/
