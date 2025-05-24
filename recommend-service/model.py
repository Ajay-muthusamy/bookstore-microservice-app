import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_recommendations(title, df: pd.DataFrame):
  
    if 'bookTitle' not in df.columns or 'description' not in df.columns:
        return {"error": "Required columns not found in data"}

    df["text"] = df["bookTitle"].fillna('') + " " + df["description"].fillna('')

    
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df["text"])

  
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


    try:
        idx = df[df["bookTitle"].str.lower() == title.lower()].index[0]
    except IndexError:
        return {"error": f"Book titled '{title}' not found."}

  
    sim_scores = list(enumerate(cosine_sim[idx]))

    
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = [s for s in sim_scores if s[0] != idx]
    top_indices = [i[0] for i in sim_scores[:5]]

  
    recommendations = df.iloc[top_indices][["bookTitle", "description","image","fixedPrice","actualPrice","rating","isSale","isTrending"]].to_dict(orient="records")

    return recommendations
