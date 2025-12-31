from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.data.model.base import Base
from app.data.model.card import Card


class DeckList(Base):
    __tablename__ = "deck_list"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(128))
    cards: Mapped[list[Card]] = relationship(back_populates="deck")

    def __repr__(self) -> str:
        return f"DeckList(id={self.id!r}, name={self.name!r}, cards={self.cards!r})"
