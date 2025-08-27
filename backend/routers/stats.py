from fastapi import APIRouter
import psutil
import time

router = APIRouter(tags=["Stats"])

last_net_io = psutil.net_io_counters()
last_net_ts = time.time()

@router.get("/stats")
async def get_stats():
    global last_net_io, last_net_ts

    cpu_percent = psutil.cpu_percent(interval=1)

    mem = psutil.virtual_memory()

    try:
        disk_usage = psutil.disk_usage('/')
        disk_percent = disk_usage.percent
    except (FileNotFoundError, PermissionError):
        disk_percent = 0

    current_net_io = psutil.net_io_counters()
    now = time.time()
    dt = max(0.5, now - last_net_ts)

    rx_bytes = current_net_io.bytes_recv
    tx_bytes = current_net_io.bytes_sent

    rx_bps = max(0, (rx_bytes - last_net_io.bytes_recv) / dt)
    tx_bps = max(0, (tx_bytes - last_net_io.bytes_sent) / dt)

    last_net_io = current_net_io
    last_net_ts = now

    return {
        "cpu": round(cpu_percent, 2),
        "ram": round(mem.percent, 2),
        "ramBytes": {"used": mem.used, "total": mem.total},
        "disk": disk_percent,
        "net": {
            "rx_mbps": rx_bps / (1024 ** 2),
            "tx_mbps": tx_bps / (1024 ** 2),
            "rx_bps": rx_bps,
            "tx_bps": tx_bps,
            "rx_bytes": rx_bytes,
            "tx_bytes": tx_bytes
        }
    }