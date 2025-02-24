from fastapi import FastAPI
from fastapi.responses import JSONResponse
from responser import route_auth, route_questions, route_recommendations, route_states, route_study
from pydantic import BaseModel
from database import engine
import models
import uvicorn

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(route_auth.router)
app.include_router(route_questions.router)
app.include_router(route_study.router)
app.include_router(route_recommendations.router)
app.include_router(route_states.router)

@app.get("/")
async def read_root():
    return JSONResponse({"success": "true"})

@app.get("/get")
async def read_get(q: str):
    return JSONResponse({"success": q})

class TestPostItem(BaseModel):
    item: str
@app.post("/post")
async def read_post(item: TestPostItem):
    return JSONResponse({"success": item.item})

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)