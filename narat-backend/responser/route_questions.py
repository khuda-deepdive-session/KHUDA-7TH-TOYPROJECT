from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import datetime
import models
from dbmanage import get_db
from sqlalchemy.orm import Session
from uuid import uuid4
import os
from dotenv import load_dotenv

header = "/api/questions"
router = APIRouter(
    prefix = header,
    tags   = ['questions']
)

@router.get('/')
async def root(page: int, limit: int, db: Session = Depends(get_db)):
    page = int(page)
    limit = int(limit)
    data = db.query(models.QuestionDB).offset((page-1)*limit).limit(limit).all()

    return {
        "questions": data,
        "total": len(data)
    }

@router.get('/{question_id}')
async def root(question_id: int, db: Session = Depends(get_db)):
    data = db.query(models.QuestionDB).filter(models.QuestionDB.question_id == question_id).first()

    return data

