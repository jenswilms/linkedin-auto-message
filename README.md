# How it works

A Firefox extension

1. It scrapes a LinkedIn profile and puts in the context to an OpenAI API request
2. You enter your personal details, and can adjust the instructions

# How to use?

1. Create a `settings.json` file (you can copy `settingsExample.json`) and insert your OPENAI_API key
2. Adjust the messages you want to send accordingly. The request to OpenAI is as follows:
```[{system: systemMessage}, {user: "This is the LinkedIn information: " + details}, {user: requestMessage}] ```
3. Zip your files:
   a. Use web-ext to zip your files or run it locally see [Mozilla docs](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-build)
   b. Or, zip your files locally
4. Go to Firefox and enter `about:debugging`. click the This Firefox option, click the Load Temporary Add-on button, then select any file in your extension's directory. [More info](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
5. Go to a LinkedIn profile you want to send a message to
6. Open the extension
7. Click on "Generate message" 
8. Wait and then copy the message
