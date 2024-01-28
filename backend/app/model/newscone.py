from sqlalchemy import  Column, Integer, String, Numeric, Date, VARCHAR, Boolean, DateTime
from app.config2 import Base
import app.model.crud as models
from app.config2 import engine
from sqlalchemy.dialects.mysql import VARCHAR
from sqlmodel import SQLModel
from app.model.mixins import TimeMixin, TimestampMixin

models.Base.metadata.create_all(bind=engine)


class orderNewScone(TimestampMixin, Base):
    __tablename__ ="order_scone"

    nomor_sc = Column(VARCHAR, primary_key=True, index=True)	
    tanggal_order = Column(DateTime)
    regional = Column(VARCHAR)
    witel = Column(VARCHAR)
    nama_pelanggan = Column(VARCHAR)
    nohp_pelanggan = Column(VARCHAR)
    email_pelanggan = Column(VARCHAR)
    alamat_pelanggan = Column(VARCHAR)
    nomor_internet = Column(VARCHAR)
    ket_contact = Column(VARCHAR)
    status_message = Column(VARCHAR)
    kategori = Column(VARCHAR)
    channel = Column(VARCHAR)
    status_aktivasi = Column(VARCHAR)
    username = Column(VARCHAR)
    password = Column(VARCHAR)
    secret_key = Column(VARCHAR)
    tanggal_aktivasi = Column(DateTime)
    modified_at = Column(DateTime)
    catatan = Column(VARCHAR)
    status_wfm = Column(VARCHAR)
    status_resume = Column(VARCHAR)
    time_location = Column(VARCHAR)
    last_updated_date = Column(DateTime)
    tanggal_baa = Column(DateTime)
    addon = Column(VARCHAR)
    nd = Column(VARCHAR)
