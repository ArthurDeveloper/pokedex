from flask import Blueprint
from controllers.PokemonController import PokemonController

pokemon_bp = Blueprint('pokemon_bp', __name__)

pokemon_bp.route('/', methods=['GET'])(PokemonController.index)
pokemon_bp.route('/get', methods=['GET'])(PokemonController.getRange)
pokemon_bp.route('/count', methods=['GET'])(PokemonController.count)
