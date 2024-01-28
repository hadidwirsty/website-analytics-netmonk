from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#DATABASE_URL = 'postgresql://postgres:dbnetmonk!@localhost:5433/embed_dash'
#DATABASE_URL = 'postgresql://postgres:dbnetmonk!@172.17.0.1:5432/embed_dash'
DATABASE_URL = f"postgresql://avnadmin:AVNS_sc2d3X6a9herivPLQlm@postgres-data-prod-jkt-netmonk-saas.a.aivencloud.com:18600/web_analytics"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush = False, bind=engine)
Base = declarative_base()
