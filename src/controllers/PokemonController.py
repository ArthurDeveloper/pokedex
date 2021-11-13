from flask import render_template, request
import requests

class PokemonController:
    def index():
        return render_template('pokemons.html')

    def getRange():
        start, end = request.args.get('start'), request.args.get('end')
        url = f'https://pokeapi.co/api/v2/pokemon?limit={end}&offset={start}'

        pokemons = requests.get(url).json()
        
        return pokemons

    def count():
        data = requests.get('https://pokeapi.co/api/v2/pokemon?limit=1').json()
        return {
            'count': data['count']
        }
