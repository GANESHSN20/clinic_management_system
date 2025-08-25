{
    firstName:'Umme',   required
    lastName:'Kulsum'   
    phone:8798989098,   required   
    dateOfBirth:'2001-01-02', required
    sex:"Female",enum ['MALE', 'FEMALE']  required
    address:'MG road', 
    blood-group:'A+',['A+', 'AB+', 'O+', 'o-', 'AB-', 'B+','B-', 'A-'] required
    userName:'CMS2001F01UMME02'( clinic ShortName+ year of birth+Sex+last four
    Digit of mobile + firstNameIn caps + Days of birth ), required
    password:'asdf123', required
    email:'' 
    status:'Open, closed, OnGoing'  ENUM ['OPEN', 'ONGOING', 'CLOSED']
    isActive:true/false,    boolean default =  false 
    createdAt:'', today date with default today date
    role:'Doctor, patient, receipt, admin' enum ['DOCTOR', 'PATIENT', 'Receptionist', 'ADMIN'] // admin will eb provided ons the of server 
    OTP:''-- whatsapp ''
    }
    