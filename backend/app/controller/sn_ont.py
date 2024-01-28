from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from app.config2 import SessionLocal
from sqlalchemy.orm import Session
from app.schema import Request, Response
from sqlalchemy.dialects.mysql import VARCHAR

import app.repository.sn_ont as snont

router = APIRouter(
    prefix="/sn_ont",
    tags=['SN ONT']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#@router.get("/")
#async def get_data_snont(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
 #   _snOnt = snont.get_data_snont(db, skip, limit)
  #  return Response(status="Ok", code="200", message="Success fetch all data", result=_snOnt)

@router.get("/cabut")
async def get_snont_cabut(db: Session = Depends(get_db)):
    _snOnt = snont.get_snont_cabut(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_snOnt)

@router.get("/gangguan")
async def get_snont_gangguan(db: Session = Depends(get_db)):
    _snOnt = snont.get_snont_gangguan(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_snOnt)

@router.get("/instalasi")
async def get_snont_instalasi(status_instalasi: str, db: Session = Depends(get_db)):
    _snOnt = snont.get_snont_instalasi(db, status_instalasi)
    return Response(status="Ok", code="200", message="Success fetch data", result=_snOnt)
