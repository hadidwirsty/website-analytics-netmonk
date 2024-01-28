from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from app.config2 import SessionLocal
from sqlalchemy.orm import Session
from app.schema import Request, Response, RequestNewScone
from sqlalchemy.dialects.mysql import VARCHAR
from typing import Optional

import app.repository.newscone as newscone

router = APIRouter(
    prefix="/newscone",
    tags=['Order Scone v2']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/id/{nomor_sc}")
async def get_scone_by_id(nomor_sc: str, db: Session = Depends(get_db)):
    _scone = newscone.get_scone_by_id(db, nomor_sc=nomor_sc)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.get("/")
async def get_scone(db: Session = Depends(get_db)):
    _scone = newscone.get_scone(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.get("/onprogress")
async def get_scone_onprogress(db: Session = Depends(get_db)):
    _scone = newscone.get_scone_onprogress(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.get("/user")
async def get_user_scone(db: Session = Depends(get_db)):
    _scone = newscone.get_user_scone(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.put("/update_scone")
async def update_scone(request: RequestNewScone, db: Session = Depends(get_db)):
    _scone = newscone.update_scone(db, nomor_sc=request.parameter.nomor_sc,
                             nama_pelanggan = request.parameter.nama_pelanggan, 
                             nohp_pelanggan = request.parameter.nohp_pelanggan,
                             email_pelanggan = request.parameter.email_pelanggan,
                             nomor_internet = request.parameter.nomor_internet,
			     status_aktivasi = request.parameter.status_aktivasi,
			     status_resume = request.parameter.status_resume,
                             status_wfm = request.parameter.status_wfm,
			     tanggal_baa = request.parameter.tanggal_baa,
                             catatan = request.parameter.catatan)
    return Response(status="Ok", code="200", message="Success update data", result=_scone)

@router.post("/")
async def create_newscone_order(request: RequestNewScone, db: Session = Depends(get_db)):
    newscone.create_newscone_order(db, order_scone=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Order created successfully").dict(exclude_none=True)

@router.get("/byactivation")
async def get_scone_by_activation(db: Session = Depends(get_db)):
    _Order = newscone.get_scone_by_activation(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_Order)

@router.post("/post_bulk_activation")
async def post_scone_by_activation(request: RequestNewScone, db: Session = Depends(get_db)):
    newscone.post_scone_by_activation(db, order_scone=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Success Add Username, Pass, SKey").dict(exclude_none=True)

@router.get("/onprogress/dev")
async def get_scone_onprogress_dev(
    page: Optional[int] = 1,
    per_page: Optional[int] = 10,
    nomor_sc: Optional[str] = None,
    regional: Optional[str] = None,
    witel: Optional[str] = None,
    status_aktivasi: Optional[str] = None,
    status_wfm: Optional[str] = None,
    status_resume: Optional[str] = None,
    db: Session = Depends(get_db)
):
    # Validate page and per_page values
    if page < 1 or per_page < 1:
        return Response(status="Bad Request", code="400", message="Invalid page or per_page parameter")
        #return Response(status_code=400, content={"message": "Invalid page or per_page parameter"})

    result = newscone.get_scone_onprogress_dev(db, page, per_page, nomor_sc, regional, witel, status_aktivasi, status_wfm, status_resume)

    # You can customize the response status and message based on your requirements
    return Response(status="Ok", code="200", message="Success fetch data", result=result)
#    return Response(status_code=200, content={"code": "200", "message": "Success fetch data", "result": result})
