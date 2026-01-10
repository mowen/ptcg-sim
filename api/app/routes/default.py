from fastapi import APIRouter, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.data.model.game_state import GameState
from app.data.responses import GameStateAction, ImportResponse, MessageResponse
from app.db import engine

router = APIRouter()


@router.get("/")
async def root() -> MessageResponse:
    return MessageResponse(message="Hello World")


@router.get("/hello/{name}")
async def say_hello(name: str) -> MessageResponse:
    return MessageResponse(message=f"Hello {name}")


@router.get("/import")
async def get_game_state(import_key: str) -> ImportResponse:
    with Session(engine) as session:
        result = session.execute(
            select(GameState).where(GameState.import_key == import_key)
        )
        game_state = result.scalars().first()
        if game_state:
            actions = [
                GameStateAction(
                    user=action.user,
                    action=action.type,
                    emit=action.emit,
                    parameters=action.parameters,
                )
                for action in game_state.actions
            ]
            return ImportResponse(actions=actions)
        else:
            raise HTTPException(status_code=404)
