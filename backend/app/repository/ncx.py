from sqlalchemy.orm import Session
from app.model.ncx import ncxOrder
from app.schema import NcxSchema

from sqlalchemy.dialects.mysql import VARCHAR


def get_ncx_order(db: Session, skip: int = 0, limit: int = 99999):
    return db.query(ncxOrder).offset(skip).limit(limit).all()

def get_ncx_order_by_witel(db: Session, username_witel: str):
    return db.query(ncxOrder).filter(ncxOrder.username_witel == username_witel).all()

def get_ncx_order_by_treg(db: Session, username_treg: str):
    return db.query(ncxOrder).filter(ncxOrder.username_treg == username_treg).all()

def create_ncx_order(db: Session, order_ncx: NcxSchema):
    _ncxOrder = ncxOrder(order_id = order_ncx.order_id, nama_customer = order_ncx.nama_customer, agreement_name = order_ncx.agreement_name, pic_am = order_ncx.pic_am, no_hp_pic_am = order_ncx.no_hp_pic_am, witel = order_ncx.witel)
    db.add(_ncxOrder)
    db.commit()
    db.refresh(_ncxOrder)
    return _ncxOrder



