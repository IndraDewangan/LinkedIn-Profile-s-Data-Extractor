chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.action === 'processLinks'){
        var Links = message.Links;
        openLinks(Links); 
        // Links.forEach(function(link){
        //     openLinks(link);       
        // });
    }
});

function openLinks(link){
    chrome.tabs.create({url : link});  
}

