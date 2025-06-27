from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
app.url_map.strict_slashes = False 
CORS(app)

db_config = {
    'host': '34.42.182.227',
    'user': 'root',
    'password': 'Hola.123',
    'database': 'sopes1'
}

@app.route('/insert', methods=['POST'])
def insertar_metrica():
    data = request.json

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        api = 'Python'

        query = """
        INSERT INTO metricas (
            id, total, libre, uso, porcentaje, porcentaje_cpu,
            total_processes, running_processes, sleeping_processes,
            zombie_processes, stopped_processes, cpu_cores, timestamp, api
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            data["id"], data["total"], data["libre"], data["uso"], data["porcentaje"],
            data["porcentaje_cpu"], data["total_processes"], data["running_processes"],
            data["sleeping_processes"], data["zombie_processes"], data["stopped_processes"],
            data["cpu_cores"], data["timestamp"], api
        )

        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"mensaje": "Métrica insertada correctamente"}), 201

    except Exception as e:
        print("Error al insertar:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/hello', methods=['GET'])
def hello():
    try:

        return jsonify({"mensaje": "Hola desde python"}), 201

    except Exception as e:
        print("Error en hello:", e)
        return jsonify({"error": str(e)}), 500