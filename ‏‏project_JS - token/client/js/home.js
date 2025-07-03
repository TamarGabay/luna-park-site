
function order_ticket()
{
    window.location.href = 'atractions.html'; // Redirect to the contact page
}
function log_up()
{
    window.location.href = 'signUp.html'; // Redirect to the contact page
    
}
function log_in()
{
    console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
    window.location.href = 'signIn.html'; // Redirect to the contact page
    
}
function out(){
    localStorage.setItem('name',"אורח");
    localStorage.setItem('password',"0000");
    location.reload();
}

const name=localStorage.getItem('name');
const icon=document.createElement('div')
// icon.className='fas fa-user profile-icon'
icon.innerHTML = '<i class="fas fa-user profile-icon"></i>';     

    // ${"#helloto"}.innerText()
    let h3=document.getElementById("helloto");
    h3.innerHTML=name+'  '+icon
    console.log("hello to "+h3+icon)

// // פונקציה לקבלת פרמטרים מה-URL
// function getQueryParams() {
//     const params = {};
//     const queryString = window.location.search.substring(1);
//     const queryArray = queryString.split('&');
//     queryArray.forEach(param => {
//         const [key, value] = param.split('=');
//         params[decodeURIComponent(key)] = decodeURIComponent(value);
//     });
//     return params;
// }

// const params = getQueryParams();
// console.log(params.name); // 'exampleUser'
// console.log(params.id); // 'examplePass'

