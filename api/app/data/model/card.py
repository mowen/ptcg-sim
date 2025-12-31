from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.data.model.base import Base


class Card(Base):
    __tablename__ = "card"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(128))

    def __repr__(self) -> str:
        return f"Card(id={self.id!r}, name={self.name!r})"
