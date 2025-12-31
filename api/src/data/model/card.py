from sqlalchemy import String, Column
from sqlalchemy.orm import Mapped

from data.model.base_model import Base


class Card(Base):
    __tablename__ = "card"

    id: Mapped[int] = Column(primary_key=True)
    name: Mapped[str] = Column(String(128))

    def __repr__(self) -> str:
        return f"Card(id={self.id!r}, name={self.name!r})"