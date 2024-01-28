from sqlalchemy.orm import Session
from sqlalchemy import literal_column
from app.model.scone_dev import orderSconeDev
from app.schema import SconeSchema
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError

from sqlalchemy.dialects.mysql import VARCHAR


def get_scone_dev(db: Session, skip: int = 0, limit: int = 99999):
    return db.query(orderSconeDev).offset(skip).limit(limit).all()


def get_scone_dev_by_activation(db: Session):
    return db.query(literal_column("'Business'").label('Customer Type'),
                    orderSconeDev.nama_pelanggan.label('Customer Name'),
                    orderSconeDev.no_hp.label('Customer Phone'),
                    orderSconeDev.email_pelanggan.label('Customer Email'),
                    orderSconeDev.witel.label('Customer Address'),
                    orderSconeDev.nomor_internet.label('Nomor Internet'),
                    orderSconeDev.nama_pelanggan.label('Device Name'),
                    orderSconeDev.nama_pelanggan.label('Internet Location'),
                    literal_column("'WIB'").label('Time Zone'),
		    literal_column("''").label('Bandwidth Package'),
                    literal_column("''").label('Contract Start'),
                    literal_column("''").label('Contract Duration')
    ).filter(orderSconeDev.short_link.is_(None),
            orderSconeDev.witel.isnot(None),
            orderSconeDev.nama_pelanggan.isnot(None),
            orderSconeDev.no_hp.isnot(None),
            orderSconeDev.email_pelanggan.isnot(None)).all()

def post_scone_dev_by_aactivation(db: Session, order_scone: SconeSchema):
    status='Done'
    # Perform a database query to retrieve nomor_sc based on order_scone.nomor_internet
    nomor_sc = db.query(orderSconeDev.sc_netmonk).filter_by(nomor_internet=order_scone.nomor_internet).scalar()

    if nomor_sc is None:
        # Handle the case where nomor_sc is not found, e.g., raise an exception or return an error message
        raise Exception("Nomor_sc not found for the given nomor_internet")
        
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    encrypted_password = pwd_context.hash(order_scone.password)
    encrypted_secret_key = pwd_context.hash(order_scone.secret_key)

    _orderScone = orderSconeDev(sc_netmonk=nomor_sc, nomor_internet=order_scone.nomor_internet, nama_pelanggan=order_scone.nama_pelanggan,
                              email_pelanggan=order_scone.email_pelanggan, username=order_scone.username,
                              password=encrypted_password, secret_key=encrypted_secret_key, status_kirim_email=status)
    db.add(_orderScone)
    db.commit()
    db.refresh(_orderScone)

    return _orderScone

def post_scone_dev_by_activaation(db: Session, order_scone: SconeSchema):
    status='Done'
    # Perform a database query to retrieve nomor_sc based on order_scone.nomor_internet
    nomor_sc = db.query(orderSconeDev.sc_netmonk).filter_by(nomor_internet=order_scone.nomor_internet).scalar()

    if nomor_sc is None:
        # Handle the case where nomor_sc is not found, e.g., raise an exception or return an error message
        raise Exception("Nomor_sc not found for the given nomor_internet")
        
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    encrypted_password = pwd_context.hash(order_scone.password)
    encrypted_secret_key = pwd_context.hash(order_scone.secret_key)

    try:
        _orderScone = orderSconeDev(sc_netmonk=nomor_sc, nomor_internet=order_scone.nomor_internet, nama_pelanggan=order_scone.nama_pelanggan,
                                email_pelanggan=order_scone.email_pelanggan, username=order_scone.username,
                                password=encrypted_password, secret_key=encrypted_secret_key, status_kirim_email=status)
        db.add(_orderScone)
        db.commit()
        db.refresh(_orderScone)

    except IntegrityError as e:
        # Handle the conflict, update the existing row
        existing_row = db.query(orderSconeDev).filter_by(sc_netmonk=nomor_sc).first()
        existing_row.nomor_internet = order_scone.nomor_internet
        existing_row.nama_pelanggan = order_scone.nama_pelanggan
        existing_row.email_pelanggan = order_scone.email_pelanggan
        existing_row.username = order_scone.username
        existing_row.password = encrypted_password
        existing_row.secret_key = encrypted_secret_key
        existing_row.status_kirim_email = status
        db.commit()


    return _orderScone


def post_scone_dev_by_activation(db: Session, order_scone: SconeSchema):
    status='Done'
    # Perform a database query to retrieve nomor_sc based on order_scone.nomor_internet
    nomor_sc = db.query(orderSconeDev.sc_netmonk).filter_by(nomor_internet=order_scone.nomor_internet).scalar()

    if nomor_sc is None:
        # Handle the case where nomor_sc is not found, e.g., raise an exception or return an error message
        raise Exception("Nomor_sc not found for the given nomor_internet")
    
    _orderScone = db.query(orderSconeDev).filter_by(sc_netmonk=nomor_sc).first()
    #_orderScone.nomor_internet = order_scone.nomor_internet
    #_orderScone.nama_pelanggan = order_scone.nama_pelanggan
    #_orderScone.email_pelanggan = order_scone.email_pelanggan
    _orderScone.username = order_scone.username
    _orderScone.password = order_scone.password
    _orderScone.secret_key = order_scone.secret_key
    _orderScone.status_kirim_email = status
    db.commit()
    db.refresh(_orderScone)


def get_scone_by_witel(db: Session, username_witel: str, page: int = 1, per_page: int = 10):
    # Calculate the offset based on the page number and number of rows per page
    offset = (page - 1) * per_page
    
    # Use offset and limit to implement pagination
    scone_data = db.query(orderSconeDev).filter(orderSconeDev.username_witel == username_witel).offset(offset).limit(per_page).all()
    
    # Get the total count of records for the given filter
    total_data = db.query(orderSconeDev).filter(orderSconeDev.username_witel == username_witel).count()

    return {"data": scone_data, "total_data": total_data}
