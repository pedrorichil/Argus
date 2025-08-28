from fastapi import APIRouter
import psutil
import time

router = APIRouter(tags=["Processes"])

@router.get("/processes")
async def get_processes():
    processes = []
    psutil.cpu_percent(interval=0.1) 
    
    for proc in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_info']):
        try:
            pinfo = proc.info
            cpu_percent = pinfo['cpu_percent']
            if cpu_percent > 0:
                processes.append({
                    "pid": pinfo['pid'], "name": pinfo['name'], "user": pinfo['username'],
                    "cpu": round(cpu_percent, 2),
                    "ramMB": round(pinfo['memory_info'].rss / (1024 * 1024), 2)
                })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

    sorted_processes = sorted(processes, key=lambda p: p['cpu'], reverse=True)[:15]

    return {"updatedAt": int(time.time() * 1000), "rows": sorted_processes}