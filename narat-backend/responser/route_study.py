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

header = "/api/study"
router = APIRouter(
    prefix = header,
    tags   = ['study']
)

@router.get('/')
async def root():
    return {"success": "true"}

class StudySubmitForm(BaseModel):
    session_token: str
    question_id: int
    correct: bool

@router.post('/submit')
async def submit(item: StudySubmitForm, db: Session = Depends(get_db)):
    data_session = db.query(models.SessionDB).filter(models.SessionDB.session_token == item.session_token).first()
    if data_session is None:
        raise HTTPException(status_code=403, detail="User not found")   

    data_problem = db.query(models.QuestionDB).filter(models.QuestionDB.question_id == item.question_id).first()
    if data_problem is None:
        raise HTTPException(status_code=404, detail="Question not found")

    data = models.UserLogDB(google_id=data_session.google_id, question_id=item.question_id, correct=item.correct)
    db.add(data)
    db.commit()

    return JSONResponse({"success": "true", "explanation": data_problem.explanation})

class StudyHistoryForm(BaseModel):
    session_token: str
    limit: int

@router.post('/history')
async def history(item: StudyHistoryForm, db: Session = Depends(get_db)):
    data_session = db.query(models.SessionDB).filter(models.SessionDB.session_token == item.session_token).first()
    if data_session is None:
        raise HTTPException(status_code=403, detail="User not found")   

    data = db.query(models.UserLogDB).filter(models.UserLogDB.google_id == data_session.google_id).order_by(models.UserLogDB.timestamp.desc()).limit(item.limit).all()
    log_data_result = []
    for row in data:
        data_problem = db.query(models.QuestionDB).filter(models.QuestionDB.question_id == row.question_id).first()
        log_data_result.append({
            "item": {
                "question_id": row.question_id,
                "correct": row.correct,
                "explanation": data_problem.explanation
            }
        })
    
    return JSONResponse({"history": log_data_result})