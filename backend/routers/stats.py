import time
from fastapi import APIRouter
import psutil

router = APIRouter(tags=["Stats"])

last_net_state = { "ts": None, "counters": None }

@router.get("/stats")
async def get_stats():
    global last_net_state

    cpu_percent = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage('/')

    now = time.time()
    rx_bps, tx_bps = 0.0, 0.0
    
    nic_counters = psutil.net_io_counters(pernic=True)
    
    main_interface = None
    max_bytes = -1
    for iface, counters in nic_counters.items():
        if iface.startswith('lo') or iface.startswith('docker'): continue
        total_bytes = counters.bytes_sent + counters.bytes_recv
        if total_bytes > max_bytes:
            max_bytes = total_bytes
            main_interface = iface
            
    if main_interface is None: main_interface = 'eth0'

    current_counters = nic_counters.get(main_interface)
    rx_bytes_total = current_counters.bytes_recv if current_counters else 0
    tx_bytes_total = current_counters.bytes_sent if current_counters else 0

    if last_net_state.get("counters") and main_interface in last_net_state["counters"]:
        dt = now - last_net_state["ts"]
        if dt > 0:
            last_iface_counters = last_net_state["counters"][main_interface]
            rx_bps = (current_counters.bytes_recv - last_iface_counters.bytes_recv) / dt
            tx_bps = (current_counters.bytes_sent - last_iface_counters.bytes_sent) / dt
    
    last_net_state["ts"] = now
    last_net_state["counters"] = nic_counters

    return {
        "cpu": cpu_percent, "ram": mem.percent,
        "ramBytes": {"used": mem.used, "total": mem.total}, "disk": disk.percent,
        "net": {
            "rx_mbps": (rx_bps * 8) / (1000 ** 2), "tx_mbps": (tx_bps * 8) / (1000 ** 2),
            "rx_bps": max(0, rx_bps), "tx_bps": max(0, tx_bps),
            "rx_bytes": rx_bytes_total, "tx_bytes": tx_bytes_total,
        }
    }