window.addEventListener('DOMContentLoaded', () => {
    createInnerHTML();
});

//Template literal ES6 feature 
const createInnerHTML = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th>"+
                       "<th>ZipCode</th><th>Phone Number</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let addressbookList = createAddressBookJSON();

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
                <img name="${addressbookData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img name="${addressbookData._id}" alt="Edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
            </td>        
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

//create Employee Payroll JSON objects
const createAddressBookJSON = () => {
    let addressbookList = [
        {
            _name : 'Shaheen Miya',
            _address : 'SrNo 12/1B/1 Gokul Nagar Dhanori',
            _city : 'Pune',
            _state : 'Maharashtra',
            _zipCode : '411011',
            _phoneNumber : '+919922123990',
            _id : new Date().getTime()
        },
        {
            _name : 'Arvind Kejriwal',
            _address : 'South Street Corner',
            _city : 'Bhopal',
            _state : 'Madhya Pradesh',
            _zipCode : '411011',
            _phoneNumber : '+919922123990',
            _id : new Date().getTime()+1
        }
    ];
    return addressbookList;
} 