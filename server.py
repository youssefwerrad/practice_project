"""
Flask server for the Sentiment Analyzer web application.
Exposes endpoints for the HTML interface and sentiment analysis API.
"""

from flask import Flask, render_template, request
from SentimentAnalysis.sentiment_analysis import sentiment_analyzer

app = Flask("Sentiment Analyzer")


@app.route("/sentimentAnalyzer")
def sent_analyzer():
    """
    Handle GET requests for sentiment analysis.

    Retrieves text from the query parameter 'textToAnalyze',
    runs it through the sentiment analyzer, and returns a formatted result.

    Returns:
        str: A human-readable sentiment result or an error message.
    """
    text_to_analyze = request.args.get("textToAnalyze")

    if not text_to_analyze or text_to_analyze.strip() == "":
        return "Please enter some text to analyze."

    response = sentiment_analyzer(text_to_analyze)
    label = response["label"]
    score = response["score"]

    if label is None:
        return "Invalid input! Try again."

    sentiment = label.split("_")[1]
    return f"The given text has been identified as {sentiment} with a score of {score}."


@app.route("/")
def render_index_page():
    """
    Render the main HTML interface page.

    Returns:
        str: Rendered HTML template for the index page.
    """
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
