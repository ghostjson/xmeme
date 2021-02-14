from flask import Flask,redirect
app = Flask(__name__)

@app.errorhandler(404)
def page_redirect(e):
    return redirect("http://localhost:8081/swagger-ui.html", code=302)


app.run(port=8080)
