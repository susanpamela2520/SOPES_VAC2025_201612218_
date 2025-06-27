from locust import HttpUser, task, between
import json
import datetime

responses = []
counter = 0

def guardar_respuestas(filename='metrics.json'):
    with open(filename, "w") as f:
        json.dump(responses, f, ensure_ascii=False, indent=4)
    print(f"Respuestas guardadas en {filename}")

class MyUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def get_datos_combinados(self):
        global counter

        response_ram = self.client.get("/ram")
        response_cpu = self.client.get("/cpu")
        response_process = self.client.get("/process")

        if response_ram.status_code == 200 and response_cpu.status_code == 200:
            data_ram = response_ram.json()
            data_cpu = response_cpu.json()
            data_process = response_process.json()

            combinado = {}
            combinado.update(data_ram)
            data_cpu["porcentaje_cpu"] = data_cpu.pop("porcentaje")
            combinado.update(data_cpu)
            combinado.update(data_process)

            counter += 1
            combinado["id"] = counter
            combinado["timestamp"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            responses.append(combinado)

            if counter % 5 == 0:
                guardar_respuestas()
        else:
            print("Error al obtener /ram o /cpu")

    def on_stop(self):
        guardar_respuestas()
