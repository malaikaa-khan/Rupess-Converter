const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns=document.querySelectorAll(".drop-down select");
let btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const updateMsg=document.querySelector(".msg");



for(let select of dropdowns){
    for(currCode in countryList){
       let newOption=document.createElement('option');
       newOption.innerHTML= currCode;
       newOption.value= currCode;
       if(select.name ==='from' && currCode ==='USD'){
        newOption.selected ='selected';
       }
       else if(select.name ==='to' && currCode ==='PKR'){
        newOption.selected ='selected';
       }
       select.append(newOption);
       
    }

    select.addEventListener('change',(ev)=>{
        updateFlag(ev.target);
    })
}


let updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src =newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();

})

let updateExchangeRate = async()=>{
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal === '' || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
    let url=`${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data= await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalVal =amtVal * rate;
    
    updateMsg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`
}

window.addEventListener('load',()=>{
    updateExchangeRate();
})