const { randomInt } = require("crypto");

const UserName = {
    generateUsername: (payload) => {
        if(!payload.firstName || !payload.dateOfBirth || !payload.sex){
            return ({message:"Missing required fields for username genenration"})
        }
        const fname = payload.firstName.trim().toUpperCase();
        const dob = new Date(payload.dateOfBirth);
        const year = dob.getFullYear();
        const month = String(dob.getMonth() + 1).padStart(2, "0");
        const day = String(dob.getDate()).padStart(2, "0");
        const sexLetter = payload.sex[0];
        
        return `CMS${year}${sexLetter}${month}${fname}${day}`;
    },
    
    generatePassword: (length = 12) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let password = [];
        for(let i=0;i<length;i++){
            const index = randomInt(0, chars.length);
            password.push(chars.charAt(index));
        }
        return password.join("");
    }
}

module.exports = UserName;