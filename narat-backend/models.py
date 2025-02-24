from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

# database.py에서 생성한 Base import
from database import Base


class UserDB(Base):
    __tablename__ = "users"

    google_id    = Column(String, primary_key=True, index=True)
    email        = Column(String, index=True)
    display_name = Column(String, index=True)
    created_at   = Column(DateTime(timezone=True), server_default=func.now())
    last_login   = Column(DateTime(timezone=True), server_default=func.now())
    study_level  = Column(Integer, default=1)
    
    rec_items     = relationship("RecommendationsDB", back_populates="rec_owner")
    session_items = relationship("SessionDB", back_populates="session_owner")
    log_items     = relationship("UserLogDB", back_populates="log_owner")


class RecommendationsDB(Base):
    __tablename__ = "recommendations"

    rec_id     = Column(String, primary_key=True, index=True)
    google_id  = Column(String, ForeignKey("users.google_id"))
    rec_status = Column(Boolean, default=False)
    rec_type   = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    rec_owner = relationship("UserDB", back_populates="rec_items")
    rec_question_owner = relationship("RecommendationQuestionsDB", back_populates="rec_question_items")

class RecommendationQuestionsDB(Base):
    __tablename__ = "recommendationquestions"

    index       = Column(Integer, primary_key=True, index=True, autoincrement=True)
    rec_id      = Column(String, ForeignKey("recommendations.rec_id"))
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    order       = Column(Integer, index=True)

    rec_question_items = relationship("RecommendationsDB", back_populates="rec_question_owner")
    rec_qid_items      = relationship("QuestionDB", back_populates="rec_qid_owner")

class SessionDB(Base):
    __tablename__ = "sessions"

    session_id = Column(String, primary_key=True, index=True)
    google_id  = Column(String, ForeignKey("users.google_id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session_owner = relationship("UserDB", back_populates="session_items")

class QuestionDB(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)
    question    = Column(String, index=True)
    wrong_ans   = Column(String, index=True)
    correct_ans = Column(String, index=True)
    explanation = Column(String)

    rec_qid_owner   = relationship("RecommendationQuestionsDB", back_populates="rec_qid_items")
    log_question_id = relationship("UserLogDB", back_populates="log_qid_owner")

class UserLogDB(Base):
    __tablename__ = "userlogs"

    log_id      = Column(Integer, primary_key=True, index=True)
    google_id   = Column(String, ForeignKey("users.google_id"))
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    correct     = Column(Boolean)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    log_owner = relationship("UserDB", back_populates="log_items")
    log_qid_owner = relationship("QuestionDB", back_populates="log_question_id")