const divs = document.querySelectorAll("div");
const button = document.querySelector("button");
    
// it goes DOWN the DOM captures where you clicked (one -> two -> three)
function log(e){
    console.log(this.classList.value); // then bubbles up three, two, one (firing off click events)
    // e.stopPropagation(); log just the clicked element
}
    
divs.forEach(div => div.addEventListener("click", log, {
   capture: true, // "false" Run on the way UP in DOM
    once: true
}))
    
    
/*
<div class="one">
<div class="two">
<div class="three">
</div>
</div>
</div> width 100%, padding: 100px
*/
