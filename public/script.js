var Links=[];
var linkCount=1;
var linkArrayIndex=0;
document.addEventListener('DOMContentLoaded',function(){
    //toolBox.html
    document.querySelector(".btn1").addEventListener("click", async function(){
        var unfilteredLinks=document.getElementById("ProfileLinks").value.split("\n");
        //
        Links=[];
        var count=0;
        unfilteredLinks.forEach(function(link){
            if(link.includes("www.linkedin.com")) {
                Links.push(link);
                count++;
            }      
        });

        document.querySelector(".lab1111").textContent=`You Have Entered ${count} Link/Links`;
        document.querySelector(".labelDiv1111").classList.remove("labelDiv2222");
        setTimeout(setTimer,2000);
        function setTimer(){
            document.querySelector(".labelDiv1111").classList.add("labelDiv2222");
        }

        //
        await unfilteredFilteredLengthCheck(unfilteredLinks,Links);
        await linkLengthCheck(Links);
        var Links2=Links[linkArrayIndex];

        await openTab(Links,Links2);
        
    });  
    
    document.querySelector(".btn2").addEventListener("click", async function(){
        linkCount++;
        linkArrayIndex++;
        document.getElementById("mesg").textContent=`SELECT DATA FOR LINK ${linkCount}`;
        var name=document.getElementById("name").value;
        var url=document.getElementById("url").value;
        var about=document.getElementById("about").value;
        var bio=document.getElementById("bio").value;
        var location=document.getElementById("location").value;
        var follower_count=document.getElementById("follower_count").value;
        var connection_count=document.getElementById("connection_count").value;

        var Datas = [name,url,about,bio,location,follower_count,connection_count];
        sendProfileData(Datas);

        document.getElementById("name").value='';
        document.getElementById("url").value='';
        document.getElementById("about").value='';
        document.getElementById("bio").value='';
        document.getElementById("location").value='';
        document.getElementById("follower_count").value='';
        document.getElementById("connection_count").value='';

        var Links2 =Links[linkArrayIndex];
        await chrome.runtime.sendMessage({action : 'processLinks', Links : Links2});

        if(linkArrayIndex===Links.length-1){
            document.querySelector(".btn2").textContent="You have traversed all links !!"
            document.querySelector(".btn2").disabled=true;
        }
    });
});
function sendProfileData(datas) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/datas');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Profile links sent successfully:', xhr.responseText);
                // Optionally, display a success message to the user
            } else {
                console.error('Failed to send profile links to server:', xhr.statusText);
                // Optionally, display an error message to the user
            }
        }
    };
    xhr.send(JSON.stringify({ datas: datas }));
}


async function unfilteredFilteredLengthCheck(unfilteredLinks,Links){
    if(unfilteredLinks.length>Links.length){
        var diff=unfilteredLinks.length-Links.length;
        document.querySelector(".lab1").textContent=`Your Entered ${diff} Link/Links is/are not LinkedIn Profile Link \n Please enter only LinkedIn Profile Link...!!`;
        document.querySelector(".labelDiv1").classList.remove("labelDiv2");
        setTimeout(setTimer,2000);
        function setTimer(){
            document.querySelector(".labelDiv1").classList.add("labelDiv2");
        }
    }
}

async function linkLengthCheck(Links){
    if(Links.length<3){
        document.querySelector(".lab11").textContent="Add min 3 LinkedIn Profile Links";
        document.querySelector(".labelDiv11").classList.remove("labelDiv22");
        Links=[];
        setTimeout(setTimer,2000);
        function setTimer(){
            document.querySelector(".labelDiv11").classList.add("labelDiv22");
        }        
    }  
}

async function openTab(Links,Links2){
    if(Links.length>=3){
        document.querySelector(".lab111").textContent="Opening wait a second ......";
        document.querySelector(".labelDiv111").classList.remove("labelDiv222");
        setTimeout(setTimer,2000);
        function setTimer(){
            document.querySelector(".labelDiv111").classList.add("labelDiv222");
            tab(Links,Links2)
        }

    }
}

async function tab(Links,Links2){
    if(Links.length>=3){
        document.querySelector(".taDiv").style.display="none";
        document.querySelector(".btnDiv1").style.display="none";
        document.querySelector(".container").classList.remove("com2");
        document.querySelector(".btnDiv2").classList.remove("com2");
        await chrome.runtime.sendMessage({action : 'processLinks', Links : Links2});
    }
}




