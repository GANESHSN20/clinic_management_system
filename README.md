# cms_mgmt_system

Clinic Management System

## Database Name

cms-db

## collection Names

users

## User Model

{
firstName:'Umme', required
lastName:'Kulsum'  
 phone:{
countryCode:'', // enum, Nepal , India
phNumber:''
}
8798989098, required  
 dateOfBirth:'2001-01-02', required
gender:"Female",enum ['MALE', 'FEMALE'] required
address:'MG road',
blood-group:'A+',['A+', 'AB+', 'O+', 'o-', 'AB-', 'B+','B-', 'A-'] required
userName:'CMS2001F01UMME02'( clinic ShortName+ year of birth+Sex+last four
Digit of mobile + firstNameIn caps + Days of birth ), required
password:'asdf123', required
email:''
status:'Open, closed, OnGoing' ENUM ['OPEN', 'ONGOING', 'CLOSED']
isActive:true/false, boolean default = false
createdAt:'', today date with default today date
role:'Doctor, patient, receipt, admin' enum ['DOCTOR', 'PATIENT', 'Receptionist', 'ADMIN'] // admin will eb provided ons the of server
OTP:''-- whatsapp ''
}

https://github.com/sandeepkj90/cms_mgmt_system.git

Slot Schema

slot Schema

Role receiptionist
{
date:
startTime:{
time:11
periodIndicator:'am'
}
endTime: {
time:2
periodIndicator:'pm'
}
duration: 30
slots:[{slot:"11 am",status:false},{slot:"11:30 am",status:false}]
createdAt:

}
{
date:
startTime: 11:00am
endTime: 2:pm
duration: 30
slots:[{slot:"11 am",status:false},{slot:"11:30 am",status:false}]

}
1.creating slot

service function to get the slot array based on start time , end time and duration

2. getting slotlist for token role patient is based on today date condition is greater than equal to today date list
   for token role receipnist all data with descending order of date

appointment Schedule
