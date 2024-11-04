let timecourses = {}
import members from "../members.mjs";
import { timeupdateR ,timeupdate} from "./timeupdaterR.mjs";

export function loaddata(datai,query ){
    (Object.keys(datai.courses)).forEach(element => {
      console.log(datai)
      const templatei = document.getElementById('temp_f');
      const clonetemp = templatei.cloneNode('true');
      const mentor_mail = members[datai.courses[element].Mentor].email;
      const mentor_img = members[datai.courses[element].Mentor].profilepic;
      const Ta_mail = members[datai.courses[element].TA].email;
      const Ta_img = members[datai.courses[element].TA].profilepic;
      timecourses[element.replaceAll(' ' , '_')] = {}
      timecourses[element.replaceAll(' ' , '_')].time = datai.courses[element].Time;
      timecourses[element.replaceAll(' ' , '_')].date = datai.courses[element].Date;
      clonetemp.querySelector('.mentor').innerText = datai.courses[element].Mentor;
      clonetemp.querySelector('img').setAttribute('src' , mentor_img );
      clonetemp.querySelectorAll('img')[1].setAttribute('src' , Ta_img );
      clonetemp.querySelector('.email').setAttribute('href', `mailto:${mentor_mail}`);
      clonetemp.querySelector('.email').innerText = mentor_mail;
      clonetemp.querySelectorAll('.email')[1].setAttribute('href', `mailto:${Ta_mail}`);
      clonetemp.querySelectorAll('.email')[1].innerText = Ta_mail;
      clonetemp.querySelector('.ta').innerText = datai.courses[element].TA;
      clonetemp.querySelector('.title').innerText = datai.courses[element].Title;
      clonetemp.querySelector('.type').innerText = datai.courses[element].type;
      clonetemp.classList.toggle('hidden');
      if(query == "registered"){
        clonetemp.id = element.replaceAll(' ' , '_') + "_reg";
        clonetemp.querySelector('.add').remove();
        clonetemp.querySelector('.buttonl').style.display = 'none';
        clonetemp.querySelector('.button').querySelector('a').setAttribute('href',`${datai.courses[element].glink}`);
        clonetemp.querySelector('.buttonr').querySelector('a').setAttribute('href',`${datai.courses[element].clink}`);
        console.log(datai.courses[element]);
        setInterval( ()=>{
        console.log(datai.courses[element]);
        timeupdateR(clonetemp,datai.courses[element]);
        },100)
        document.getElementById('registered').appendChild(clonetemp);
      }
      else{
        clonetemp.querySelector('.button').remove();
        clonetemp.id = element.replaceAll(' ' , '_') + "_ava";
        clonetemp.querySelector('.buttonl').remove();
        clonetemp.querySelector('.buttonr').remove();
        clonetemp.querySelector('.add').classList.toggle('Register');
        document.getElementById('append_reg').appendChild(clonetemp);
      }
  })
  document.getElementById('main').style.display = "block";
  document.getElementById('loader').style.display = "none";
  setInterval(() => {
    timeupdate(timecourses);
  }, 100);
}

