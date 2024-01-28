from sqlalchemy import  Column, Integer, String, Numeric, Date, VARCHAR, Boolean, DateTime
from app.config2 import Base
import app.model.crud as models
from app.config2 import engine
from sqlalchemy.dialects.mysql import VARCHAR
from sqlmodel import SQLModel
from app.model.mixins import TimeMixin, TimestampMixin

models.Base.metadata.create_all(bind=engine)


class snOnt(Base):
    __tablename__ ="sn_ont"
    
    sn = Column(VARCHAR, primary_key=True, index=True)	
    # perangkat = Column(VARCHAR)
    area = Column(VARCHAR)
    branch = Column(VARCHAR)
    # receive_date = Column(VARCHAR)
    first_detected = Column(DateTime)
    # last_online = Column(DateTime)
    # ip_olt= Column(VARCHAR)
    # slot = Column(Integer)
    # port = Column(Integer)
    # onu_id = Column(Integer)
    # hostname_olt = Column(VARCHAR)
    ont_status = Column(VARCHAR)
    online_counter = Column(Integer)
    user_speedy = Column(VARCHAR)
    nd = Column(VARCHAR)
    potensi = Column(Integer)
