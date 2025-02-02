const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" }
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
    
    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      document.getElementById("newQuoteText").value = ''; // Clear the input
      document.getElementById("newQuoteCategory").value = ''; // Clear the input
      showRandomQuote(); // Optional: Show the newly added quote immediately
    }
  }
  
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  