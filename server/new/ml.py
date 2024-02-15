import pickle
import numpy as np
from collections import Counter

class RF:
    threshold = np.array([0.75, 0.75, 0.75, 0.75, 0.75])

    def __init__(self):
        with open("../models/rf_classifier_bog.pkl", "rb") as f:
            clf, vectorizer = pickle.load(f)
        self.clf = clf
        self.vectorizer = vectorizer

    def predict(self, text):
        X_input = self.vectorizer.transform(text)
        prediction = self.clf.predict(X_input)
        return prediction.tolist()

    def result(self, text):
        return Counter(self.predict(text))

    def score(self, text):
        pass
        # to do