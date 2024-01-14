import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from nltk.tokenize import word_tokenize
from better_profanity import profanity
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

df = pd.read_csv('tokens.csv')

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

#size = df['sentiment'].size()
#avg_sent = df['sentiment'].sum()/size

d = {}

# Print each cluster
for i in set(cluster_labels.tolist()):
    rows = df[df['label'] == i]
    overall_sentiment = sum(rows['sentiment']) / len(rows)
    nrows = len(rows)
    reps = pd.DataFrame(rows.sample(10))
    reps = reps['tokens'].apply(profanity.censor)
    d[i] = reps
    d.insert(3, "Sentiment", overall_sentiment, True)
print(d)
json = d.to_json()