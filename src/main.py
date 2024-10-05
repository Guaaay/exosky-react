from fastapi import FastAPI, HTTPException
import mariadb
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Adjust this based on your React app's port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_config = {
    "host": "localhost",
    "user": "pluton",
    "password": "pluton",
    "database": "pluton"
}

def get_db_connection():
    try:
        conn = mariadb.connect(**db_config)
        return conn
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/exoplanets")
async def get_exoplanets(limit: int = 10):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT pl_name FROM pluton.exoplanets LIMIT ?", (limit,))
        rows = cursor.fetchall()
        return [{"name": row[0]} for row in rows]
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@app.get("/api/tables")
async def get_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        # Return a list of table names
        return [{"table": row[0]} for row in tables]
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
# To run the app, use: `uvicorn main:app --reload`
