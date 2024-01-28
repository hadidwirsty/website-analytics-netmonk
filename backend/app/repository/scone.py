from sqlalchemy.orm import Session
from sqlalchemy import literal_column, and_, or_, case
from app.model.scone import orderScone
from app.schema import SconeSchema
from datetime import datetime, timedelta
import pytz

from sqlalchemy.dialects.mysql import VARCHAR


def get_scone(db: Session, skip: int = 0, limit: int = 99999):
    return db.query(orderScone).offset(skip).limit(limit).all()

def get_order_by_id(db: Session, sc_netmonk: str):
    return db.query(orderScone).filter(orderScone.sc_netmonk == sc_netmonk).first()

def get_scone_au(db: Session, skip: int = 0, limit: int = 99999):
    return db.query(orderScone.sc_netmonk,
                    orderScone.nama_pelanggan,
                    orderScone.nomor_internet,
                    orderScone.email_pelanggan,
                    orderScone.witel,
                    orderScone.treg,
                    orderScone.status_active_user,
                    case([(orderScone.konfirmasi_pelanggan.is_(None), 'Belum Konfirmasi')], else_=orderScone.konfirmasi_pelanggan).label("konfirmasi_pelanggan"),
                    orderScone.alasan
    ).filter(orderScone.status_active_user == 'CT0', orderScone.tanggal_aktivasi.between(datetime(2023, 7, 1), datetime(2023, 10, 31))
#or_
 #           (
  #              orderScone.status_active_user == 'Semi-Active',  
   #             orderScone.status_active_user == 'CT0' 
    #        )
    ).offset(skip).limit(limit).all()

def get_scone_by_id(db: Session, sc_netmonk: str):
    return db.query(orderScone.sc_netmonk,
                    orderScone.nama_pelanggan,
                    orderScone.nomor_internet,
                    orderScone.email_pelanggan,
                    orderScone.witel,
                    orderScone.treg,
                    orderScone.status_active_user,
                    case([(orderScone.konfirmasi_pelanggan.is_(None), 'Belum Konfirmasi')], else_=orderScone.konfirmasi_pelanggan).label("konfirmasi_pelanggan"),
                    orderScone.alasan,
                    orderScone.modified_at
    ).filter(orderScone.sc_netmonk == sc_netmonk).first()

def get_scone_by_activation(db: Session):
    return db.query(literal_column("'Business'").label('Customer Type'),
                    orderScone.nama_pelanggan.label('Customer Name'),
                    orderScone.no_hp.label('Customer Phone'),
                    orderScone.email_pelanggan.label('Customer Email'),
                    orderScone.witel.label('Customer Address'),
                    orderScone.nomor_internet.label('Nomor Internet'),
                    orderScone.nama_pelanggan.label('Device Name'),
                    orderScone.nama_pelanggan.label('Internet Location'),
                    literal_column("'WIB'").label('Time Zone'),
		    literal_column("''").label('Bandwidth Package'),
                    literal_column("''").label('Contract Start'),
                    literal_column("''").label('Contract Duration')
    ).filter(orderScone.short_link.is_(None),
            orderScone.witel.isnot(None),
            orderScone.nama_pelanggan.isnot(None),
            orderScone.no_hp.isnot(None),
            orderScone.email_pelanggan.isnot(None)).all()

def get_scone_by_witel(db: Session, username_witel: str):
    return db.query(orderScone).filter(orderScone.username_witel == username_witel).all()

def get_scone_by_treg(db: Session, username_treg: str):
    return db.query(orderScone).filter(orderScone.username_treg == username_treg).all()

def create_scone_order(db: Session, order_scone: SconeSchema):
    current_datetime = datetime.now()
    jakarta_timezone = pytz.timezone('Asia/Jakarta')
    current_datetime = current_datetime.astimezone(jakarta_timezone)
    current_date = current_datetime.date()

    # Check if the current time is between 8:00 and 19:00 (7:00 PM)
    if 8 <= current_datetime.hour < 19:
        estimasi_selesai = current_datetime + timedelta(hours=5, minutes=30)
    else:
        estimasi_selesai = current_datetime + timedelta(hours=9, minutes=30)
    formatted_estimasi_selesai = estimasi_selesai.strftime('%Y-%m-%d %H:%M:%S')
    _orderScone = orderScone(sc_netmonk = order_scone.sc_netmonk, nama_pelanggan = order_scone.nama_pelanggan, nomor_internet = order_scone.nomor_internet, no_hp = order_scone.no_hp, email_pelanggan = order_scone.email_pelanggan, witel=order_scone.witel, status_fulfillment='Order Input by Witel', username_witel = order_scone.username_witel, tanggal_aktivasi=current_date, estimasi_selesai=formatted_estimasi_selesai)
    db.add(_orderScone)
    db.commit()
    db.refresh(_orderScone)
    return _orderScone

def get_scone_au_by_witel(db: Session, username_witel: str):
    return db.query(orderScone.sc_netmonk,
                    orderScone.nama_pelanggan,
                    orderScone.nomor_internet,
                    orderScone.email_pelanggan,
                    #orderScone.witel,
                    orderScone.status_active_user,
                    case([(orderScone.konfirmasi_pelanggan.is_(None), 'Belum Konfirmasi')], else_=orderScone.konfirmasi_pelanggan).label("konfirmasi_pelanggan"),
                    orderScone.alasan
    ).filter(orderScone.username_witel == username_witel,
             orderScone.status_active_user == 'CT0', orderScone.tanggal_aktivasi.between(datetime(2023, 7, 1), datetime(2023, 10, 31))
#            or_(
 #               orderScone.status_active_user == 'Semi-Active',  
  #              orderScone.status_active_user == 'CT0' 
   #         )
            ).all()

def get_scone_au_by_treg(db: Session, username_treg: str):
    return db.query(orderScone.sc_netmonk,
                    orderScone.nama_pelanggan,
                    orderScone.nomor_internet,
                    orderScone.email_pelanggan,
                    orderScone.witel,
                    orderScone.status_active_user,
                    case([(orderScone.konfirmasi_pelanggan.is_(None), 'Belum Konfirmasi')], else_=orderScone.konfirmasi_pelanggan).label("konfirmasi_pelanggan"),
                    orderScone.alasan
    ).filter(orderScone.username_treg == username_treg, 
	    orderScone.status_active_user == 'CT0', orderScone.tanggal_aktivasi.between(datetime(2023, 7, 1), datetime(2023, 10, 31))
#            or_(
 #               orderScone.status_active_user == 'Semi-Active',  
  #              orderScone.status_active_user == 'CT0' 
   #         )
            ).all()

def update_scone_by_au(db: Session, sc_netmonk: str, konfirmasi_pelanggan: str, alasan: str):

    _orderScone = get_order_by_id(db=db, sc_netmonk=sc_netmonk)
    #print(_orderScone)
    #print(konfirmasi_pelanggan)
    #print(_orderScone.konfirmasi_pelanggan)
    #print(_orderScone.modified_at)
    _orderScone.modified_at = _orderScone.modified_at
    _orderScone.konfirmasi_pelanggan = konfirmasi_pelanggan
    _orderScone.alasan = alasan

    db.commit()
    db.refresh(_orderScone)
    return _orderScone
