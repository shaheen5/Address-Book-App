let isUpdate = false;
let addressbookObj = {};
//add event listener when document gets loaded
window.addEventListener('DOMContentLoaded',()=>{
    var addressbook = new AddressBook;
    //add listener to verify name entered by user
    const name = document.querySelector('#name');
    name.addEventListener('input',function(){        //add listener at name input
        if(name.value.length == 0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            addressbook.name = name.value;
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
        }
    });

    //add listener to verify address entered by user
    const addr = document.querySelector('#address');
    addr.addEventListener('input',function(){        //add listener at address input
        if(addr.value.length == 0){
            setTextValue('.addr-error',"");
            return;
        }
        try{
            addressbook.address = addr.value;
            setTextValue('.addr-error',"");
        }catch(e){
            setTextValue('.addr-error',e);
        }
    });
    //add listener to verify phone number entered by user
    const phoneNumber = document.querySelector('#phone');
    phoneNumber.addEventListener('input',function(){        //add listener at phone no input
        if(phoneNumber.value.length == 0){
            setTextValue('.contact-error',"");
            return;
        }
        try{
            addressbook.phoneNumber= phoneNumber.value;
            setTextValue('.contact-error',"");
        }catch(e){
            setTextValue('.contact-error',e);
        }
    });
    checkForUpdate();
});

//populate & save addressbook object when submit buton is clicked
const save = (event)=> {
    event.preventDefault();
    event.stopPropagation();
    try{
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}
//populate addressbook object from UI
const setAddressBookObject = ()=>{
    addressbookObj._name = getInputValueById('#name');
    addressbookObj._address = getInputValueById('#address');
    addressbookObj._city = getInputValueById('#city');
    addressbookObj._state = getInputValueById('#state');
    addressbookObj._zipCode = getInputValueById('#zipcode');
    addressbookObj._phoneNumber = getInputValueById('#phone');    
}

//function to populate employee object with html form data
const createAddressBook = ()=> {
    let addressbook = new AddressBook();
    try {
        addressbook.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    try {
        addressbook.address = getInputValueById('#address');
    }catch(e){
        setTextValue('.addr-error',e);
        throw e;
    }
    addressbook.city = getInputValueById('#city');
    addressbook.state = getInputValueById('#state');
    addressbook.zipCode = getInputValueById('#zipcode');
    try {
        addressbook.phoneNumber = getInputValueById('#phone');
    }catch(e){
        setTextValue('.contact-error',e);
        throw e;
    }
    addressbook.id = new Date().getTime();
    alert(addressbook.toString());
    return addressbook;
}

//function to get form values by Id
const getInputValueById = (id=>{
    let value = document.querySelector(id).value;
    return value;
});
//function to set text value
const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//create and update local storage with addressbook object
const createAndUpdateStorage=()=>{
    let addressbookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressbookList){
        let addressbookData = addressbookList
                              .find(personData => personData._id == addressbookObj._id);
        if(!addressbookData){
               addressbookList.push(createAddressBook());
        }else{
            const index = addressbookList
                         .map(personData=>personData._id)
                         .indexOf(addressbookData._id);
            addressbookList.splice(index,1,createAddressBookData(addressbookData._id));
        }
    }
    else{
        addressbookList = [createAddressBook()];
    }
    alert(addressbookList.toString());
    localStorage.setItem("AddressBookList",JSON.stringify(addressbookList));
}
//create person data using id
const createAddressBookData = (id) => {
    let addressbookData = new AddressBook();
    if (!id)  addressbookData._id = createNewPersonId();
    else addressbookData.id = id;
    setAddressBookData(addressbookData);
    return addressbookData;
}

//set person data using updated object details
const setAddressBookData = (addressbook) => {
    try {
        addressbook.name = addressbookObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    try {
        addressbook.address = addressbookObj._address;
    }catch(e){
        setTextValue('.addr-error',e);
        throw e;
    }
    addressbook.city = addressbookObj._city;
    addressbook.state = addressbookObj._state;
    addressbook.zipCode = addressbookObj._zipCode;
    try {
        addressbook.phoneNumber = addressbookObj._phoneNumber;
    }catch(e){
        setTextValue('.contact-error',e);
        throw e;
    }
    alert(addressbook.toString());   
}

//create new person id 
const createNewPersonId = ()=> {
    let personID = localStorage.getTime('PersonId');
    personID = !personID ? 1 : (parseInt(personID)+1).toString();
    localStorage.setItem('PersonId',personID);
    return personID;
}

//reset function to reset all elements in html form
const resetForm=()=>{
    setValue('#name',' ');
    setValue('#address',' ');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#zipcode','Select ZipCode');
    setValue('#phone',' '); 
}
//set id with given value
const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value = value;
}

//check for update
const checkForUpdate = () => {
    const addressbookJson = localStorage.getItem('editPerson');
    isUpdate = addressbookJson ? true : false ;
    if (!isUpdate) return;
    addressbookObj = JSON.parse(addressbookJson);
    setForm();
}

//set updated values
const setForm = () => {
    setValue('#name',addressbookObj._name);
    setValue('#address',addressbookObj._address);
    setValue('#city',addressbookObj._city);
    setValue('#state',addressbookObj._state);
    setValue('#zipcode',addressbookObj._zipCode);
    setValue('#phone',addressbookObj._phoneNumber);
}