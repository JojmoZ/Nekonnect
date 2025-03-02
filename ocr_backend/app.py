from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
from paddleocr import PaddleOCR, draw_ocr
import re
import base64
app = Flask(__name__)
CORS(app)

ocr = PaddleOCR(use_angle_cls=True, lang='en') 
def decode_image(base64_string):
    image_bytes = base64.b64decode(base64_string.split(",")[1])
    image_np = np.array(bytearray(image_bytes), dtype=np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    return image

@app.route("/encode-face", methods=["POST"])
def encode_face():
    try:
        data = request.json
        image = decode_image(data["image"])
        face_encodings = face_recognition.face_encodings(image)

        if len(face_encodings) > 0:
            encoding_list = face_encodings[0].tolist()
            return jsonify({"success": True, "encoding": encoding_list})
        else:
            return jsonify({"success": False, "error": "No face found"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
    
@app.route("/verify-face", methods=["POST"])
def verify_face():
    try:
        data = request.json
        image = decode_image(data["image"])
        stored_encoding = np.array(data["encoding"])

        face_encodings = face_recognition.face_encodings(image)

        if len(face_encodings) > 0:
            match = face_recognition.compare_faces([stored_encoding], face_encodings[0])[0]
            return jsonify({"success": True, "match": match})
        else:
            return jsonify({"success": False, "error": "No face found"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
    

@app.route('/ocr', methods=['POST'])
def upload_image():
    print("Upload")
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(file.stream).convert('RGB')
        image_np = np.array(image)
        image_cv = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR) 
        print("image converted")

        extracted_text = ocr.ocr(image_cv, cls=True)
        print("extracted:", extracted_text)

        text_lines = [line[1][0] for line in extracted_text[0]] 
        full_text = "\n".join(text_lines)  
        print("Full Text:", full_text)

        processed_data = process_text(full_text)

        print(processed_data)


        return jsonify({'text': full_text, 'processed_data': processed_data})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


def process_text(text):
    pattern = r'(NIK|Nama|Tempat/Tgl Lahir|Jenis Kelamin|Kewarganegaraan)\s*:?\s*(.+)'
    matches = re.findall(pattern, text)

    data = {key: value.strip() for key, value in matches}
    return data


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)
