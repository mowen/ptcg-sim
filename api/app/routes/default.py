from fastapi import APIRouter

from ..data.responses import MessageResponse

router = APIRouter()


@router.get("/")
async def root() -> MessageResponse:
    return MessageResponse(message="Hello World")


@router.get("/hello/{name}")
async def say_hello(name: str) -> MessageResponse:
    return MessageResponse(message=f"Hello {name}")
