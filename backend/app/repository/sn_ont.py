from sqlalchemy.orm import Session
from sqlalchemy import case, or_, and_
from app.model.sn_ont import snOnt

from sqlalchemy.dialects.mysql import VARCHAR


def get_data_snont(db: Session, skip: int = 0, limit: int = 10):
    return db.query(snOnt).offset(skip).limit(limit).all()


def get_snont_cabut(db: Session):
    return db.query(snOnt.sn.label('sn'),
                    snOnt.area.label('area'),
                    snOnt.branch.label('branch'),
                    snOnt.ont_status.label('ont_status'),
                    snOnt.nd.label('nd'),
                    case([(snOnt.first_detected == None, 'Tidak')],
                        else_='Ya').label('status_instalasi')
                    ).filter(and_(snOnt.potensi == 1, snOnt.ont_status != 'ONLINE')).all()


def get_snont_gangguan(db: Session):
    return db.query(snOnt.sn.label('sn'),
                    snOnt.area.label('area'),
                    snOnt.branch.label('branch'),
                    snOnt.ont_status.label('ont_status'),
                    snOnt.nd.label('nd'),
                    case([(snOnt.first_detected == None, 'Tidak')],
                        else_='Ya').label('status_instalasi')
                    ).filter(or_(snOnt.potensi == 2, and_(snOnt.potensi == 1, snOnt.ont_status == 'ONLINE'))).all()

def get_snont_instalasi(db: Session, status_instalasi: str):
    return db.query(snOnt.sn.label('sn'),
                    snOnt.area.label('area'),
                    snOnt.branch.label('branch'),
                    snOnt.ont_status.label('ont_status'),
                    snOnt.nd.label('nd'),
                    case([(snOnt.first_detected == None, 'Tidak')],
                        else_='Ya').label('status_instalasi')
                    ).filter(case([(snOnt.first_detected == None, 'Tidak')],
                                  else_='Ya') == status_instalasi).all()
