export async function registerit(user){
    Array.from(document.getElementsByClassName('Register')).forEach(element => {
     element.addEventListener('click' , async(event)=>{
        let datatable = event.target.closest('td');
        let template = datatable.closest('tr');
        let dataclone = template.cloneNode('true');
        let m =  await registerdata(user.email , dataclone.querySelector('.title').innerText);
        registerdata(user.email, dataclone.querySelector('.title').innerText)
       .then((m) => {
        console.log(m);
        if (m == 0) {
        alert('Registered successfully');
        dataclone.querySelector('.Register').remove();
        dataclone.querySelector('.time').innerHTML = "Upcoming";
        document.getElementsByClassName('loaded')[0].appendChild(dataclone);  
        template.remove();
        location.reload();
       }
       })
      .catch((error) => {
      console.error('Registration failed:', error);
       });
        
      })
    });
    }
    async function registerdata(email, course){
        const Data = {
          mail: email,
          course : course
        }
      const response = await fetch('/api/webinars/registercourse',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      })
        const dtam = await response.json();
        if(dtam.message == "Registered"){
          return 0
        }
        else{
          alert('Error Registering Contact Team')
          return 1
        }
      }