from sqlalchemy import  Column, Integer, String, Numeric, Date, VARCHAR, Boolean, DateTime
from app.config2 import Base
import app.model.crud as models
from app.config2 import engine
from sqlalchemy.dialects.mysql import VARCHAR
from sqlmodel import SQLModel
from app.model.mixins import TimeMixin, TimestampMixin

models.Base.metadata.create_all(bind=engine)


class dataTesting(Base):
    __tablename__ ="data_testing"
    
    sn = Column(VARCHAR, primary_key=True, index=True)	
    perangkat = Column(VARCHAR)
    area = Column(VARCHAR)
    branch = Column(VARCHAR)
    userid = Column(VARCHAR)
    activation_date = Column(VARCHAR)
    paket = Column(VARCHAR)
    status_ont = Column(Integer)
    operstatus = Column(Integer)
    availibility = Column(Integer)
