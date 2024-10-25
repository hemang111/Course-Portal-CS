export function timeupdateR(object, element) {
  let Dayr = parseInt(element.Wd[0] + element.Wd[1]);
  let month = parseInt(element.Wd[3] + element.Wd[4]);
  let year = parseInt(element.Wd[6] + element.Wd[7] + element.Wd[8] + element.Wd[9]);
  let hour = parseInt(element.Wt[0] + element.Wt[1]);
  let minutes1 = parseInt(element.Wt[3] + element.Wt[4]);
  
  let date_dead = new Date(year, month - 1, Dayr, hour, minutes1);
  date_dead = new Date(date_dead.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
  let date = new Date();
  date = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
  const yearm = date.getFullYear();
  const monthm = date.getMonth() + 1;
  const daym = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  let date2 = new Date(yearm, monthm - 1, daym, hours, minutes, seconds);
  date2 = new Date(date2.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
  const timeRemaining = date_dead - date2;
  const differenceInDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours1 = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes2 = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds1 = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  let isappended = false;
  if (date_dead.valueOf() > date2.valueOf()) {
      object.querySelector('.time').innerText = `${differenceInDays}d : ${hours1}h : ${minutes2}m : ${seconds1}s`;
      if (differenceInDays == 0 && hours1 == 0 && minutes2 < 30 && !isappended) {
          isappended = true;
          object.querySelector('.buttonl').style.display = "flex";
          object.querySelector('.buttonl').querySelector('a').setAttribute('href', `${element.mlink}`);
      }
  } else if (date_dead.valueOf() <= date2.valueOf() && date_end.valueOf() > date2.valueOf()) {
      object.querySelector('.buttonl').style.display = "flex";
      object.querySelector('.time').innerText = `Live`;
      if (!isappended) {
          isappended = true;
          object.querySelector('.buttonl').querySelector('a').setAttribute('href', `${element.mlink}`);
      }
  } else {
      object.remove();
  }
}

export function timeupdate(timecourses){
    Object.keys(timecourses).forEach(element =>{
      // console.log(timecourses)
      let Dayr = timecourses[element].date[0] + timecourses[element].date[1];
      let month = timecourses[element].date[3] + timecourses[element].date[4];
      let hour = timecourses[element].time[0] +  timecourses[element].time[1]
      let min = timecourses[element].time[3] +timecourses[element].time[4]
      let sec = timecourses[element].time[6] +timecourses[element].time[7]
      // console.log(timecourses[element].time);
      let year = timecourses[element].date[6] +timecourses[element].date[7] + (timecourses[element].date[8]) + (timecourses[element].date[9]);
      let date1 = new Date(year , month-1,Dayr,hour,min,sec);
      let date = new Date();
  
      date = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      date1 = new Date(date1.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      const daym = String(date.getDate()).padStart(2, '0');
      const monthm = String(date.getMonth() + 1).padStart(2, '0'); 
      const yearm =  String(date.getFullYear()); 
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      let date2 = new Date(yearm, monthm - 1, daym, hours, minutes,seconds);
      date2 = new Date(date2.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const timeRemaining = date1-date2;
      const differenceInDays = Dayr - daym;
      const hours1 = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes1 = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds1 = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      // console.log(date1)
      if(date1.valueOf() > date2.valueOf()){
        if(document.getElementById(element.replaceAll(' ','_') + "_ava")){
       document.getElementById(element.replaceAll(' ','_') + "_ava").querySelector('.time').innerText = `${differenceInDays}d : ${hours1}h : ${minutes1}m : ${seconds1}s`
        }
      }
      else if(date2.valueOf() > date1.valueOf()){
        if(document.getElementById(element.replaceAll(' ','_') + "_ava")){
          document.getElementById(element.replaceAll(' ','_') + "_ava").remove();
           }
      }
    })
  }  