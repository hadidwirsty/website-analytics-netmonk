from fastapi import HTTPException
import logging
import re
from typing import TypeVar, Optional, List, Optional, Generic

from pydantic import BaseModel, validator, Field
from pydantic.generics import GenericModel
from sqlalchemy import false
from app.model.person import role
from datetime import date, datetime


T = TypeVar('T')

# get root logger
logger = logging.getLogger(__name__)


class RegisterSchema(BaseModel):

    username: str
    email: str
    name: str
    password: str
    role: str
    # profile: str = "base64"


class LoginSchema(BaseModel):
    username: str
    password: str


class ForgotPasswordSchema(BaseModel):
    email: str
    new_password: str


class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None


class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T] = None


#CRUD system
class OrderSchema(BaseModel):
    id: Optional[str] = None
    subs_id: Optional[str] = None
    nama_customer: Optional[str] = None
    account_name: Optional[str] = None
    produk: Optional[str] = None	
    order_id: Optional[str] = None	
    crm_order_type: Optional[str] = None
    agreement_name: Optional[str] = None	
    location: Optional[str] = None
    pic_am: Optional[str] = None	
    sid: Optional[int] = None
    treg: Optional[str] = None
    witel: Optional[str] = None
    divisi: Optional[str] = None
    segment: Optional[str] = None
    durasi_berlangganan: Optional[str] = None	
    nilai_revenue: Optional[int] = None
    revenue_per_bulan: Optional[int] = None	
    order_created_date: Optional[date] = None	
    no_order_astinet: Optional[str] = None
    upload_dokumen: Optional[str] = None	
    document: Optional[bool] = None	
    activate_account: Optional[bool] = None	
    activation_date: Optional[date] = None
    input_ip: Optional[bool] = None
    link_dashboard: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    auth_netmonk_hi: Optional[str] = None
    draft_bast: Optional[str] = None
    bast_upload_date: Optional[date] = None
    status_bast: Optional[str] = None
    status_internal_netmonk_teknis: Optional[str] = None	
    status_internal_netmonk_admin: Optional[str] = None
    order_closing_date: Optional[date] = None
    order_status: Optional[str] = None
    li_milestone: Optional[str] = None
    tgl_fbc: Optional[date] = None   



    class Config:
        orm_mode = True

class Request(GenericModel, Generic[T]):
    parameter: Optional[T] = Field(...)
    
class RequestOrder(BaseModel):
    parameter: OrderSchema = Field(...)


class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]


#CRUD Add Order
class AddOrderSchema(BaseModel):
    order_id: Optional[str] = None
    nama_pelanggan: Optional[str] = None
    nomor_internet: Optional[str] = None
    nomor_hp: Optional[str] = None
    email_pelanggan: Optional[str] = None
    witel: Optional[str] = None
    pic: Optional[str] = None
    source_order: Optional[str] = None

    class Config:
        orm_mode = True

class Request(GenericModel, Generic[T]):
    parameter: Optional[T] = Field(...)
    
class RequestAddOrder(BaseModel):
    parameter: AddOrderSchema = Field(...)

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]

#CRUD Add Order
class SconeSchema(BaseModel):
    sc_netmonk: Optional[str] = None
    nomor_baa: Optional[str] = None
    nama_pelanggan: Optional[str] = None
    treg: Optional[str] = None
    witel: Optional[str] = None
    nomor_internet: Optional[str] = None
    no_hp: Optional[str] = None
    email_pelanggan: Optional[str] = None
    status_wfm: Optional[str] = None
    tanggal_aktivasi: Optional[str] = None
    short_link: Optional[str] = None
    status_kirim_email: Optional[str] = None
    notes: Optional[str] = None
    status_fulfillment: Optional[str] = None
    username_witel: Optional[str] = None
    estimasi_selesai: Optional[datetime] = None
    status_fulfillment_code: Optional[int] = None
    username_treg: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    secret_key: Optional[str] = None
    status_active_user: Optional[str] = None
    konfirmasi_pelanggan: Optional[str] = None
    alasan: Optional[str] = None

    class Config:
        orm_mode = True

class Request(GenericModel, Generic[T]):
    parameter: Optional[T] = Field(...)
    
class RequestScone(BaseModel):
    parameter: SconeSchema = Field(...)

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]

#CRUD Add Order
class NcxSchema(BaseModel):
    id: Optional[int] = None
    order_id: Optional[str] = None
    nama_customer: Optional[str] = None
    produk: Optional[str] = None
    work_order: Optional[str] = None
    produk_eksisting: Optional[str] = None
    agreement_name: Optional[str] = None
    location: Optional[str] = None
    pic_am: Optional[str] = None
    sid: Optional[int] = None
    treg: Optional[str] = None
    witel: Optional[str] = None
    divisi: Optional[str] = None
    segment: Optional[str] = None
    durasi_berlangganan: Optional[str] = None
    nilai_revenue: Optional[int] = None
    revenue_per_bulan: Optional[int] = None
    order_created_date: Optional[date] = None
    no_order_astinet: Optional[str] = None
    upload_dokumen: Optional[str] = None
    document: Optional[bool] = None
    activate_account: Optional[bool] = None
    activation_date: Optional[date] = None
    input_ip: Optional[bool] = None
    link_dashboard: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    auth_netmonk_hi: Optional[str] = None
    draft_bast: Optional[str] = None
    bast_upload_date: Optional[date] = None
    status_bast: Optional[str] = None
    status_internal_netmonk_teknis: Optional[str] = None
    status_internal_netmonk_admin: Optional[str] = None
    order_closing_date: Optional[date] = None
    notes: Optional[str] = None
    status_fulfillment: Optional[str] = None
    username_witel: Optional[str] = None
    no_hp_pic_am: Optional[str] = None
    status_fulfillment_code: Optional[int] = None
    username_treg: Optional[str] = None

    class Config:
        orm_mode = True

class Request(GenericModel, Generic[T]):
    parameter: Optional[T] = Field(...)
    
class RequestNcx(BaseModel):
    parameter: NcxSchema = Field(...)

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]

#CRUD SN ONT Schema
class SnOntSchema(BaseModel):
    sn: Optional[str] = None
    perangkat: Optional[str] = None
    branch: Optional[str] = None
    receive_date: Optional[str] = None
    first_detected: Optional[datetime] = None
    last_online: Optional[datetime] = None
    ip_olt: Optional[str] = None
    slot: Optional[int] = None
    port: Optional[int] = None
    onu_id: Optional[int] = None
    hostname_olt: Optional[str] = None
    ont_status: Optional[str] = None
    online_counter: Optional[int] = None
    user_speedy: Optional[str] = None
    nd: Optional[str] = None
    potensi: Optional[int] = None

    class Config:
        orm_mode = True

class Request(GenericModel, Generic[T]):
    parameter: Optional[T] = Field(...)
    
class RequestSnOnt(BaseModel):
    parameter: SnOntSchema = Field(...)

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]


#CRUD SCONE v2
class NewSconeSchema(BaseModel):
    nomor_sc: Optional[str] = None
    tanggal_order: Optional[datetime] = None
    regional: Optional[str] = None
    witel: Optional[str] = None
    nama_pelanggan: Optional[str] = None
    nohp_pelanggan: Optional[str] = None
    email_pelanggan: Optional[str] = None
    alamat_pelanggan: Optional[str] = None
    nomor_internet: Optional[str] = None
    ket_contact: Optional[str] = None
    status_message: Optional[str] = None
    kategori: Optional[str] = None
    channel: Optional[str] = None
    status_aktivasi: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    secret_key: Optional[str] = None
    tanggal_aktivasi: Optional[datetime] = None
    catatan: Optional[str] = None
    modified_at: Optional[str] = None
    status_wfm: Optional[str] = None
    status_resume: Optional[str] = None
    time_location: Optional[str] = None
    last_updated_date: Optional[datetime] = None
    tanggal_baa: Optional[datetime] = None
    addon: Optional[str] = None
    nd: Optional[str] = None

    class Config:
        orm_mode = True

class Request(GenericModel, Generic[T]):
    parameter: Optional[T] = Field(...)
    
class RequestNewScone(BaseModel):
    parameter: NewSconeSchema = Field(...)

class Response(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]
