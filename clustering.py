import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from nltk.tokenize import word_tokenize

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
print(df.head())

# Print each cluster
for i in set(cluster_labels.tolist()):
    print(df[df['label'] == i])