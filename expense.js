const leaderboard = document.getElementById("leaderboard");


  async function saveToLocalStorage(event){
    try{
    event.preventDefault();
   const expanseAmount = event.target.expanseamount.value;
   const Description = event.target.description.value;
   const Category = event.target.category.value;
   
   const obj = {
     expanseAmount,
     Description,
     Category
   }
   const token = localStorage.getItem('token');
 
   
   let result = await axios.post("http://localhost:1000/user/add-users",obj,{headers: {"Authorization": token}})
    
       console.log("resulttttttttttttttttttttttttttttt",result)
        showListOfRegistered(result.data.newUserDetail);
    
               
                 
                       //console.log(response2)
}             
                   catch(err)  {
                    document.body.innerHTML = document.body.innerHTML + "<h4>Error: Somethiiiiiing Not found</h4>" 
                   console.log(err)
  }
   //localStorage.setItem(obj.Category,JSON.stringify(obj));
   //showListOfRegistered(obj)

}

  window.addEventListener('DOMContentLoaded', async (event) => {
  try{
   const token = localStorage.getItem('token')
  let response = await axios.get("http://localhost:1000/user/get-users",{headers: {"Authorization": token}})
                
                        for(i=0;i<response.data.allUsers.length;i++){
                        showListOfRegistered(response.data.allUsers[i]);
                      }
                    }                     

                      catch(err) {console.log(err)}
   // Object.keys(localStorage).forEach(key => {
     //   const category = JSON.parse(localStorage.getItem(key));
        //console.log(JSON.parse(localStorage.getItem(key)))
       // showListOfRegistered(category); 

})

function showListOfRegistered(categories){
  
   document.getElementById('expanseamount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    
    /*
    if(localStorage.getItem(categories.Category) !== null){

        removeRegistered(categories.Category);
    }
    */
    var parentNode4 = document.getElementById('listofCategories');

    var childNode4 = `<li id=${categories.id}> ${categories.expenseamount} ${categories.description} ${categories.category} <button onclick = deleteRegistered('${categories.id}')>Delete</button> <button onclick = editRegistered('${encodeURIComponent(categories.expenseamount)}','${encodeURIComponent(categories.description)}','${encodeURIComponent(categories.category)}','${categories.id}')>Edit</button> </li>`
    parentNode4.innerHTML = parentNode4.innerHTML + childNode4;
}

function editRegistered(expanse1, amount1, category, id)
{

document.getElementById('expanseamount').value = decodeURIComponent(expanse1);
document.getElementById('description').value = decodeURIComponent(amount1);
document.getElementById('category').value = decodeURIComponent(category);

deleteRegistered(id)
}

async function deleteRegistered(ID){
  try{
    const token = localStorage.getItem('token');
    const id = {ID};   
  removeRegistered(ID);
  //await axios.delete(`http://localhost:1000/user/delete-users/${ID}`,{headers: {"Authorization": token}})
  await axios.post('http://localhost:1000/user/delete-users',id,{headers: {"Authorization": token}})

  }   
            
 catch(err) {console.log(err)}


   // localStorage.removeItem(cate);
    //removeRegistered(cate);
}


function removeRegistered(IDs){

  var parentNode1 = document.getElementById('listofCategories');
                    const childNodeToBeDeleted2 = document.getElementById(IDs);
                   // console.log(category2)
                   // console.log(childNodeToBeDeleted)
                    if(childNodeToBeDeleted2)
                    {
                    parentNode1.removeChild(childNodeToBeDeleted2);
                    }

}




document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const response  = await axios.get('http://localhost:1000/purchase/premiummembership', { headers: {"Authorization" : token} });
   
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:1000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then((response) => {
            if(response.status === 202)
            {
               darktheme();
              alert('You are a Premium User Now')
            }
         
             
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


async function is__premium() {
    let obj = {
      id: 123,
    };
    const token = localStorage.getItem("token");
    await axios
      .post("http://localhost:1000/is_premium", obj, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res.data.ispremium)
        if (res.data.ispremium) {
          const body = document.body;
          const i1 = document.getElementById("expenseform");
          const i2 = document.getElementById("expenses");
          body.classList.add("active");
          i1.classList.add("active1");
          i2.classList.add("active1");
          //adding leaderboard to the premium users
          axios
            .get("http://localhost:1000/leaderboard", {
              headers: { Authorization: token },
            })
            .then((users) => {
              // console.log(users.data.users)
  
              for (let i = 0; i < users.data.users.length; i++) {
                const expensediv = document.createElement("div");
                expensediv.classList.add("expensediv");
                expensediv.innerHTML = `
                    <span>${i + 1}</span>
                    <span class="desc1"}>${users.data.users[i].username}</span>
                    <span class="category"id="category">${
                      users.data.users[i].totalexpense
                    }</span>
                    `;
  
                leaderboard.appendChild(expensediv);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
    document.getElementById("rzp-button1").classList.add("hide");
  }

function darktheme()

{
  let dark = document.getElementById('toggle-container')

  var innerhtml = `
  <input type="checkbox" id="toggle" name="toggle"><label for="toggle"></label>
`
dark.innerHTML = innerhtml;

const toggle = document.getElementById("toggle")

toggle.addEventListener('change', (e) =>{
    document.body.classList.toggle('dark', e.target.checked)
})

}