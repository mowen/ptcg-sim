from sqlalchemy.orm import Mapped, mapped_column, relationship

from data.model.action import Action
from data.model.base import Base
from data.model.deck_list import DeckList


class GameState(Base):
    __tablename__ = "game_state"

    id: Mapped[int] = mapped_column(primary_key=True)
    deck_list: Mapped[DeckList] = relationship("DeckList")
    actions: Mapped[list[Action]] = relationship(back_populates="game_state")

    def __repr__(self) -> str:
        return f"GameState(id={self.id!r})"
