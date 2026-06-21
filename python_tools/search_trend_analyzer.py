import sqlite3
import pandas as pd
import os
from sklearn.feature_extraction.text import CountVectorizer

def analyze_trends():
    # Connect to the SQLite database
    # The database is located two directories up from this script (in the project root)
    db_path = os.path.join(os.path.dirname(__file__), '..', 'database.sqlite')
    
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        return

    print("Connecting to the database...")
    conn = sqlite3.connect(db_path)
    
    # Extract search history using pandas
    try:
        df = pd.read_sql_query("SELECT * FROM searches", conn)
    except Exception as e:
        print("Failed to read from the database. Is the 'searches' table initialized?")
        return
    finally:
        conn.close()

    if df.empty:
        print("No search data available to analyze.")
        return

    print(f"\nSuccessfully extracted {len(df)} search records.")
    
    # Basic Data Processing
    # Convert timestamps to datetime objects
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    # 1. Frequency Analysis
    top_cities = df['location'].value_counts()
    print("\n--- Top 3 Most Searched Locations ---")
    print(top_cities.head(3))
    
    # 2. Simple ML application (Token Analysis with Scikit-Learn)
    # Using CountVectorizer to find the most common words or patterns in searches
    # This acts as a naive "trend predictor" by weighting recurring search strings
    print("\n--- ML Trend Prediction Model ---")
    vectorizer = CountVectorizer(stop_words='english', lowercase=True)
    
    try:
        X = vectorizer.fit_transform(df['location'])
        word_frequencies = dict(zip(vectorizer.get_feature_names_out(), X.toarray().sum(axis=0)))
        
        # Sort words by frequency
        sorted_trends = sorted(word_frequencies.items(), key=lambda item: item[1], reverse=True)
        
        print("Predicted upcoming trending search terms (based on historical vectorization):")
        for word, count in sorted_trends[:3]:
            print(f"- '{word.capitalize()}' (Score: {count})")
            
    except ValueError:
        print("Not enough diverse data to run the ML vectorizer.")

if __name__ == "__main__":
    print("==========================================")
    print("Weather App - AI/ML Search Trend Analyzer")
    print("==========================================")
    analyze_trends()
