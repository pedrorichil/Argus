from fastapi import APIRouter
import time
import subprocess
import pwd
import os

router = APIRouter(tags=["Processes"])

@router.get("/processes")
async def get_processes_low_level():
    """Executa o comando 'ps' e analisa a saída para obter a lista de processos."""
    try:
        cmd = ["ps", "-eo", "pid,comm,%cpu,%mem,rss,user", "--no-headers", "--sort=-%cpu"]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        rows = []
        for line in result.stdout.strip().split('\n')[:15]:
            parts = line.strip().split()
            if len(parts) < 6:
                continue

            pid = parts[0]
            user = parts[-1]
            rss_kb = parts[-2]
            pmem = parts[-3]
            pcpu = parts[-4]
            comm = " ".join(parts[1:-4])
            
            rows.append({
                "pid": int(pid),
                "name": comm,
                "user": user,
                "cpu": float(pcpu),
                "ramMB": round(int(rss_kb) / 1024, 2)
            })

        return {
            "updatedAt": int(time.time() * 1000),
            "rows": rows
        }
    except (FileNotFoundError, subprocess.CalledProcessError) as e:
        print(f"Erro ao executar ps: {e}")
        return { "updatedAt": int(time.time() * 1000), "rows": [] }