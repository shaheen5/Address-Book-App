//validate name
const checkName = (name)=> {
    let nameRegex = RegExp('^[A-Z]{1}[\\sa-zA-Z]{2,}$');
    if(!nameRegex.test(name))
         throw 'Invalid Name';    
}

//validate address
const  checkAddress = (address)=> {
    let words = address.split(' ');
    for ( let i = 0 ; i < words.length ; i++){
        let addressRegex = RegExp('[\/ \\w]{3,}$');
        if(!addressRegex.test(words[i]))
            throw 'Invalid Address';   
    }
}

//validate phone number
const CheckPhoneNumber = (phoneNumber)=> {
    let phoneNumberRegex = RegExp('^[\\+]?(91)?[6-9]{1}[0-9]{9}$');
    if(!phoneNumberRegex.test(phoneNumber))
        throw 'Invalid Phone Number'; 
}
