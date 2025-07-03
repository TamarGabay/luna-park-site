let typee;
function openOrderForm(title, imageSrc, price,idType) {
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('orderTitle').innerText = title;
    document.getElementById('orderImage').src = imageSrc;
    document.getElementById('orderPrice').innerText = 'מחיר: ₪' + price;
    typee=idType;
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

async function submitOrder(event) {
    event.preventDefault();
    
    var typeCard=typee;
    var date = document.getElementById('date').value;
    var codeCard=0;
    var count = document.getElementById('quantity').value;
    var idUser = localStorage.getItem('password');
    const response = await fetch('http://localhost:3000/getLastCard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({nameUser, id, email, age})
    });
    try
    {
        const data = await response.json();
        if(data && data.length > 0){
            console.log("enter!!!!")
        }
        else{ 
            console.log("data: "+data);
            codeCard=data.codeCard
            codeCard=codeCard+1
        }
    }
    // console.log(response);
    catch
    {
        codeCard=1;
    }
    console.log("code card: "+codeCard);

    let date1=new Date(date);
    var today = new Date()
    if(date1<= today){
        alert("warning: cannot invite this date\n choose correct date!");
        return;
    }
    else if(date1.getDay()===6)
    {
        alert('האתר שומר שבת!!!!!\n בחר תאריך אחר ')
        return;
    }
    if (count && date) {
        closeOrderForm();
    } else {
        alert('Please fill in all fields.');
    }
    console.log('==============================================')
    console.log(`type: ${typeCard}, date: ${date}, codeCard: ${codeCard}, count: ${count}, idUser: ${idUser}`);

    //הוספת הכרטיס
    const response1 = await fetch('http://localhost:3000/addNewCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({typeCard,date,codeCard,count,idUser})
    });

    var card = {"typeCard": typeCard, "Date": date,"codeCard":codeCard, "count":count,"idUser":idUser}
    const data1 = await response1.json();
    if(response1.ok)
    {
        console.log("data1:  "+card.date,card.count,card.typeCard)
       // window.location.href='home.html';
    }
     else {
        alert('Error: ' + data1.message);
    }
    window.location.href = 'orders.html'
}

