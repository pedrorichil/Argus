import uvicorn
import os
from dotenv import load_dotenv
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, UTC

from routers import stats, processes, storage, temps

load_dotenv()

app = FastAPI(
    title="Argus API",
    description="API para monitoramento em tempo real de sistemas, oferecendo uma visão completa sobre CPU, memória, rede e processos.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(stats.router, prefix="/api")
app.include_router(processes.router, prefix="/api")
app.include_router(storage.router, prefix="/api")
app.include_router(temps.router, prefix="/api")

class HealthResponse(BaseModel):
    ok: bool
    service: str
    time: datetime

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    """Verifica se o serviço está no ar."""
    return {
        "ok": True,
        "service": "Argus API",
        "time": datetime.now(UTC)
    }

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 8080))
    HOST = os.getenv("HOST", "127.0.0.1")
    uvicorn.run(app, host=HOST, port=PORT)
    print(f"Argus API backend rodando em http://{HOST}:{PORT}")