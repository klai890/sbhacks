import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from nltk.tokenize import word_tokenize
from better_profanity import profanity
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

SUBREDDIT_NAME = "Berkeley"
df = pd.read_csv('./data/{}_tokens.csv'.format(SUBREDDIT_NAME))

# Set of words
tokenized_words = list(df['tokens'])

vectorizer = TfidfVectorizer()
word_vectors = vectorizer.fit_transform(tokenized_words)

# K-means clustering
num_clusters = 20
kmeans = KMeans(n_clusters=num_clusters, random_state=16)
clusters = kmeans.fit(word_vectors)

# Get cluster labels
cluster_labels = kmeans.labels_
df['label'] = cluster_labels
#print(df.head())

# create get_sentiment function
analyzer = SentimentIntensityAnalyzer()
def get_sentiment(text):
    scores = analyzer.polarity_scores(text)
    sentiment = 1 if scores['pos'] > 0 else 0
    return sentiment

# apply get_sentiment function
df['sentiment'] = df['tokens'].apply(get_sentiment)
print(df)
print("seperate")
print(df['sentiment']) 


# Export clusters to JSON
d = {
    SUBREDDIT_NAME: []
}

for i in set(cluster_labels.tolist()):
    c = {
        "samples": [],
        "sentiment": 0
    }

    rows = df[df['label'] == i]
    overall_sentiment = sum(rows['sentiment']) / len(rows)
    c["sentiment"] = overall_sentiment

    reps = pd.DataFrame(rows.sample(3))
    reps = reps['tokens'].apply(profanity.censor)
    c["samples"] = list(reps)

    d[SUBREDDIT_NAME].append(c)

import json
with open('./data/{}_data.json'.format(SUBREDDIT_NAME), 'w') as f:
    json.dump(d, f)
