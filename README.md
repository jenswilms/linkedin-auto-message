# How it works

1. It scrapes a LinkedIn profile and puts in the context to an OpenAI API request
2. You enter your personal details, and can adjust the instructions

# How to use?

### INSTALLING
1. Create a settings.json file and insert your OPENAI_API key
2. Adjust the messages you want to send accordingly. The request to OpenAI is as follows:
```[{system: systemMessage}, {user: "This is the LinkedIn information: " + details}, {user: requestMessage}] ```
3. Use npm install 

Once you're 

### Using