from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
from paddleocr import PaddleOCR, draw_ocr
import re

app = Flask(__name__)
CORS(app)

ocr = PaddleOCR(use_angle_cls=True, lang='en') 

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
    app.run(debug=True, port=5000)
