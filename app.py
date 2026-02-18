import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

app = Flask(__name__)
CORS(app)

# ======================================================
# LOAD PLANT MODEL
# ======================================================
print("Loading plant model...")
plant_model = tf.keras.models.load_model(
    r"D:\SFP\agriguide-ai-main\trained_model.keras"
)
print("Plant model loaded ✅")

plant_classes = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# ======================================================
# LOAD SOIL MODEL
# ======================================================
print("Loading soil model...")
soil_model = tf.keras.models.load_model("final_soilmodel.keras")
print("Soil model loaded ✅")

soil_classes = [
    "Alluvial_Soil",
    "Arid_Soil",
    "Black_Soil",
    "Laterite_Soil",
    "Mountain_Soil",
    "Red_Soil",
    "Yellow_Soil"
]

# ======================================================
# PREPROCESS FUNCTIONS
# ======================================================

def preprocess_plant(img):
    img = img.convert("RGB")
    img = img.resize((128, 128))
    arr = np.array(img, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)
    return arr


def preprocess_soil(img):
    img = img.convert("RGB")
    img = img.resize((224, 224))   # MATCH TRAINING
    arr = np.array(img, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)
    return arr


# ======================================================
# ROUTES
# ======================================================

@app.route("/")
def home():
    return jsonify({"message": "AgriGuide AI Backend Running 🚀"})


# ---------------- PLANT ----------------
@app.route("/predict", methods=["POST"])
def predict_plant():
    try:
        if "image" not in request.files:
            return jsonify({"success": False}), 400

        file = request.files["image"]
        img = Image.open(file.stream)

        arr = preprocess_plant(img)

        predictions = plant_model.predict(arr, verbose=0)[0]
        top_indices = np.argsort(predictions)[-3:][::-1]

        top3 = [
            {
                "disease": plant_classes[i],
                "confidence": round(float(predictions[i]) * 100, 2)
            }
            for i in top_indices
        ]

        return jsonify({
            "success": True,
            "topPrediction": top3[0],
            "top3": top3
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ---------------- SOIL ----------------
@app.route("/predict-soil", methods=["POST"])
def predict_soil():
    try:
        if "image" not in request.files:
            return jsonify({"success": False}), 400

        file = request.files["image"]
        img = Image.open(file.stream)

        arr = preprocess_soil(img)

        predictions = soil_model.predict(arr, verbose=0)[0]
        top_indices = np.argsort(predictions)[-3:][::-1]

        top3 = [
            {
                "soilType": soil_classes[i].replace("_", " "),
                "confidence": round(float(predictions[i]) * 100, 2)
            }
            for i in top_indices
        ]

        return jsonify({
            "success": True,
            "topPrediction": top3[0],
            "top3": top3
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
