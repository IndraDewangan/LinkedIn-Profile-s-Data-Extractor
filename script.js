document.querySelector(".btn").addEventListener("click",()=>{
    
    document.querySelector(".title1").classList.remove("title2");

    chrome.tabs.query({active:true, currentWindow: true},(tabs)=>{
        var title=tabs[0].title;
        if(title.length>30){
            document.querySelector(".title1").style.fontSize="small";
        }
        document.querySelector(".title1").innerHTML=tabs[0].title;
        document.querySelector(".btn").disabled=true;
        document.querySelector(".btn").classList.remove("btn");

    });
});
