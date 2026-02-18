/**
 * mywebscript.js
 * Handles the sentiment analysis button click, sends a GET request
 * to the Flask /sentimentAnalyzer route, and updates the UI with the result.
 */

function analyzeText() {
    const textToAnalyze = document.getElementById("textInput").value.trim();
    const resultBox   = document.getElementById("resultBox");
    const resultText  = document.getElementById("resultText");
    const btn         = document.getElementById("analyzeBtn");

    // Clear previous sentiment classes
    resultBox.className = "result-box";

    if (!textToAnalyze) {
        resultBox.classList.add("error");
        resultText.textContent = "⚠ Please enter some text before running the analysis.";
        return;
    }

    // Show loading state
    btn.disabled = true;
    resultText.innerHTML = '<span class="spinner"></span> Analyzing…';

    fetch(`/sentimentAnalyzer?textToAnalyze=${encodeURIComponent(textToAnalyze)}`)
        .then(response => response.text())
        .then(data => {
            btn.disabled = false;

            const upper = data.toUpperCase();
            if (upper.includes("POSITIVE")) {
                resultBox.classList.add("positive");
                resultText.textContent = "✅ " + data;
            } else if (upper.includes("NEGATIVE")) {
                resultBox.classList.add("negative");
                resultText.textContent = "❌ " + data;
            } else if (upper.includes("NEUTRAL")) {
                resultBox.classList.add("neutral");
                resultText.textContent = "➖ " + data;
            } else {
                resultBox.classList.add("error");
                resultText.textContent = "⚠ " + data;
            }
        })
        .catch(error => {
            btn.disabled = false;
            resultBox.classList.add("error");
            resultText.textContent = "⚠ Network error. Please try again. (" + error + ")";
        });
}

// Allow pressing Enter (Ctrl+Enter) to trigger analysis
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("textInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.ctrlKey) {
            analyzeText();
        }
    });
});
