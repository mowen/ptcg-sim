from typing import Any

from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class GameStateAction(BaseModel):
    user: str | None = None
    action: str | None = None
    parameters: list[Any] = []
    emit: bool = True


class ImportResponse(BaseModel):
    version: str = "1.0"
    actions: list[GameStateAction] = []
