var div_box, scroll_e
window.addEventListener('load', (e)=>{
    div_box = document.getElementsByClassName("box");
    for(var e of div_box){
        e.classList.add("scroll_anim");
    }
    

    scroll_e = document.getElementsByClassName('scroll_anim');
    
    for(var e of scroll_e){
        e.classList.add("hidden");
    }
    
    var skills = document.getElementsByClassName("skills");
    for(var s of skills){
        for(var i = 0; i < s.childNodes.length; i++){
            c = s.childNodes[i]
            c.classList.add("scroll_anim");
            c.style.transitionDelay = (i * 100)  + "ms";
        }
    }


    

    setInterval(()=>{
        var img = document.getElementById("treeimg");
        var date = new Date();
        img.src = "images/kairos310.github.io_generativeTree_ (" + Math.floor(date.getTime()/2000) % 8 + ").png";
    },2000);
})


// Set the visibility of the element based on its position on the page
function updateElementVisibility() {
    for(var e of scroll_e){
        var rect = e.getBoundingClientRect();
        if (rect.bottom >= 100  && rect.top <= window.innerHeight - 100) {
            e.classList.remove('hidden');
        } else {
            e.classList.add('hidden');
        }
    }
}

// Update the element visibility when the user scrolls
window.addEventListener('scroll', updateElementVisibility);

// Update the element visibility when the page loads
updateElementVisibility();
