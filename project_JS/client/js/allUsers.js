

var users= [{}];
function f2(){

    const userList = document.getElementById('userList');
    const searchInput = document.getElementById('searchInput');
    let deleteUsers = document.getElementById('delete_all')

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.nameUser}</h3>
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Age:</strong> ${user.age}</p>
            `;

            const delete_btn = document.createElement('button');
            delete_btn.className = 'delete_btn';
            delete_btn.innerHTML = '<i class="fas fa-trash"></i>';     
            
            userCard.appendChild(delete_btn)
            userList.appendChild(userCard);
            delete_btn.addEventListener('click',()=>{deleteUser(user.id)})
        });
    }
    function filterUsers(query) {
        const filteredUsers = users.filter(user => user.id.includes(query));
        displayUsers(filteredUsers);
    }

    searchInput.addEventListener('input', (event) => {
        filterUsers(event.target.value);
    });

    // Display all users initially
    displayUsers(users);
}

async function f11(){
    users = await get_users();
    f2();
}

async function get_users() {
    const response = await fetch(`http://localhost:3000/getUser`, {
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
f11()})

async function delete_users()
{
    if(users.length <= 0){
        alert('לא  נמצאו לקוחות ');
        return;
    }
    let isdel= confirm("אתה בטוח במחיקת כ--ל הלקוחות?")
    if(isdel)
    {
        //מחיקת כל הכרטיסים  
        const response = await fetch(`http://localhost:3000/deleteAllCards`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({date: date,count})
    
        });
        const data=await response.json();
        if(response.ok)
        {
            console.log("delete")
            // location.reload();
            }
            else{
                alert("error: fail to delete user "+data.message)
            }
       

        //מחיקת כל המשתמשים
        const response1 = await fetch(`http://localhost:3000/deleteAllUsers`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        });
 
        
        const data1 = await response1.json();
        if (response.ok) {
            console.log("all users deleted!!!");
            location.reload();
        }
        else{
            console.log("error!!!!!!!!!!!!!!!!!!!");
        }
    }
    // return data;
    // localStorage.setItem('name', "אורח")
    // localStorage.setItem('password', "0000")
    // location.reload();
}

//delete
async function deleteUser(id)
{
    let isdel= confirm("אתה בטוח במחיקת הלקוח?")
    if(isdel)
    {
            //מחיקת כרטיסי המשתמש הנוכחי
            const response = await fetch(`http://localhost:3000/deleteCardByIdUser?idUser=${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',


                },    
            });
            const data=await response.json();
            if(response.ok)
            {
                console.log("delete")
                console.log("data:"+data)
                // location.reload();
            }
            else
            {
                alert("error: fail to delete user "+data.message)
            }

            //מחיקת המשתמש
            const response1 = await fetch(`http://localhost:3000/deleteUserById?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({date: date,count})

        });

        const data1=await response1.json();
        if(response1.ok)
        {
            console.log("delete")
            console.log("data1:"+data1)
            location.reload();
        }
        else
        {
            alert("error: fail to delete user "+data1.message)
        }
        // localStorage.setItem('name', "אורח")
        // localStorage.setItem('password', "0000")
        // location.reload();
   }
   else
    return;
}