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

header = "/api/states"
router = APIRouter(
    prefix = header,
    tags   = ['states']
)

@router.get('/')
async def root():
    return {"success": "true"}
