chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.action === 'processLinks'){
        var Links = message.Links;
        openLinks(Links);
    }
});

function openLinks(link){
    chrome.tabs.create({url : link});  
}

