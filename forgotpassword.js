document.getElementById("sendreset").addEventListener("click",(e)=>{
    e.preventDefault()
    const email=document.getElementById("email").value
    console.log(email)
    let obj={
        email:email
    }
    axios
    .post("http://localhost:1000/forgotpassword",obj)
    .then((res)=>{
        alert(res.data.message);
        window.location.replace('./index.html')

    })
})