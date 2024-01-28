from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from app.config2 import SessionLocal
#from app.config import db
from sqlalchemy.orm import Session
from app.schema import Request, Response, RequestScone, SconeSchema
from sqlalchemy.dialects.mysql import VARCHAR

import app.repository.scone as scone

router = APIRouter(
    prefix="/scone",
    tags=['Order Scone']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.get("/")
async def get_scone_order(skip: int = 0, limit: int = 99999, db: Session = Depends(get_db)):
    _scone = scone.get_scone(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_scone)

@router.get("/id/{sc_netmonk}")
async def get_scone_by_id(sc_netmonk: str, db: Session = Depends(get_db)):
    _scone = scone.get_scone_by_id(db, sc_netmonk=sc_netmonk)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.get("/bywitel")
async def get_scone_by_witel(username_witel: str, db: Session = Depends(get_db)):
    _scone = scone.get_scone_by_witel(db, username_witel)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)



@router.get("/bytreg")
async def get_scone_treg(username_treg: str, db: Session = Depends(get_db)):
    _scone = scone.get_scone_by_treg(db, username_treg)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)


@router.post("/")
async def create_scone_order(request: RequestScone, db: Session = Depends(get_db)):
    scone.create_scone_order(db, order_scone=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Order created successfully").dict(exclude_none=True)

@router.get("/au")
async def get_scone_au(skip: int = 0, limit: int = 99999, db: Session = Depends(get_db)):
    _scone = scone.get_scone_au(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_scone)

@router.get("/hi_active_users/witel")
async def get_scone_au_by_witel(username_witel: str, db: Session = Depends(get_db)):
    _scone = scone.get_scone_au_by_witel(db, username_witel)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.get("/hi_active_users/treg")
async def get_scone_au_by_treg(username_treg: str, db: Session = Depends(get_db)):
    _scone = scone.get_scone_au_by_treg(db, username_treg)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)

@router.put("/update_scone_by_au")
async def update_scone_by_au(request: RequestScone, db: Session = Depends(get_db)):
    _scone = scone.update_scone_by_au(db, sc_netmonk=request.parameter.sc_netmonk,
                             konfirmasi_pelanggan = request.parameter.konfirmasi_pelanggan, 
                             alasan = request.parameter.alasan)
    return Response(status="Ok", code="200", message="Success update data", result=_scone)
