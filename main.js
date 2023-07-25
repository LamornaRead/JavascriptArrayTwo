// vars //////////////////////////////////////////////////////////////////////////////////////////////////////////
const email = document.getElementById('email').value;
const input = document.getElementById('email');
const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const url ='https://picsum.photos/200';
let img = document.getElementById('image');
const newImgBtn = document.getElementById('new-image');
const removeBtn = document.getElementById('remove');

// var arrays/////////////////////////////////////////////////////////////////////////////////////////////////////

let lastEmail = [];
let pic = [];

//functions ////////////////////////////////////////////////////////////////////////////////////////////////////


// validate email function /////////////////////////////////

function validateEmail() {
    event.preventDefault();
    // test email false
    if(!emailFormat.test(input.value) || email.value == 0) {
          input.style.border = '1px solid red';
          input.style.boxShadow = '0 0 20px red';
          input.placeholder = 'Please fill in email.';
          invalidEmail();
          return;
    } 
    input.style.border = '1px solid grey';
    input.style.boxShadow = '';
    input.placeholder = '';
    vaildEmail();
    assignImage();
    displayData();
    console.log('Success'); 
}


//fetch data ////////////////

function fetchImage() {
    fetch(url)
    .then(response => img.src = response.url)
    .catch(error => console.error(error));
}




// assign data to email/////////////////////////////////////////////////

function assignImage() {

    if(checkEmailPresent(input.value)) { // if the email is present

        //get the index of the email in array
        let emailIndex = lastEmail.indexOf(input.value);

        // console log to check the index matches
        // console.log(emailIndex);
        
        //use the index to push the image in the array
        if(checkImage(img.src)) {
             imageThere();
        } else {
            pic[emailIndex].push(img.src);
            imageNotThere();
        }          
    } else { // if the email isnt present //
        lastEmail.push(input.value);
        //creates new image array for new email
        pic.push([img.src]);
        imageNotThere();
    }

    // console.log(lastEmail);
    // console.log(input.value);
    // console.log(pic);
    // console.log(img.src);
}

//// check functions /////////////////////////////////////////////////



function checkEmailPresent(emailInput) {
    for (let i = 0; i < lastEmail.length; i++) {
        if(lastEmail[i] == emailInput) {
            // console.log('this matches an email');
            return true;
        } 
    }
    return false;
}


function checkImage(src) {
        let emailIndex = lastEmail.indexOf(input.value);

    for (let i = 0; i < pic[emailIndex].length; i++) {
        if(pic[emailIndex][i] == src) {
            // console.log('this matches an image');
            return true;
        } 
    }
    return false;
}



// error display fuctions /////////////////////////////////////////////////

function invalidEmail() {
    const err = document.getElementById('emailErr');
    if(!emailFormat.test(input.value)) {  
        err.style.visibility = "visible";
        err.style.padding ="15px 0";
    }
}

function vaildEmail() {
    const err = document.getElementById('emailErr');
    if(emailFormat.test(input.value)) {  
        err.style.visibility = "hidden";
        err.style.padding = "0";
    }
}



function imageThere() {
   const err = document.getElementById('imageErr');
   err.style.visibility = 'visible';
   err.style.padding = '20px 0';
}

function imageNotThere() {
    const err = document.getElementById('imageErr');
    err.style.visibility = 'hidden';
    err.style.padding = '0';
}
//display functions ///////////////////////////////////////////////////////


function displayData() {
   const content = document.querySelector('.assigned');
   
   content.innerHTML = `
   <ul class="user-data">
   ${generateListItems(lastEmail)}
   </ul>
   `;
   removeBtn.style.visibility = 'visible';
}

function generateListItems(arg) {
    let items = "";
    for(let i = 0; i < arg.length; i++) {
        items += `
        <li class="user">
        <div class="user-email" style="background-image: url(images/space-g2f7526c66_1280.jpg);">
        <h3 class="email-header">${arg[i]}</h3>
        </div>
        <div class="user-imgs">
        ${generateImageItems(pic[i])}
        </div>
        </li>`;
    }
    return items;
}
function generateImageItems(arg) {
    let items = "";
    for(let i = 0; i < arg.length; i++) {
        items += `<img class="small-img" src="${arg[i]}" alt="random image">`;
    }
    return items;
}


function clearAll() {
   const content = document.querySelector('.assigned');

    lastEmail.length = 0;
    pic.length = 0;
    content.innerHTML = "";
    removeBtn.style.visibility = 'hidden';
    console.log(lastEmail);
    console.log(pic);
}

// events ///////////////////////////////////////////////////////////


newImgBtn.addEventListener('click', fetchImage);

window.addEventListener('load', fetchImage('https://picsum.photos/200'));

removeBtn.addEventListener('click', clearAll);