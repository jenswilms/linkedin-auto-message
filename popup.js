document.addEventListener('DOMContentLoaded', function() {
    // Get the "Extract Data" button and "status" div
    const extractButton = document.getElementById('extractButton');
    const statusDiv = document.getElementById('status');
    const loaderDiv = document.getElementById('loader');
  
    // Connect to the background script
    const port = browser.runtime.connect({name: "extractHTML"});
  
    // Add a click event listener to the button
    extractButton.addEventListener('click', function() {

        //show loading icon
        loaderDiv.style.display = 'block';

      port.postMessage({action: "extractHTML"});
  
      // Listen for messages from the background script
      port.onMessage.addListener(function(message) {
        if (message.action === "showResponse") {
            //hide loading icon
            loaderDiv.style.display = 'none';
          // Update the status div with the API response
          statusDiv.textContent = message.response;
        } else {
          console.error("Invalid response from background script");
        }
      });
    });


        // Get the copy button element
    const copyButton = document.getElementById("copyButton");

    // Add a click event listener to the copy button
    copyButton.addEventListener("click", function() {

    // Get the text content of the status element
    const statusText = document.getElementById("status").textContent;

    // Create a temporary input element
    const tempInput = document.createElement("input");

    // Set the value of the input element to the status text
    tempInput.value = statusText;

    // Append the input element to the document
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the input element from the document
    document.body.removeChild(tempInput);

    // Show a message to indicate that the text has been copied
    alert("Text copied to clipboard!");
    });
  });