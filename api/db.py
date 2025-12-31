from sqlalchemy import create_engine

from settings import Settings

settings = Settings()
engine = create_engine(settings.pg_dsn.unicode_string(), echo=True)
