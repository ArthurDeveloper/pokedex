from flask import render_template, request
import requests

class PokemonController:
    def index():
        req = requests.get('http://localhost:3000/pokemons/get?start=0&end=15')
        pokemons = req.json()['results']
        return render_template('pokemons.html', pokemons = pokemons)

    def getRange():
        start, end = request.args.get('start'), request.args.get('end')
        url = f'https://pokeapi.co/api/v2/pokemon?limit={end}&offset={start}'

        pokemons = requests.get(url).json()
        
        return { 
            'results': pokemons['results']
        }
