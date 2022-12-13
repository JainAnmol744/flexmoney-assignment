Website for collecting data against a yoga form

Here I've used database as MongoDB
dataabse name:yogaForm
Collection name:flexmoney

There are two folders :

Client side:frontend

Server side:Backend

In the form :
1.The App.js is the homescreen from which we can navigate to Home.js(the form) and the payment successful screen(Response.js)

2.I've collected the data:

a)Name (should not be empty)

b)Age (should be between 18 and 65 inclusive)

c)Email ID (should be valid which is checked against a regex pattern

d)Phone number (should be a 10 digit phone number)

e)The batch in which the person wishes to register (6-7 AM, 7-8 AM, 8-9 AM and 5-6 PM which is a required data and shouldn't be empty)

So I've collected the above data and checked the valaidity of the details entered
 Once the validity is performed on clicking the Submit button, the entered data is inserted(if the email is not already present) or updated(if the email is already 
 present) by using the updateOne() method and sending the upsert as true.

This collected data is updated in the database (along with the payment month)
The fields in the collection:
1) _ id: given by the database itself
2) name: name of the person
3) age: age of the person
4) email: email of the person
5) number: phone number of the person
6) select: which batch he/she chooses
7) payment_for: which month is the payment intended for

So email is used as query to check if the databse contains this email or not , if it is present we simply update the details otherwise add a new record
After this the website is directed to the responsescreen which indicates that the payment is successful(which is not implemented(the payment gateway) as it wasn't asked for)

Attaching the screenshots for reference in the screenshot folder.
Attaching ER diagram also in the screenshot folder.
