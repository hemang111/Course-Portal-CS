import { registerit } from "./registerit.js";
import { loaddata } from "./loaddata.js";
export async function mongo_fetch(user){
    const Data = {
      email: user.email,
    } 
  const response = await  fetch('/api/webinars/availablewebinars',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Data)
    })
    const dtam = await response.json();
    const response2 = await  fetch('/api/webinars/registeredcourses',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Data)
    })
    const dtar = await response2.json();
    loaddata(dtam,'avalable');
    loaddata(dtar,'registered');
    registerit(user);
  } 