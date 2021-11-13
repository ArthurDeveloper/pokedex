from src import app
import os

if __name__ == '__main__':
    port = int(os.getenv('PORT', '3000'))
    app.run(port = port)
