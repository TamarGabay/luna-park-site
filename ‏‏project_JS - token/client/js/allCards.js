
var cards= [{}];
function f2(){

    const cardsList = document.getElementById('userList');
    const searchInput = document.getElementById('searchInput');

    function displayUsers(cards) {
        cardsList.innerHTML = '';
        cards.forEach(card => {
            const cardCard = document.createElement('div');
            cardCard.className = 'user-card';
            cardCard.innerHTML = `
                <h3>${card.typeCard}</h3>
                <p><strong>CODE-CARD:</strong> ${card.codeCard}</p>
                <p><strong>DATE:</strong> ${card.date}</p>
                <p><strong>COUNT:</strong> ${card.count}</p>
                <p><strong>ID-USER:</strong> ${card.idUser}</p>
            `;

            const delete_btn = document.createElement('button');
            delete_btn.className = 'delete_btn';
            delete_btn.innerHTML = '<i class="fas fa-trash"></i>';     
            
            cardCard.appendChild(delete_btn)
            cardsList.appendChild(cardCard);
            delete_btn.addEventListener('click',()=>{deleteCard(card.codeCard)})
        });
    }

    function filteredCards(query) {
        const filteredCards = cards.filter(card => card.idUser.includes(query));
        displayUsers(filteredCards);
    }

    searchInput.addEventListener('input', (event) => {
        filteredCards(event.target.value);
    });

    // Display all users initially
    displayUsers(cards);
}

async function f1(){
    cards = await get_users();
    f2();
}

async function get_users() {
    const response = await fetch(`http://localhost:3000/getCard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
 
        
    const data = await response.json();
    if (response.ok) {
        console.log("all users are here!!!");
    }
    else{
        console.log("error!!!!!!!!!!!!!!!!!!!");
    }
    return data;
} 
document.addEventListener('DOMContentLoaded', () => {
f1()})

async function delete_cards()
{
    if(cards.length <= 0){
        alert('לא נמצאו כרטיסים ');
        return;
    }
    let isdel= confirm("אתה בטוח במחיקת כ--ל הכרטיסים?")
    if(isdel)
    {
        //מחיקת כל המשתמשים
        const response = await fetch(`http://localhost:3000/deleteAllCards`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        if (response.ok) {
            console.log("all users deleted!!!");
            location.reload();
        }
        else{
            console.log("error!!!!!!!!!!!!!!!!!!!");
        }
        location.reload();
    }
}
//delete
async function deleteCard(codeCard)
{
console.log(codeCard)
    let isdel= confirm("אתה בטוח במחיקת הכרטיס?")
    if(isdel)
        {
        //מחיקת כרטיסי המשתמש הנוכחי
        const response = await fetch(`http://localhost:3000/deleteCardByCode?codeCard= ${encodeURIComponent(codeCard)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },    
        });
        const data=await response.json();
        if(response.ok)
        {
            console.log("delete")
            location.reload();
        }
        else{
            alert("error: fail to delete user "+data.message)
        }
       }
    location.reload();
}
