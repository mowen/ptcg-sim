from fastapi_sqlalchemy import db


class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.get(_id)
