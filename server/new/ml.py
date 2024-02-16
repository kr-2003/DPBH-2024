import pickle
import numpy as np
from collections import Counter
import re
import nltk
from nltk.corpus import stopwords
from mysite.settings import BASE_DIR
import os


class RF:
    nltk_data_directory = os.path.join(BASE_DIR, "nltk_data")
    nltk.download("wordnet", download_dir=nltk_data_directory)
    nltk.download("stopwords", download_dir=nltk_data_directory)
    nltk.data.path.append(nltk_data_directory)

    threshold = np.array([0.75, 0.75, 0.75, 0.75, 0.75])

    def __init__(self):
        # nltk.download("wordnet")
        with open("../models/rf_classifier_bog.pkl", "rb") as f:
            clf, vectorizer = pickle.load(f)
        self.clf = clf
        self.vectorizer = vectorizer
        self.lemmatizer = nltk.stem.WordNetLemmatizer()

    def preprocess(self, text):
        text = re.sub(r"http\S+|www.\S+", "", text)
        text = text.replace("\n", " ")
        text = re.sub(r"[^\w\s]", "", text)
        text = re.sub(r"\d", "", text)
        text = re.sub(r"[^\w\s#@/:%.,_-]", " ", text)
        stop_words = set(stopwords.words("english"))
        words = text.split()
        text = " ".join([word for word in words if word not in stop_words])
        text = self.lemmatizer.lemmatize(text)
        return text

    def predict(self, textList):
        textList = [self.preprocess(text) for text in textList]
        X_input = self.vectorizer.transform(textList)
        prediction = self.clf.predict(X_input)
        return prediction.tolist()

    def result(self, textList):
        res=Counter(self.predict(textList))
        if 5 in res:
            del res[5]
        return res
    def score(self, text):
        pass