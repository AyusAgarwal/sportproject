// const parser = require('tld-extract')
// const email = "john@sub.domain.com"
// const address = email.split('@').pop()
// const domain = parser(address).domain
// console.log(email+" "+address+" "+domain);

var my_email="useridhere@sitename.com"

var ind=my_email.indexOf("@");

var my_slice=my_email.slice(ind+1);
console.log(my_slice)