from sqlalchemy import  Column, Integer, String, Numeric, Date, VARCHAR, Boolean
from app.config2 import Base
import app.model.crud as models
from app.config2 import engine
from sqlalchemy.dialects.mysql import VARCHAR
from sqlmodel import SQLModel
from app.model.mixins import TimeMixin, TimestampMixin

models.Base.metadata.create_all(bind=engine)


class ncxOrder(TimestampMixin, Base):
    __tablename__ ="detail_order_ncx"

    id = Column(Integer, primary_key=True, index=True)	
    order_id = Column(VARCHAR)
    nama_customer = Column(VARCHAR)
    produk = Column(VARCHAR)
    # work_order = Column(VARCHAR)
    # produk_eksisting = Column(VARCHAR)
    agreement_name = Column(VARCHAR)
    # location = Column(VARCHAR)
    pic_am = Column(VARCHAR)
    sid = Column(Integer)
    treg = Column(VARCHAR)
    witel = Column(VARCHAR)
    # divisi = Column(VARCHAR)
    # segment = Column(VARCHAR)
    # durasi_berlangganan = Column(VARCHAR)
    # nilai_revenue = Column(Integer)
    # revenue_per_bulan = Column(Integer)
    order_created_date = Column(Date)
    # no_order_astinet = Column(VARCHAR)
    # upload_dokumen = Column(VARCHAR)
    # document = Column(Boolean)
    # activate_account = Column(Boolean)
    # activation_date = Column(Date)
    # input_ip = Column(Boolean)
    # link_dashboard = Column(VARCHAR)
    # username = Column(VARCHAR)
    # password = Column(VARCHAR)
    # auth_netmonk_hi = Column(VARCHAR)
    # draft_bast = Column(VARCHAR)
    # bast_upload_date = Column(Date)
    # status_bast = Column(VARCHAR)
    # status_internal_netmonk_teknis = Column(VARCHAR)
    # status_internal_netmonk_admin = Column(VARCHAR)
    order_closing_date = Column(Date)
    # notes = Column(VARCHAR)
    status_fulfillment = Column(VARCHAR)
    username_witel = Column(VARCHAR)
    no_hp_pic_am = Column(VARCHAR)
    status_fulfillment_code = Column(VARCHAR)
    username_treg = Column(VARCHAR)
