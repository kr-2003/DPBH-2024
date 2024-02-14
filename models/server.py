import pickle
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier

# Step 3: Save Model to Pickle File
with open('rf_classifier_bog.pkl', 'rb') as f:
    clf,vectorizer = pickle.load(f)

app = Flask(__name__)

# nltk.download('stopwords')
# stop_words = set(stopwords.words('english'))

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    
    # text.str.lower()
    # text.str.replace('http\S+|www.\S+', '', case=False)
    # text.str.replace('\n',' ', regex=True)
    # text.str.replace('[^\w\s]',' ')
    # text.str.replace('\d','', regex=True)
    # text.str.replace('[^\w\s#@/:%.,_-]', ' ', flags=re.UNICODE)

    X_input = vectorizer.transform([text])
    prediction = clf.predict(X_input)
    result = str(prediction[0])
    return {'prediction': result}

if __name__ == '__main__':
    app.run(debug=True)