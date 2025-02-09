// Array to store quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" },
];

// Function to save quotes to localStorage
/*function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}*/

let selectedCategory = localStorage.getItem('selectedCategory') || 'all';



// Function to simulate fetching data from the server
async function fetchQuotesFromServer() {
  try {
      const response = await fetch(serverUrl);
      const serverQuotes = await response.json();
      
      // Simulate server quotes as simple text (this would typically be more structured)
      const formattedServerQuotes = serverQuotes.slice(0, 5).map(post => ({
          text: post.title, // Use the title as the quote
          category: "Server" // Dummy category for the server's data
      }));

      handleSync(formattedServerQuotes);
  } catch (error) {
      console.error('Error fetching from server:', error);
      document.getElementById("syncStatus").innerText = "Failed to sync with the server.";
  }
}


function handleSync(serverQuotes) {
  const localQuoteIds = new Set(quotes.map(quote => quote.text));

  let conflictFound = false;
  serverQuotes.forEach(serverQuote => {
      if (!localQuoteIds.has(serverQuote.text)) {
          quotes.push(serverQuote); // Add new quotes from the server
          conflictFound = true;
      }
  });
  saveQuotes();


  if (conflictFound) {
    document.getElementById("syncStatus").innerText = "Sync completed with new updates from the server.";
  } else {
    document.getElementById("syncStatus").innerText = "No new updates from the server.";
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
  populateCategories();
  filterQuotes();
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  // Validate the inputs
  if (!newQuoteText || newQuoteCategory ) {

    alert ("Please provide both a quote and a category.");
    return;
    
  }

  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);  // Add the new quote to the array
  saveQuotes(); 
  postQuoteToServer(newQuote);// Save the updated quotes to localStorage
  populateCategories();  // Update the categories dropdown
  filterQuotes();  // Reapply the filter based on the last selected category
}

// Function to send the new quote to the server
async function postQuoteToServer(newQuote) {
  try {
      const response = await fetch(serverUrl, {
          method: 'POST', // Method to send data
          headers: {
              'Content-Type': 'application/json' // Ensure the data is sent in JSON format
          },
          body: JSON.stringify({
              title: newQuote.text,  // Use 'title' to simulate a post title
              body: newQuote.category, // Use 'body' for the category
              userId: 1  // JSONPlaceholder mock API expects a userId (this can be replaced with any other field)
          })
      });

      if (response.ok) {
          const result = await response.json();
          console.log("Quote posted to server:", result);
          document.getElementById("syncStatus").innerText = "Quote successfully posted to the server!";
      } else {
          console.error("Failed to post the quote:", response.status);
          document.getElementById("syncStatus").innerText = "Failed to post quote to the server.";
      }
  } catch (error) {
      console.error("Error posting quote:", error);
      document.getElementById("syncStatus").innerText = "Error posting quote to the server.";
  }
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>- ${randomQuote.category}</strong></p>`;
}


// Attach event listener to the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to create the Add Quote Form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  // Create the text input for the quote
  const quoteTextInput = document.createElement('input');
  quoteTextInput.setAttribute('id', 'newQuoteText');
  quoteTextInput.setAttribute('type', 'text');
  quoteTextInput.setAttribute('placeholder', 'Enter a new quote');

  // Create the input for the quote category
 /* const categoryInput = document.createElement('input');
  categoryInput.setAttribute('id', 'newQuoteCategory');
  categoryInput.setAttribute('type', 'text');
  categoryInput.setAttribute('placeholder', 'Enter quote category');*/

  // Create the button to add the quote
  //const addButton = document.createElement('button');
  //addButton.textContent = 'Add Quote';

  // Append the input fields and button to the form container
  //formContainer.appendChild(quoteTextInput);
  //formContainer.appendChild(categoryInput);
  //formContainer.appendChild(addButton);

  // Add the form to the DOM, below the "Show New Quote" button
  //document.body.appendChild(formContainer);

  // Add an event listener for the Add Quote button
 addButton.addEventListener('click', addQuote);
}

// Function to save quotes to localStorage



// Function to populate categories dynamically in the dropdown
function populateCategories() {
  const categories = new Set(quotes.map(quote => quote.category));
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Add categories to the dropdown
  categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });

  // Set the last selected category
  categoryFilter.value = selectedCategory;
}



// Function to filter quotes based on the selected category
function filterQuotes() {
  selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem('selectedCategory', selectedCategory);  // Save the selected filter to localStorage

  // Filter quotes based on selected category
  const filteredQuotes = selectedCategory === 'all' 
      ? quotes 
      : quotes.filter(quote => quote.category === selectedCategory);

  // Display the filtered quotes (showing only one quote in this example)
  const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  document.getElementById("quoteDisplay").textContent = `"${quote.text}" - ${quote.category}`;
}


function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);  // Convert the quotes array to a JSON string
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';  // Name of the file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);  // Add imported quotes to the existing quotes array
      saveQuotes();  // Save the updated quotes to localStorage
      alert('Quotes imported successfully!');
      showRandomQuote();  // Optionally display a quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize the page by displaying a random quote and populating the categories
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
createAddQuoteForm();  // Create and add the form for adding new quotes when the page loads
populateCategories();  // Populate categories on page load
filterQuotes();  // Apply the initial filter based on the saved category 

const serverUrl = "https://jsonplaceholder.typicode.com/posts"; // Use an API mock service

// Simulate fetching data from the server
function fetchServerData() {
    fetch(serverUrl)
        .then(response => response.json())
        .then(data => {
            // Merge server data with local data (simple conflict resolution)
            const mergedData = [...data, ...quotes];
            quotes = mergedData;
            saveQuotes(); // Save merged data to local storage
            alert('Data synced with the server!');
        })
        .catch(error => console.error("Error syncing data:", error));
}

fetchQuotesFromServer();
// Periodically check for new server data
setInterval(fetchQuotesFromServer, 5000); // Sync every 5 seconds
