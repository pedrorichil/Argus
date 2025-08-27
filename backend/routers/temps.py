# routers/temps.py
from fastapi import APIRouter
import psutil
import time

try:
    import pynvml
    PYNVML_AVAILABLE = True
except ImportError:
    PYNVML_AVAILABLE = False

router = APIRouter(tags=["Temps"])

def get_nvidia_gpu_temp():
    """Obtém a temperatura da primeira GPU NVIDIA encontrada."""
    if not PYNVML_AVAILABLE:
        return None
    
    try:
        pynvml.nvmlInit()
        handle = pynvml.nvmlDeviceGetHandleByIndex(0)
        temperature = pynvml.nvmlDeviceGetTemperature(handle, pynvml.NVML_TEMPERATURE_GPU)
        return temperature
    except Exception as e:
        print(f"Erro ao acessar GPU NVIDIA: {e}")
        return None
    finally:
        if PYNVML_AVAILABLE:
            try:
                pynvml.nvmlShutdown()
            except:
                pass


@router.get("/temps")
async def get_temps_full():
    """
    Obtém temperaturas e velocidade do fan usando psutil e pynvml para GPU.
    """
    cpu_temp_avg = None
    cpu_max = None
    fan_rpm = None

    try:
        temps = psutil.sensors_temperatures()
        cpu_sensor_keys = ['coretemp', 'k10temp', 'cpu_thermal', 'acpitz']
        
        for key in cpu_sensor_keys:
            if key in temps:
                current_temps = [sensor.current for sensor in temps[key]]
                high_temps = [sensor.high for sensor in temps[key] if sensor.high is not None]
                
                if current_temps:
                    cpu_temp_avg = round(sum(current_temps) / len(current_temps), 1)
                if high_temps:
                    cpu_max = max(high_temps)
                break 

        fans = psutil.sensors_fans()
        if fans:
            first_fan_key = list(fans.keys())[0]
            if fans[first_fan_key]:
                fan_rpm = fans[first_fan_key][0].current

    except (AttributeError, KeyError, IndexError) as e:
        print(f"Não foi possível ler todos os sensores do psutil: {e}")

    gpu_temp = get_nvidia_gpu_temp()

    return {
        "cpu": cpu_temp_avg,
        "cpuMax": cpu_max,
        "gpu": gpu_temp,
        "fanRpm": fan_rpm, 
        "ts": int(time.time() * 1000)
    }