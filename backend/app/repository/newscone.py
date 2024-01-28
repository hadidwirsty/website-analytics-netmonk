from sqlalchemy.orm import Session
from sqlalchemy import literal_column, and_, or_, case, func, not_
from app.model.newscone import orderNewScone
from app.schema import NewSconeSchema
from datetime import datetime, timedelta
import pytz
from math import ceil

from sqlalchemy.dialects.mysql import VARCHAR


def get_order_by_id(db: Session, nomor_sc: str):
    return db.query(orderNewScone).filter(orderNewScone.nomor_sc == nomor_sc).first()

def get_scone_by_id(db: Session, nomor_sc: str):
    return db.query(orderNewScone.nomor_sc,
                    orderNewScone.nama_pelanggan,
                    orderNewScone.nohp_pelanggan,
                    orderNewScone.email_pelanggan,
                    case([(orderNewScone.nomor_internet.is_(None), orderNewScone.nd)], else_=orderNewScone.nomor_internet).label("nomor_internet"),
                    orderNewScone.regional,
                    orderNewScone.witel,
                    orderNewScone.tanggal_order,
		    orderNewScone.status_resume,
		    orderNewScone.status_aktivasi,
                    case([(orderNewScone.status_wfm.is_(None), 'To Do')], else_=orderNewScone.status_wfm).label("status_wfm"),
                    orderNewScone.catatan,
                    orderNewScone.username,
                    orderNewScone.password,
                    orderNewScone.secret_key,
		    orderNewScone.tanggal_baa,
		    orderNewScone.tanggal_aktivasi
    ).filter(orderNewScone.nomor_sc == nomor_sc).first()

def get_scone(db: Session):
    month = datetime.now().date() - timedelta(days=30)
    return db.query(orderNewScone.nomor_sc,
                    orderNewScone.nama_pelanggan,
                    orderNewScone.nohp_pelanggan,
                    orderNewScone.email_pelanggan,
		    case([(orderNewScone.nomor_internet.is_(None), orderNewScone.nd)], else_=orderNewScone.nomor_internet).label("nomor_internet"),
                    #orderNewScone.nomor_internet,
		    orderNewScone.status_resume,
                    orderNewScone.regional,
                    orderNewScone.witel,
                    orderNewScone.tanggal_order,
                    orderNewScone.catatan
    ).filter(orderNewScone.status_aktivasi=='Not Activated',
            or_(orderNewScone.status_resume == 'OSS - PROVISIONING START',
		orderNewScone.status_resume == '10 | OSS - PROVISIONING COMPLETE',
		orderNewScone.status_resume == '7 | OSS - PROVISIONING ISSUED',
		orderNewScone.status_resume == 'OSS - TESTING SERVICE',
		orderNewScone.status_resume == 'OSS - PROVISIONING DESAIN',
		orderNewScone.status_resume == 'OSS - FALLOUT',
		orderNewScone.status_resume == 'MYCX - SEND OPEN PAPERLESS',
		orderNewScone.status_resume == 'MYCX - FAIL',
		orderNewScone.status_resume == 'WFM - ACTIVATION COMPLETE'
		),
#            ~func.lower(orderNewScone.status_message).contains('cancel'),
            or_(
               orderNewScone.nama_pelanggan.is_(None),
               orderNewScone.nohp_pelanggan.is_(None),  
               orderNewScone.email_pelanggan.is_(None),
               orderNewScone.nomor_internet.is_(None)
            )
            ).all()

def get_scone_onprogress(db: Session):
    week = datetime.now().date() - timedelta(days=1)
    return db.query(orderNewScone.nomor_sc,
                    orderNewScone.nama_pelanggan,
                    orderNewScone.nohp_pelanggan,
                    orderNewScone.email_pelanggan,
		    case([(orderNewScone.nomor_internet.is_(None), orderNewScone.nd)], else_=orderNewScone.nomor_internet).label("nomor_internet"),
                    #orderNewScone.nomor_internet,
                    orderNewScone.regional,
                    orderNewScone.witel,
                    orderNewScone.tanggal_order,
                    orderNewScone.status_aktivasi,
		    case([(orderNewScone.status_wfm.is_(None), 'To Do')], else_=orderNewScone.status_wfm).label("status_wfm"),
		    orderNewScone.status_resume,
                    orderNewScone.username,
                    orderNewScone.password,
		    orderNewScone.secret_key
    ).filter(
	    or_(
		orderNewScone.status_resume.contains('PROGRESS'),
		orderNewScone.status_resume == 'OSS - PROVISIONING START',
                orderNewScone.status_resume == '10 | OSS - PROVISIONING COMPLETE',
                orderNewScone.status_resume == '7 | OSS - PROVISIONING ISSUED',
                orderNewScone.status_resume == 'OSS - TESTING SERVICE',
		orderNewScone.status_resume == 'OSS - PROVISIONING DESAIN',
		orderNewScone.status_resume == 'OSS - FALLOUT',
                orderNewScone.status_resume == 'MYCX - SEND OPEN PAPERLESS',
                orderNewScone.status_resume == 'MYCX - FAIL',
		orderNewScone.status_resume == 'WFM - ACTIVATION COMPLETE'
	       ),
            or_(
		orderNewScone.status_wfm.is_(None),
		orderNewScone.status_wfm =='To Do',
		orderNewScone.status_wfm =='On Progress',
		orderNewScone.status_wfm =='Cancel'
	       )
            ).all()

def get_user_scone(db: Session):
    last100 = datetime.now() - timedelta(hours=100)
    return db.query(orderNewScone.nomor_sc,
                    orderNewScone.nama_pelanggan,
		    orderNewScone.email_pelanggan,
		    orderNewScone.nohp_pelanggan,
                    orderNewScone.regional,
                    orderNewScone.witel,
                    orderNewScone.tanggal_aktivasi,
                    case([(orderNewScone.status_wfm.is_(None), 'To Do')], else_=orderNewScone.status_wfm).label("status_wfm"),
		    orderNewScone.tanggal_baa,
		    orderNewScone.status_resume,
		    orderNewScone.status_aktivasi,
                    orderNewScone.username,
                    orderNewScone.password,
                    orderNewScone.secret_key
    ).filter(orderNewScone.status_aktivasi == 'Activated',
            orderNewScone.secret_key.isnot(None),
            or_(
		orderNewScone.tanggal_aktivasi > last100,
#		orderNewScone.status_wfm == 'To Do',
		orderNewScone.status_wfm == 'On Progress',
		orderNewScone.status_wfm == 'Cancel',
		orderNewScone.status_resume.like('%REVOKE%'),
		func.lower(orderNewScone.status_resume).like('%cancel%')
	       )
            ).all()

def update_scone(db: Session, nomor_sc: str, nama_pelanggan: str, nohp_pelanggan: str, email_pelanggan: str, nomor_internet: str, status_aktivasi: str, status_resume: str, status_wfm: str, tanggal_baa: datetime, catatan: str):

    _orderScone = get_order_by_id(db=db, nomor_sc=nomor_sc)
    _orderScone.nama_pelanggan = nama_pelanggan
    _orderScone.nohp_pelanggan = nohp_pelanggan
    _orderScone.email_pelanggan = email_pelanggan
    _orderScone.nomor_internet = nomor_internet
    _orderScone.status_aktivasi = status_aktivasi
    _orderScone.status_resume = status_resume
    _orderScone.status_wfm = status_wfm
    _orderScone.tanggal_baa = tanggal_baa
    _orderScone.catatan = catatan

    db.commit()
    db.refresh(_orderScone)
    return _orderScone

def create_newscone_order(db: Session, order_scone: NewSconeSchema):
    status_resume = 'OSS - PROVISIONING START'
    status_aktivasi = 'Not Activated'
    status_wfm = 'To Do'
    addon = 'NETMONK'
    kategori = '01'
    time_location = 'WIB'
    _orderScone = orderNewScone(nomor_sc = order_scone.nomor_sc, 
                                nama_pelanggan = order_scone.nama_pelanggan, 
                                nohp_pelanggan = order_scone.nohp_pelanggan, 
                                email_pelanggan = order_scone.email_pelanggan,
				alamat_pelanggan = order_scone.witel, 
                                nomor_internet = order_scone.nomor_internet, 
                                regional = order_scone.regional,
                                witel = order_scone.witel, 
				kategori = kategori,
                                tanggal_order = order_scone.tanggal_order, status_resume = status_resume,
				status_aktivasi = status_aktivasi, status_wfm = status_wfm, addon = addon, time_location = time_location)
    db.add(_orderScone)
    db.commit()
    db.refresh(_orderScone)
    return _orderScone

def get_scone_by_activation(db: Session):
    last24 = datetime.now() - timedelta(hours=24)
    return db.query(orderNewScone.kategori.label('Customer Type'),
                    orderNewScone.nama_pelanggan.label('Customer Name'),
                    orderNewScone.nohp_pelanggan.label('Customer Phone'),
                    orderNewScone.email_pelanggan.label('Customer Email'),
                    orderNewScone.alamat_pelanggan.label('Customer Address'),
                    orderNewScone.nomor_internet.label('Nomor Internet'),
                    orderNewScone.nama_pelanggan.label('Device Name'),
                    orderNewScone.witel.label('Internet Location'),
                    orderNewScone.time_location.label('Time Zone'),
		    literal_column("''").label('Bandwidth Package'),
                    literal_column("''").label('Contract Start'),
                    literal_column("''").label('Contract Duration')
    ).filter(orderNewScone.status_resume == 'OSS - PROVISIONING START',
            orderNewScone.status_aktivasi == 'Not Activated',
            or_(
		orderNewScone.status_wfm.is_(None),
                orderNewScone.status_wfm == 'To Do',
                orderNewScone.status_wfm == 'On Progress'
	       ),
            orderNewScone.nama_pelanggan.isnot(None),
            orderNewScone.nomor_internet.isnot(None),
            orderNewScone.nohp_pelanggan.isnot(None),
            orderNewScone.email_pelanggan.isnot(None),
	    orderNewScone.addon.isnot(None)
            ).all()

def post_scone_by_activation(db: Session, order_scone: NewSconeSchema):
    status='Activated'
    # Perform a database query to retrieve nomor_sc based on order_scone.nomor_internet
    nomor_sc_list = (
        db.query(orderNewScone.nomor_sc)
        .filter_by(nomor_internet=order_scone.nomor_internet)
	.filter(orderNewScone.status_resume == 'OSS - PROVISIONING START', 
		orderNewScone.status_aktivasi == 'Not Activated', 
		or_(
		    orderNewScone.status_wfm.is_(None),
		    orderNewScone.status_wfm == 'To Do',
		    orderNewScone.status_wfm == 'On Progress'
		),
		orderNewScone.nama_pelanggan.isnot(None),
                orderNewScone.nomor_internet.isnot(None),
                orderNewScone.nohp_pelanggan.isnot(None),
                orderNewScone.email_pelanggan.isnot(None),
		orderNewScone.addon.isnot(None))
        .all()
    )

    if not nomor_sc_list:
        # Handle the case where nomor_sc is not found, e.g., raise an exception or return an error message
        raise Exception("Nomor_sc not found for the given nomor_internet")

    nomor_sc_values = [row.nomor_sc for row in nomor_sc_list]
    current_datetime = datetime.now().astimezone(pytz.timezone('Asia/Jakarta'))
    tanggal_aktivasi = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

    _orderScone = db.query(orderNewScone).filter(orderNewScone.nomor_sc.in_(nomor_sc_values)).first()
    _orderScone.username = order_scone.username
    _orderScone.password = order_scone.password
    _orderScone.secret_key = order_scone.secret_key
    _orderScone.status_aktivasi = status
    _orderScone.tanggal_aktivasi= tanggal_aktivasi
    db.commit()
    db.refresh(_orderScone)


def get_doa_user_scone(db: Session, start_date=None, end_date=None):
    query = db.query(orderNewScone.nomor_sc,
                     orderNewScone.regional,
                     orderNewScone.witel,
                     orderNewScone.status_aktivasi,
                     orderNewScone.status_wfm,
                     orderNewScone.status_resume,
                     orderNewScone.tanggal_order,
                     orderNewScone.tanggal_aktivasi,
                     orderNewScone.tanggal_baa
                     ).filter(orderNewScone.status_aktivasi == 'Activated')
    if start_date:
        query = query.filter(orderNewScone.tanggal_aktivasi >= start_date)
    if end_date:
        query = query.filter(orderNewScone.tanggal_aktivasi <= end_date)

    return query.all()

def get_generate_baa(db: Session, nomor_sc: str):
    return db.query(orderNewScone.nomor_sc,
                    orderNewScone.nama_pelanggan,
                    orderNewScone.nohp_pelanggan,
                    orderNewScone.email_pelanggan,
                    orderNewScone.nomor_internet,
                    orderNewScone.witel,
                    orderNewScone.status_wfm,
                    orderNewScone.username,
                    orderNewScone.password,
                    orderNewScone.secret_key,
                    orderNewScone.tanggal_aktivasi
    ).filter(orderNewScone.status_aktivasi == 'Activated'
            ).all()


def get_doa_user_scone_dev(db: Session, start_date=None, end_date=None, page: int = 1, per_page: int = 10):
    offset = (page - 1) * per_page
    query = db.query(orderNewScone.nomor_sc,
                     orderNewScone.regional,
                     orderNewScone.witel,
                     orderNewScone.status_aktivasi,
                     orderNewScone.status_wfm,
                     orderNewScone.status_resume,
                     orderNewScone.tanggal_order,
                     orderNewScone.tanggal_aktivasi,
                     orderNewScone.tanggal_baa
                     ).filter(orderNewScone.status_aktivasi == 'Activated')
    if start_date:
        query = query.filter(orderNewScone.tanggal_aktivasi >= start_date)
    if end_date:
        query = query.filter(orderNewScone.tanggal_aktivasi <= end_date)
    
    # Calculate the total count of records
    total_data = query.count()

    # Apply pagination
    query = query.offset(offset).limit(per_page)
    scone_data = query.all()

    # Calculate the total number of pages
    total_page = (total_data + per_page - 1) // per_page

    return {"data": scone_data, "total_data": total_data, "total_page": total_page}


def get_scone_onprogress_dev(db: Session, page: int = 1, per_page: int = 10, nomor_sc: str = None, regional: str = None, witel: str = None,
                         status_aktivasi: str = None, status_wfm: str = None, status_resume: str = None):
    offset = (page - 1) * per_page
    query = db.query(orderNewScone.nomor_sc,
                    orderNewScone.nama_pelanggan,
                    orderNewScone.nohp_pelanggan,
                    orderNewScone.email_pelanggan,
                    orderNewScone.nomor_internet,
                    orderNewScone.regional,
                    orderNewScone.witel,
                    orderNewScone.tanggal_order,
                    orderNewScone.status_aktivasi,
                    case([(orderNewScone.status_wfm.is_(None), 'To Do')], else_=orderNewScone.status_wfm).label("status_wfm"),
                    orderNewScone.status_resume,
                    orderNewScone.username,
                    orderNewScone.password,
                    orderNewScone.secret_key)

    # Add filters based on parameters
    if nomor_sc:
        query = query.filter(orderNewScone.nomor_sc == nomor_sc)

    if regional:
        query = query.filter(orderNewScone.regional == regional)

    if witel:
        query = query.filter(orderNewScone.witel == witel)

    if status_aktivasi:
        query = query.filter(orderNewScone.status_aktivasi == status_aktivasi)

    if status_wfm:
        query = query.filter(orderNewScone.status_wfm == status_wfm)

    if status_resume:
        query = query.filter(orderNewScone.status_aktivasi == status_aktivasi)

    scone_data = query.offset(offset).limit(per_page).all()
    total_data = query.count()
    total_page = ceil(total_data / per_page)

    return {"data": scone_data, "total_data": total_data, "total_page": total_page}
