async function update(event) 
{
    console.log("update!!!")
    event.preventDefault(); // מונע מהטופס לבצע טעינה מחדש של הדף
    
    const nameUser = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const id=localStorage.getItem('password')
    console.log(`Sending data: Name: ${nameUser}, Email: ${email}, Age: ${age}`);

    const response = await fetch(`http://localhost:3000/updateUser?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nameUser, email, age})
    });

    const data = await response.json();
    localStorage.setItem('name', nameUser);
    localStorage.setItem('password', id);
    window.location.href='home.html'
    if (response.ok) {
       
        alert('User updated successfully');

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
