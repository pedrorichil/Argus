from fastapi import APIRouter
import psutil

router = APIRouter(tags=["Storage"])

@router.get("/storage")
async def get_storage_final():
    storage_data = []
    seen_devices = set()

    try:
        partitions = psutil.disk_partitions(all=False)
        for i, partition in enumerate(partitions):
            if partition.device in seen_devices: continue
            try:
                usage = psutil.disk_usage(partition.mountpoint)
                storage_data.append({
                    "id": f"disk-{i}", "label": partition.mountpoint,
                    "totalBytes": usage.total, "usedBytes": usage.used,
                    "freeBytes": usage.free, "pct": usage.percent
                })
                seen_devices.add(partition.device)
            except (PermissionError, FileNotFoundError):
                continue
    except Exception as e:
        print(f"Erro ao obter storage: {e}")
        return {"rows": []}

    return {"rows": storage_data}