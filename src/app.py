from flask import Flask, render_template, redirect
import requests
from .routes import *

app = Flask(__name__)

app.register_blueprint(pokemon_bp, url_prefix='/pokemons')

@app.route('/')
def index():
    return redirect('/pokemons')

if __name__ == '__main__':
    app.run()
