document.getElementById('downloadBtn').addEventListener('click', async function() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');
    
    if (!videoUrl) {
        alert("Please paste a valid Instagram URL");
        return;
    }
    
    if (!videoUrl.includes("instagram.com")) {
        alert("Please enter a valid Instagram video URL");
        return;
    }
    
    // Show loader
    loader.style.display = "flex";
    resultDiv.style.display = "none";
    
    try {
        // Using a proxy server to bypass Instagram restrictions
        const apiUrl = `https://api.instagramdownloader.pro/api?url=${encodeURIComponent(videoUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.message);
        }
        
        // Display result
        resultDiv.innerHTML = `
            <h3>Your Video is Ready!</h3>
            <video controls>
                <source src="${data.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <a href="${data.videoUrl}" download="instagram_video.mp4">
                <i class="fas fa-download"></i> Download Now
            </a>
        `;
        
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                <p>Error: ${error.message}</p>
                <p>Try again or use a different link</p>
            </div>
        `;
    } finally {
        loader.style.display = "none";
        resultDiv.style.display = "block";
    }
});
