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
import requests

header = "/api/recommendations"
router = APIRouter(
    prefix = header,
    tags   = ['recommendations']
)

load_dotenv()
GET_URL = os.environ.get("GET_URL")

class RecommendationsForm(BaseModel):
    session_token: str

@router.post('/')
async def root(item: RecommendationsForm, db: Session = Depends(get_db)):
    data_session = db.query(models.SessionDB).filter(models.SessionDB.session_token == item.session_token).first()
    if data_session is None:
        raise HTTPException(status_code=403, detail="User not found")   
    
    log_data = db.query(models.LogDB).filter(models.LogDB.google_id == data_session.google_id).all()
    if len(log_data) < 30:
        rec_type = 1 # less than 30
    else:
        rec_type = 2 # more than 30

    data = models.RecommendationsDB(rec_id=uuid4(), google_id=data_session.google_id, rec_type=rec_type)

    db.add(data)
    db.commit()

    return JSONResponse({"rec_id": data.rec_id})

class RecommendationsSuccessForm(BaseModel):
    rec_id: str

@router.post('/success')
async def root(item: RecommendationsSuccessForm, db: Session = Depends(get_db)):
    data = db.query(models.RecommendationsDB).filter(models.RecommendationsDB.rec_id == item.rec_id).first()
    if data is None:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    if data.success:
        raise HTTPException(status_code=400, detail="Recommendation already completed")
    
    data.success = True
    db.commit()

    log_data = db.query(models.LogDB).filter(models.LogDB.google_id == data.google_id).all()
    log_data_query = []

    if data.rec_type == 1:
        for row in log_data:
            log_data_query.append({
                "item_id": row.question_id,
                "rating":  (0 if row.correct else 1),
            })
        data_questions = requests.post(f"{GET_URL}/api/recommendation/initial", json={"items": log_data_query})

    else:
        for row in log_data:
            log_data_query.append({
                "user_id": row.google_id,
                "item_id": row.question_id,
                "rating":  (0 if row.correct else 1),
                "timestamp": row.delay
            })
        data_questions = requests.post(f"{GET_URL}/api/recommendation/subsequent", json={"items": log_data_query})
    
    jsondata = data_questions.json()
    if jsondata['status'] != "success":
        raise HTTPException(status_code=500, detail="Recommendation AI error")
    
    result_data = []
    for row in jsondata['recommended_items']:
        result_data.append({
            "question_id": row
        })

    return JSONResponse({"success": True,
                         "recommendation": result_data})