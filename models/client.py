import requests

# Sample data to pass to the server
data = {'text': 'hurry hurry'}

# Send POST request to the server
response = requests.post('http://127.0.0.1:5000/predict', json=data)

# Print prediction
print(response.json()['prediction'])
