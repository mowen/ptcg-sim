from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.data.model.base import Base
from app.data.model.deck_list import DeckList

if TYPE_CHECKING:
    from app.data.model.action import Action


class GameState(Base):
    __tablename__ = "game_state"

    id: Mapped[int] = mapped_column(primary_key=True)
    import_key: Mapped[str] = mapped_column(unique=True)
    deck_list: Mapped[DeckList] = relationship("DeckList")
    actions: Mapped[list["Action"]] = relationship(back_populates="game_state")

    def __repr__(self) -> str:
        return f"GameState(id={self.id!r})"
