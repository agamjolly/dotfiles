# 🛠️ Dotfiles

My configurations and cheatsheets for most text-editors and language-specific frameworks I use in my tech stack.

## Flask Environment Setup
`cd` into your your source and then use 
```bash
python3 -m venv venv # makes a venv called "venv"
```
### Activation
Activate your recently developed `venv` using: 
```bash
source venv/bin/activate
```
Make sure that you are in the same directory as your `venv` to run the command.
### Boilerplate Code
Use the following boilerplate code to make your source file:
```python3
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello world"

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000, debug=True)
```
### Flask Development Server
Export the flask app using:
```bash
export FLASK_APP=app.py
```
(Optional) Change the development environment:
```bash
export FLASK_ENV=debug # runs in debug mode and facilitates automatic refreshing for frontend changes
```
Make the code publicly available to everyone in localhost:
```bash
flask run --host=0.0.0.0 --port=8000 # also stops interference with nginx 
```