
const firstlink = "/src/screens/client/";
const navAbout = document.querySelector(".nav_about");
const navContact = document.querySelector(".nav_contact");
const navHelp = document.querySelector(".nav_help");
const getStarted = document.querySelector(".getStarted");
const logout = document.querySelector(".logout");
const login = document.querySelector(".login")
//navigation client
navAbout.addEventListener("click",()=>{
    try {
        window.location.href=`${firstlink}aboutUs/about.html`;
    } catch (error) {
        
    }

})
navContact.addEventListener("click", ()=>{
    try {
        window.location.href=`${firstlink}contactUs/contact.html`;
    } catch (error) {
        
    }

})
getStarted.addEventListener("click", ()=>{
    try {
        window.location.href=`${firstlink}Homepage/homepage.html`;
    } catch (error) {
        
    }

})
logout.addEventListener("click", ()=>{
    try {
        window.location.href=`${firstlink}Auth/Login/login.html`;
    } catch (error) {
        
    }

})



//navigation admin
const firstlinkAdmin = "/src/screens/admin/";
export {firstlink};
