document.getElementById("new_artwork").addEventListener("click", async () => {
    const keywords = document.getElementById("keywords").value.trim();
    if (!keywords) return alert("Please enter some keywords.");
  
    const searchUrl = `https://api.artic.edu/api/v1/artworks/search?limit=100&q=${encodeURIComponent(keywords)}`;
    
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      const artworks = data.data;
  
      if (artworks.length === 0) {
        alert("No artworks found for these keywords.");
        return;
      }
  
      // scegli un artwork casuale
      const randomArtwork = artworks[Math.floor(Math.random() * artworks.length)];
  
      // fai una richiesta al link dell'artwork
      const artworkDetailsRes = await fetch(randomArtwork.api_link);
      const artworkDetailsData = await artworkDetailsRes.json();
      const details = artworkDetailsData.data;
  
      const imageUrl = `https://www.artic.edu/iiif/2/${details.image_id}/full/843,/0/default.jpg`;
  
      // aggiorna la pagina
      document.getElementById("artwork_image").src = imageUrl;
      document.getElementById("artwork_title").textContent = details.title;
      document.getElementById("artwork_artist").textContent = details.artist_title;
  
    } catch (error) {
      console.error("Error fetching artwork:", error);
      alert("An error occurred while fetching the artwork.");
    }
  });  