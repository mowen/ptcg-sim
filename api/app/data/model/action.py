from typing import Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.data.model.base import Base
from app.data.model.game_state import GameState

# ORM relationship documentation: https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html#declarative-vs-imperative-forms


class Action(Base):
    __tablename__ = "action"

    id: Mapped[int] = mapped_column(primary_key=True)
    game_state_id: Mapped[int] = mapped_column(ForeignKey("game_state.id"))
    game_state: Mapped[GameState] = relationship(back_populates="actions")
    user: Mapped[Optional[str]]
    type: Mapped[Optional[str]]
    emit: Mapped[bool] = mapped_column(default=True)
    parameters: Mapped[list[ActionParameter]] = relationship("ActionParameter")


class ActionParameter(Base):
    __tablename__ = "action_parameter"

    value: Mapped[str]
