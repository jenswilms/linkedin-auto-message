
let settings;
fetch('./settings.json')
.then(response => response.json())
.then(data => {
    settings = data;
});

// Make an API call to OpenAI
function makeApiCall(html, additionalInfo) {

    if (additionalInfo) {
        settings.requestMessage += "\n\n" + 
        "Include the following: " + additionalInfo;
    }

    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + settings.OPENAI_API_KEY
        },
        body: JSON.stringify({
        model: settings.OPENAI_MODEL ? settings.OPENAI_MODEL : 'gpt-4',
        messages: [
            { role: 'system', content: settings.systemMessage },
            { role: 'user', content: 'This is the content of the LinkedIn profile that I need to send a message to :' + html },
            { role: 'user', content: settings.requestMessage}
        ]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data.choices[0].message.content;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Listen for connections from the content script
browser.runtime.onConnect.addListener(function(port) {

  if (port.name === "extractHTML") {
    // Listen for messages from the content script
    port.onMessage.addListener(function(message) {

      if (message.action === "extractHTML") {

        // Get the active tab

        browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {

            browser.tabs.executeScript(tabs[0].id, {code: "document.querySelector('main').innerHTML"}).then(function(result) {

                // console.log("test");
                // console.log("test");
                
                const myDivText = document.createElement('div');

                myDivText.innerHTML = result[0];
                
                const topCard = myDivText.querySelector('.pv-top-card').textContent;
                // console.log(topCard);
                const highlights = (myDivText.querySelector('#highlights')) ? myDivText.querySelector('#highlights').parentElement.textContent : "";
                const experience = myDivText.querySelector('#experience').parentElement.textContent;
                const education = (myDivText.querySelector('#education')) ? myDivText.querySelector('#education').parentElement.textContent : "";
                const about = (myDivText.querySelector('#about')) ? myDivText.querySelector('#about').parentElement.textContent : "";
                const languages = (myDivText.querySelector('#langauges')) ? myDivText.querySelector('#languages').parentElement.textContent : "";
                const volunteering = (myDivText.querySelector('#volunteering_experience')) ? myDivText.querySelector('#volunteering_experience').parentElement.textContent : "";
                const projects = (myDivText.querySelector('#projects')) ? myDivText.querySelector('#projects').parentElement.textContent : "";

                const fulltext = `Personal details:
                ${topCard}

                About:
                ${about}
                
                Highlights:
                ${highlights}
                
                Experience:
                ${experience}
                
                Education:
                ${education}
                
                ${languages.length > 0 && "Languages: \n" + languages}
                
                ${volunteering.length > 0 && "Volunteering experience: \n" + volunteering}
                
                ${projects.length > 0 && "Projects: \n" + projects}}`;
                


                makeApiCall(fulltext, message.additionalInfo).then(function(response) {
                    port.postMessage({action: "showResponse", response: response});
                    console.log(response);
                });

            });
        });
      }
    });
  }
});

