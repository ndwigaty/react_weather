from flask import Flask, request, jsonify
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)  #Enable CORS from all routes

API_KEY = '82aad061d4a550cf45a8a0a24b246a07'

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is missing'}), 400

    try:
        response = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric')
        data = response.json()
        if response.status_code == 200:
            weather = {
                'city': data['name'],
                'temperature': data['main']['temp'],
                'description': data['weather'][0]['description']
            }
            return jsonify(weather)
        else:
            return jsonify({'error': 'City not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
