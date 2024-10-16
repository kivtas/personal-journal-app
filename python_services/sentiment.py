from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    content = data.get('content', '')

    # Use TextBlob to analyze sentiment
    blob = TextBlob(content)
    sentiment = blob.sentiment.polarity  # Get the sentiment polarity

    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
