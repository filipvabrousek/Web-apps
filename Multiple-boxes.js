const boxes = document.querySelectorAll("input");
boxes.forEach(el => el.addEventListener("click", handle));
    
    
let lastChecked;

    
function handle(e){
   
    let inBetween = false;
    if (e.shiftKey && this.checked){
        boxes.forEach(box => {
        if(box === this || box === lastChecked){
            inBetween = !inBetween;
        } 
            
        if (inBetween){
            box.checked = true;
        }
            
        });
    }
    
    lastChecked = this;
}


/*
<form>
<input type="checkbox"><p>Option one</p>
<input type="checkbox"><p>Option two</p>
<input type="checkbox"><p>Option three</p>
</form>
*/
