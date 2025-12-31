from sqlalchemy import Column
from sqlalchemy.orm import Mapped, relationship

from data.model.base_model import Base
from data.model.card import Card


class DeckList(Base):
    __tablename__ = "deck_list"

    id: Mapped[int] = Column(primary_key=True)
    cards: Mapped[list[Card]] = relationship(back_populates="deck")


