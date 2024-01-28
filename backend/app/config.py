from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import create_engine

#DB_CONFIG = f"postgresql+asyncpg://postgres:dbnetmonk!@localhost:5433/embed_dash"
DB_CONFIG = f"postgresql+asyncpg://avnadmin:AVNS_sc2d3X6a9herivPLQlm@postgres-data-prod-jkt-netmonk-saas.a.aivencloud.com:18600/web_analytics"


ALLOWED_ORIGINS = ["http://tech.data-production.netmonk.id:3001", "http://localhost:3001", "https://app.netmonk.id", "http://13.212.175.27:3001", "http://103.146.246.103:3001, https://web-analytics.netmonk.id", "https://web-analytics.netmonk.id", "http://108.136.238.137:3000"]

SECRET_KEY = "netmonk123!"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class AsyncDatabaseSession:

    def __init__(self) -> None:
        self.session = None
        self.engine = None

    def __getattr__(self,name):
        return getattr(self.session,name)

    def init(self):
        self.engine = create_async_engine(DB_CONFIG,future=True, echo=True)
        self.session = sessionmaker(self.engine, expire_on_commit=False, class_=AsyncSession)()

    async def create_all(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)


db = AsyncDatabaseSession()

async def commit_rollback():
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise

#CRUD System
# engine = create_engine(DB_CONFIG)
# SessionLocal = sessionmaker(autocommit=False, autoflush = False, bind=engine.begin())
# Base = declarative_base()
