from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from app.config2 import SessionLocal
#from app.config import db
from sqlalchemy.orm import Session
from app.schema import Request, Response, NcxSchema, RequestNcx
from sqlalchemy.dialects.mysql import VARCHAR

import app.repository.ncx as ncx

router = APIRouter(
    prefix="/ncx",
    tags=['Order NCX']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
async def get_ncx_order(skip: int = 0, limit: int = 99999, db: Session = Depends(get_db)):
    _ncxOrder = ncx.get_ncx_order(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_ncxOrder)


@router.get("/bywitel")
async def get_ncx_order_by_witel(username_witel: str, db: Session = Depends(get_db)):
    _ncxOrders = ncx.get_ncx_order_by_witel(db, username_witel)
    return Response(status="Ok", code="200", message="Success fetch data", result=_ncxOrders)

@router.get("/bytreg")
async def get_ncx_order_by_treg(username_treg: str, db: Session = Depends(get_db)):
    _ncxOrders = ncx.get_ncx_order_by_treg(db, username_treg)
    return Response(status="Ok", code="200", message="Success fetch data", result=_ncxOrders)

@router.post("/")
async def create_ncx_order(request: RequestNcx, db: Session = Depends(get_db)):
    ncx.create_ncx_order(db, order_ncx=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Order created successfully").dict(exclude_none=True)
