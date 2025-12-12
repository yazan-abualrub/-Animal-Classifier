const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const resultDiv = document.getElementById("result");
const previewImg = document.getElementById("preview");

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    showPreview(file);
    uploadFile(file);
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    showPreview(file);
    uploadFile(file);
});

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        previewImg.style.display = "block";
    }
    reader.readAsDataURL(file);
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/predict", { method: "POST", body: formData });
    const data = await response.json();

    resultDiv.innerHTML = `
        🐾 Prediction: <strong>${data.class}</strong><br>
        🔹 Confidence: ${(data.confidence*100).toFixed(2)}%
    `;
    resultDiv.classList.add("show");

    switch(data.class) {
        case "cat":
            resultDiv.style.background = "green"; 
            break;
        case "dog":
            resultDiv.style.background = "orange"; 
            break;
        case "wild":
            resultDiv.style.background = "blue"; 
            break;
        default:
            resultDiv.style.background = "#59b613ff"; 
    }
}
