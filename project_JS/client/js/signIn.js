console.log("hellooooooo to sign innnn!!!")
async function signIn(event) {
    console.log("yyyyyyyyyyyyyy!!!")
    event.preventDefault(); // מונע מהטופס לבצע טעינה מחדש של הדף

    const name = document.getElementById('nameSignIn').value;
    const id = document.getElementById('idSignIn').value;
    console.log(`Sending data: Name: ${name},   ID:${id}`);
    if(name==='manager'&& id==='123456789')
        {
            localStorage.setItem('name','מנהל')
            localStorage.setItem('password','123456789')
            window.location.href='manager.html';
            return
        }
    const response = await fetch(`http://localhost:3000/getUserByID?id=${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({name, id})
    });
    const data = await response.json();
    if (response.ok) {
        console.log("data.name"+data.nameUser)
        if(data.nameUser===name)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
            localStorage.setItem('name', name);
            localStorage.setItem('password', id);
            window.location.href = `home.html`;
        }
        else
        {
            alert('השם והסיסמא אינם תואמים')
        }
    } 
    else {
        alert('Error: ' + data.message);
        window.location.href = `signUp.html`;

    }
}

