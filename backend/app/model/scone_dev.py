from sqlalchemy import  Column, Integer, String, Numeric, Date, VARCHAR, Boolean, DateTime
from app.config2 import Base
import app.model.crud as models
from app.config2 import engine
from sqlalchemy.dialects.mysql import VARCHAR
from sqlmodel import SQLModel
from app.model.mixins import TimeMixin, TimestampMixin

models.Base.metadata.create_all(bind=engine)


class orderSconeDev(TimestampMixin, Base):
    __tablename__ ="detail_order_scone_dev"

    sc_netmonk = Column(VARCHAR, primary_key=True, index=True)	
    nomor_baa = Column(VARCHAR)
    nama_pelanggan = Column(VARCHAR)
    treg = Column(VARCHAR)
    witel = Column(VARCHAR)
    nomor_internet = Column(VARCHAR)
    no_hp = Column(VARCHAR)
    email_pelanggan = Column(VARCHAR)
    status_wfm = Column(VARCHAR)
    tanggal_aktivasi = Column(Date)
    short_link = Column(VARCHAR)
    status_kirim_email = Column(VARCHAR)
    notes = Column(VARCHAR)
    status_fulfillment = Column(VARCHAR)
    username_witel = Column(VARCHAR)
    estimasi_selesai = Column(DateTime)
    status_fulfillment_code = Column(Integer)
    username_treg = Column(VARCHAR)
    username = Column(VARCHAR)
    password = Column(VARCHAR)
    secret_key = Column(VARCHAR)
