from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from app.config2 import SessionLocal
from sqlalchemy.orm import Session
from app.schema import Request, Response, RequestNewScone
from sqlalchemy.dialects.mysql import VARCHAR
from typing import Optional

import app.repository.newscone as newscone

router = APIRouter(
    prefix="/eksternal",
    tags=['Eksternal Netmonk']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/doa/user_scone")
async def get_doa_user_scone(start_date:str, end_date: str, db: Session = Depends(get_db)):
    _scone = newscone.get_doa_user_scone(db, start_date, end_date)
    return Response(status="Ok", code="200", message="Success fetch data", result=_scone)


@router.get("/doa/user_scone_dev")
async def get_doa_user_scone_dev(
    start_date: str,
    end_date: str,
    page: Optional[int] = 1,
    per_page: Optional[int] = 10,
    db: Session = Depends(get_db)
):
    # Validate page and per_page values
    if page < 1 or per_page < 1:
        return Response(status="Bad Request", code="400", message="Invalid page or per_page parameter")

    result = newscone.get_doa_user_scone_dev(db, start_date, end_date, page, per_page)
    return Response(status="Ok", code="200", message="Success fetch data", result=result)
