function out(){
    localStorage.setItem('name',"אורח");
    localStorage.setItem('password',"0000");
    window.location.href = 'home.html'
}

const name=localStorage.getItem('name');
let h3=document.getElementById("helloto");
h3.innerHTML=name+'  🤓'
