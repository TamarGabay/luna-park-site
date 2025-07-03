
var allOrders = [{}]

async function showOrders(){
    //event.preventDefault(); // מונע מהטופס לבצע טעינה מחדש של הדף
    idUser=localStorage.getItem('password');
    const response = await fetch(`http://localhost:3000/getCardByIdUser?idUser=${encodeURIComponent(idUser)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({name, id})
    });
    
    const orders = await response.json();
    if (response.ok) {

    }
    return orders
}

async function f1()
{
    allOrders=await showOrders();

    // console.log(allOrders[0].codeCard)
    f2();
    
}
document.addEventListener('DOMContentLoaded', () => {
    f1();
})

// console.log('orders[0]  : '+orders[1].codeCard)
function f2()
{
    // console.log(allOrders.length)
        // console.log("did you entered???????????")
    const ordersContainer = document.getElementById('orders-container');
    const totalAmountElement = document.getElementById('total-amount');
    
    let totalAmount = 0;
    if(allOrders.length > 0){
    ordersContainer.innerHTML = '';
    allOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        const update = document.createElement('button')
        update.className='update_btn'
        update.innerHTML='לעדכון כרטיס'

        const delete_btn = document.createElement('button');
        delete_btn.className = 'delete_btn';
        delete_btn.innerHTML = '<i class="fas fa-trash"></i>';     
        
        const image = document.createElement('img');
        // image.src = order.image;
        image.alt = `Image of ${order.type} ticket`;

        const orderDetails = document.createElement('div');
        orderDetails.className = 'order-details';

        // const title = document.createElement('h3');
        // title.textContent = `Order ID: ${order.codeCard}`;

        const type = document.createElement('p');
        type.textContent = `Ticket Type: ${order.typeCard}`;

        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${order.count}`;

        let cost=0;
        // console.log("type: "+type)
        switch(order.typeCard){
            case 'adult-card':
                cost=100
                image.src = "../images/adul-ticket.jpg"
                break;
            case 'kid-card':
                cost=50
                image.src = "../images/child-ticket.jpg"
                break;
            case 'family-card':
                cost=200
                image.src = "../images/family-ticket.jpg"
                break;
            case 'senior-card':
                cost=350
                image.src = "../images/senior-ticket.jpg"
                break; 
            default: 
                cost=10
        }
        // const newDate=`${order.date.getDay()}-${order.date.getMonth()}-${order.date.getYear()}`
        // console.log("newDate   "+newDate)
        const price = document.createElement('p');
        price.textContent = `Price per Ticket: ₪${cost}`;
        //console.log("date: "+ order.Date.day)
        const date = document.createElement('p');
        let date2 = new Date(order.date).toISOString().split('T')[0]; // תאריך בפורמט yyyy-mm-dd
        date.textContent = `Date: ${date2}`;
        const totalPrice = document.createElement('p');
        const total = order.count * cost;
        totalPrice.textContent = `Total Price: ₪${total.toFixed(2)}`;


        // orderDetails.appendChild(title);
        orderDetails.appendChild(type);
        orderDetails.appendChild(quantity);
        orderDetails.appendChild(price);
        orderDetails.appendChild(date);
        orderDetails.appendChild(totalPrice);
        // console.log(order.typeCard)
        orderItem.appendChild(image);
        orderItem.appendChild(orderDetails);
        orderItem.appendChild(update);
        orderItem.appendChild(delete_btn);
        let typeCard,img, cost2, codeCard,count;
        let date1=new Date(order.date)
        typeCard= order.typeCard;
        img = image.src;
        cost2 = cost;
        codeCard= order.codeCard;
        count = order.count;
        ordersContainer.appendChild(orderItem);
        // console.log("ppppppppppp"+typeCard,img, cost2, codeCard,count,date1)
        update.addEventListener('click',async()=>{openOrderForm(typeCard,img, cost2, count,date1,codeCard)});
        totalAmount += total;
        
        //delete
        delete_btn.addEventListener('click',()=>{deleteCard(codeCard)})
    });
    totalAmountElement.textContent = `₪${totalAmount.toFixed(2)}`;
        }
        else{
            let container = document.getElementById('container')
            let h1 = document.getElementById('h1')
            h1.innerHTML = 'לא קיימים כרטיסים'
            container.appendChild(h1)
        }
        
}
//update
var codeCard1=0
let typee;
function openOrderForm(typeCard, image, price, count,date,codeCard) {
    // let new2 = new Date(date)
    // let year = new2.getYear(), month = new2.getMonth(), day = new2.getDay();
    // console.log(`year: ${year}, month: ${month}, day: ${day}`)
    // let newDate=`${date.getFullYear()}-${date.getDay()}-${date.getMonth()}`
    // let date2 = new Date(year, month, day)
    let date2 = new Date(date).toISOString().split('T')[0]; // תאריך בפורמט yyyy-mm-dd
    console.log(`type:${typeCard}, image:${image},price:${price},date:${date2},count:${count}`)
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('orderTitle').innerText = typeCard;
    document.getElementById('orderImage').src = image;
    document.getElementById('orderPrice').innerText = 'מחיר: ₪' + price;
    document.getElementById('quantity').value=count;
    document.getElementById('date').value=date2;
    console.log("date2:  "+date2)
    codeCard1=codeCard;
    // typee=idType;
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

async function submitOrder(event) {
    event.preventDefault();
    
    // var typeCard=typee;
    var date = document.getElementById('date').value;
    var count = document.getElementById('quantity').value;
    var idUser = localStorage.getItem('password');

    // console.log("code card: "+codeCard);

    let date1 = new Date(date)
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
    if (count && date1) {
        closeOrderForm();
    } else {
        alert('Please fill in all fields.');
    }
    console.log('====================code card:'+codeCard1+'=========================')
    // console.log(`type: ${typeCard}, date: ${date}, codeCard: ${codeCard}, count: ${count}, idUser: ${idUser}`);

    //הוספת הכרטיס
    const response1 = await fetch(`http://localhost:3000/updateCard?codeCard= ${encodeURIComponent(codeCard1)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({date: date,count})
    });

    // var card = {"typeCard": typeCard, "Date": date,"codeCard":codeCard, "count":count,"idUser":idUser}
    const data1 = await response1.json();
    if(!response1.ok)
    {
        alert('הנתונים עודכנו בהצלחה!\nQuantity: ' + count + '\nDate: ' + date);
        location.reload();
    }
     else {
        alert('Error: ' + data1.message);
    }
}

//delete
async function deleteCard(codeCard){

    let isdel= confirm("אתה בטוח במחיקת הכרטיס?")
    if(isdel){
    const response = await fetch(`http://localhost:3000/deleteCardByCode?codeCard= ${encodeURIComponent(codeCard)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({date: date,count})

    });
    const data=await response.json();
    if(response.ok)
    {
        location.reload();
    }
    else{
        alert("error: fail to delete card"+data.message)
    }
   }
}
