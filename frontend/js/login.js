const formLogin = document.getElementById("form-login");
const mensajeError=document.getElementById("mensaje-error");

formLogin.addEventListener("submit",async(e)=>{
     e.preventDefault();

     const email= document.getElementById("email").value;
     const password= document.getElementById("password").value;

     try{
         const respuesta= await fetch("http://localhost:3000/auth/login",{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({email,password}),
         });

         const data = await respuesta.json();

         if(respuesta.ok){
            localStorage.setItem("tokenClinica",data.token);
            window.location.href="index.html";
         }else{
            mensajeError.textContent=data.mensaje || "Error al iniciar sesion";
            mensajeError.style.display = "block";
         }
     }catch(error){
        console.error("Error en la petición:", error);
        mensajeError.textContent = "Error al conectar con el servidor.";
        mensajeError.style.display = "block";
     }
})