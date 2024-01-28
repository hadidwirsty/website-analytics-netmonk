from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from app.config2 import SessionLocal
from sqlalchemy.orm import Session
from app.schema import Request, Response, RequestScone
from sqlalchemy.dialects.mysql import VARCHAR
from typing import Optional

import app.repository.scone_dev as scone_dev

router = APIRouter(
    prefix="/scone_dev",
    tags=['Order Scone Dev']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
async def get_scone_dev_order(skip: int = 0, limit: int = 99999, db: Session = Depends(get_db)):
    _devOrder = scone_dev.get_scone_dev(db, skip, limit)
    return Response(status="Ok", code="200", message="Success fetch all data", result=_devOrder)

@router.get("/byactivation")
async def get_scone_dev_by_activation(db: Session = Depends(get_db)):
    _devOrder = scone_dev.get_scone_dev_by_activation(db)
    return Response(status="Ok", code="200", message="Success fetch data", result=_devOrder)

@router.post("/post_bulk_activation")
async def post_scone_dev_by_activation(request: RequestScone, db: Session = Depends(get_db)):
    scone_dev.post_scone_dev_by_activation(db, order_scone=request.parameter)
    return Response(status="Ok",
                    code="200",
                    message="Success Add Username, Pass, SKey").dict(exclude_none=True)


@router.get("/bywitel")
async def get_scone_by_witel(username_witel: str, page: Optional[int] = 1, per_page: Optional[int] = 10, db: Session = Depends(get_db)):
    # Validate page and per_page values
    if page < 1 or per_page < 1:
        return Response(status="Bad Request", code="400", message="Invalid page or per_page parameter")

    result = scone_dev.get_scone_by_witel(db, username_witel, page, per_page)
    return Response(status="Ok", code="200", message="Success fetch data", result=result)
