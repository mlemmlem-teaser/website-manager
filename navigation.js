
const firstlink = "/src/screens/client/";
const navAbout = document.querySelector(".nav_about");
const navContact = document.querySelector(".nav_contact");
const navHelp = document.querySelector(".nav_help");
const getStarted = document.querySelector(".getStarted");
const logout = document.querySelector(".logout");
const login = document.querySelector(".login")
//navigation client
navAbout.addEventListener("click",()=>{
    window.location.href=`${firstlink}aboutUs/about.html`;
})
navContact.addEventListener("click", ()=>{
    window.location.href=`${firstlink}contactUs/contact.html`;
})
getStarted.addEventListener("click", ()=>{
    window.location.href=`${firstlink}Homepage/homepage.html`;
})
logout.addEventListener("click", ()=>{
    window.location.href=`${firstlink}Auth/Login/login.html`;
})



//navigation admin
const firstlinkAdmin = "/src/screens/admin/";
export {firstlink};
