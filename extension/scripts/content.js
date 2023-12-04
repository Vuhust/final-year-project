console.log(12121212);
// var salt = CryptoJS.lib.WordArray.random(128 / 8);
// console.log(salt.toString(CryptoJS.enc.Base64));
// console.log(salt.toString())
//
// var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
//     keySize: 128/8
// });
//
// console.log(key128Bits.toString());
// console.log(key128Bits.length)
// console.log(key128Bits)


// Code goes here
var keySize = 256;
var ivSize = 128;
var iterations = 100;

var message = "alobansdjs"
var password = "Secret Password";


function encrypt (msg, pass) {
    var salt = CryptoJS.lib.WordArray.random(128/8);
    console.log("salt",salt)

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
    });
    console.log(key)


    var iv = CryptoJS.lib.WordArray.random(ivSize/8);
    console.log("iv", iv);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CTR,
        // hasher: CryptoJS.algo.SHA256
    });

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
    return transitmessage;
}

function decrypt (transitmessage, pass) {
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
    var encrypted = transitmessage.substring(64);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize /32   ,
        iterations: iterations
    });
    console.log(key)
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CTR,
        // hasher: CryptoJS.algo.SHA256
    })
    return decrypted;
}

var encrypted = encrypt(message, password);
var decrypted = decrypt(encrypted, password);

console.log("Encrypted: "+ encrypted)
console.log("Decrypted: "+ decrypted.toString(CryptoJS.enc.Utf8))