console.log("hellooooooo!!!")
async function signUp(event) {
    console.log("ttttttttt!!!")
    event.preventDefault(); // מונע מהטופס לבצע טעינה מחדש של הדף

    const nameUser = document.getElementById('name').value;
    const id = document.getElementById('id1').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    console.log(`Sending data: Name: ${nameUser}, Email: ${email}, Age: ${age},ID:${id}`);

    const response = await fetch('http://localhost:3000/createNewUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nameUser, id, email, age})
    });

    const data = await response.json();

    localStorage.setItem('name', nameUser);
    localStorage.setItem('password', id);
    localStorage.setItem('token', data.token)
    if (response.ok) {
        // console.log(`token:${data.token}`);
    
        alert('User created successfully');
        window.location.href='home.html'
        // localStorage.setItem('myToken', data.token);
    } else {
        alert('Error: ' + data.message);
    }
    return data;
}

        function handleSubmit(event) {
            event.preventDefault();
            // Handle the form submission here
            alert('Form submitted!');
        }