from fastapi import FastAPI

from app.routes.default import router

app = FastAPI()
app.include_router(router)
