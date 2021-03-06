//declare global variable for employee payroll list
let addressbookList;

window.addEventListener('DOMContentLoaded', () => {
    if(site_properties.use_local_storage.match("true")){
        getPersonDataFromLocalStorage();
    }else getPersonDataFromServer();
});

//get list of Person data from local storage
const getPersonDataFromLocalStorage = () => {
    addressbookList = localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [] ;
    processPersonDataResponse();
}

const processPersonDataResponse = () => {
    document.querySelector(".person-count").textContent = addressbookList.length;
    createInnerHTML();
    localStorage.removeItem('editPerson');
}

//get employee data from json server
const getPersonDataFromServer = () => {
    makeServiceCall("GET",site_properties.server_url,true)
        .then(responseText => {
            addressbookList = JSON.parse(responseText);
            processPersonDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status : "+JSON.stringify(error));
            addressbookList=[];
            processPersonDataResponse();
        });
}
//Template literal ES6 feature 
const createInnerHTML = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th>"+
                       "<th>ZipCode</th><th>Phone Number</th><th>Actions</th>";
    if( addressbookList.length == 0 ) return;
    let innerHtml = `${headerHtml}`;

    for  ( const addressbookData of addressbookList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${addressbookData._name}</td>
            <td>${addressbookData._address}</td>
            <td>${addressbookData._city}</td>
            <td>${addressbookData._state}</td>
            <td>${addressbookData._zipCode}</td>
            <td>${addressbookData._phoneNumber}</td>
            <td>
                <img id="${addressbookData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${addressbookData.id}" alt="Edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
            </td>        
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

// remove person details from addressbook list
const remove = (node)=> {
    let addressbookData = addressbookList.find(personData=>personData.id == node.id);
    if (!addressbookData) return;
    const index =  addressbookList
                  .map(personData=>personData.id)
                  .indexOf(addressbookData.id);
    addressbookList.splice(index,1);
    if(site_properties.use_local_storage.match("true")){
        localStorage.setItem("AddressBookList",JSON.stringify(addressbookList));
        createInnerHTML();
    }else {
        const deleteURL = site_properties.server_url + addressbookData.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
            .then(responseText => {
                createInnerHTML();
            })
            .catch(error => {
                console.log("DELETE Error Status: "+JSON.stringify(error));
            });
    }
}

//update person details 
const update = (node) => {
    let addressbookData = addressbookList.find(personData=>personData.id == node.id);
    if (!addressbookData) return;
    localStorage.setItem('editPerson',JSON.stringify(addressbookData));
    window.location.replace(site_properties.add_person_page);    
}