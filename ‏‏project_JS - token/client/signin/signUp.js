window.onload=function(){
    document.getElementById('registrationForm').addEventListener('submit',function(event){
        event.preventDefault();
        createNewUser();
    })
}

async function createNewUser()
{
    //get the user input values
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var birthDate=document.getElementById('birthDate').value;
    var password=document.getElementById('password').value;

    const url='http://localhost:3000/signin';
    const data={name,email,birthDate,password};
    
    try{
        const response=await postData(url,data);
        if(!response.ok)
        {
            throw new Error("network response was not ok"+ response.statusText);
        }
        const json=await response.json();
        console.log(json);
        let message=document.createElement('h1');
        document.body.appendChild(message);
        message.innerHTML=json.mess;
    }
    catch(err){
        console.log("error creating:", error);
    }
}

    async function postData(url='',data={}){
        try{
            const response=await fetch(url,{
                method:"POST",
                mode:'cors',
                cache:'no-cache',
                credentials:'same-origin',
                headers:{
                    "Content-Type":"application/json"},
                
                body:JSON.stringify(data)
            });
            return response;
        }
        catch(error){
            throw new Error("error posting data:"+ error);
        }
    }

    //     const json= await data.json();
    //     console.log(json);
    //     //לא ככ הבנו------
    //     const s=json.user.map(p=>`<div>${s.name}</div>`);
    //     document.body.innerHTML=s.join(" ");

    //     //
    //     var requestData={
    //         name:name,
    //         email:email,
    //         birthDate:birthDate,
    //         password:password
    //     };
    //     var settings={
    //         "url":"http://localhost:3000/signin",
    //         "method":"POST",
    //         "timeout": 0,
    //         "headers":{
    //             "Content-Type":"application/json"
    //         },
    //         "data":JSON.stringify(requestData),
    //     };
  
