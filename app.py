from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from PIL import Image
import numpy as np
import io

app = FastAPI()

# Mount static folder
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

model = tf.keras.models.load_model("model/best_fine_tuned.keras")
label_map = {0: "cat", 1: "dog", 2: "wild"}

IMG_SIZE = (224, 224)

def predict_animal(img_bytes):
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE)
    x = np.array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    
    preds = model.predict(x)
    class_idx = np.argmax(preds, axis=1)[0]
    confidence = preds[0][class_idx]
    return label_map[class_idx], float(confidence)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img_bytes = await file.read()
    pred_class, confidence = predict_animal(img_bytes)
    return {"class": pred_class, "confidence": confidence}

# uvicorn app:app --reload

