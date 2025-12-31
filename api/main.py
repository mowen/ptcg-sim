from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class MessageResponse(BaseModel):
    message: str


@app.get("/")
async def root() -> MessageResponse:
    return MessageResponse(message="Hello World")


@app.get("/hello/{name}")
async def say_hello(name: str) -> MessageResponse:
    return MessageResponse(message=f"Hello {name}")
