from fastapi import FastAPI, HTTPException
import mariadb
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class Exoplanet(BaseModel):
    pl_name: str
    disc_year: int
    discoverymethod: str
    disc_facility: str
    id: int
class Constellation(BaseModel):
    id: int              # ID de la constelación
    id_exoplanet: int    # ID del exoplaneta relacionado
    name: str           # Nombre de la constelación
    description: str    # Descripción de la constelación
    user: str           # Usuario relacionado
    likes: int          # Número de likes

def get_db_connection():
    try:
        conn = mariadb.connect(**db_config)
        return conn
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/exoplanets", response_model=list[Exoplanet])
async def get_exoplanets(limit: int = 10):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT pl_name, disc_year, discoverymethod, disc_facility, id FROM pluton.exoplanets LIMIT ?", (limit,))
        rows = cursor.fetchall()
        return [Exoplanet(pl_name=row[0], disc_year=row[1], discoverymethod=row[2], disc_facility=row[3],id=row[4]) for row in rows]
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@app.get("/api/exoplanets_sin_repe", response_model=list[Exoplanet])
async def get_exoplanets(limit: int = 30):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Ejecuta la consulta para obtener los exoplanetas hasta el límite
        cursor.execute("SELECT pl_name, disc_year, discoverymethod, disc_facility, id FROM pluton.exoplanets LIMIT ?", (limit,))
        rows = cursor.fetchall()

        # Set para almacenar los nombres únicos de exoplanetas
        unique_names = set()

        # Lista para almacenar los exoplanetas filtrados
        filtered_exoplanets = []

        # Recorremos las filas y solo añadimos aquellos exoplanetas con nombre único
        for row in rows:
            exoplanet_name = row[0]
            if exoplanet_name not in unique_names:
                unique_names.add(exoplanet_name)
                filtered_exoplanets.append(row)

        # Retorna solo los exoplanetas con nombres únicos
        return [Exoplanet(pl_name=row[0], disc_year=row[1], discoverymethod=row[2], disc_facility=row[3], id=row[4]) for row in filtered_exoplanets]

    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()



@app.get("/api/exoplanets_name")
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
@app.get("/api/constellations")
async def get_constellations(limit: int = 10):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id_exoplanet, name, description, user, likes FROM pluton.constellations LIMIT ?", (limit,))
        rows = cursor.fetchall()
        
        # Assuming the cursor.description gives us the column names
        columns = [column[0] for column in cursor.description]
        
        return [dict(zip(columns, row)) for row in rows]  # Return the data as a list of dictionaries
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
        
@app.get("/api/all")
async def get_exoplanets_all(limit: int = 10):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM pluton.exoplanets LIMIT ?", (limit,))
        rows = cursor.fetchall()
        
        columns = [column[0] for column in cursor.description]
        
        return [dict(zip(columns, row)) for row in rows]
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
        
@app.get("/api/constellations/{id}", response_model=Constellation)
async def get_constellation(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Asegúrate de que la columna de ID de la constelación es la correcta en la tabla
        cursor.execute("SELECT id, id_exoplanet, name, description, user, likes FROM pluton.constellations WHERE id = ?", (id,))
        row = cursor.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Constellation not found")
        return Constellation(id=row[0], id_exoplanet=row[1], name=row[2], description=row[3], user=row[4], likes=row[5])
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@app.get("/api/constellations/{id}", response_model=Constellation)
async def get_constellation(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id_exoplanet, name, description, user FROM pluton.constellations WHERE id = ?", (id,))
        row = cursor.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Constellation not found")
        return Constellation(id=row[0],name=row[1], description=row[2], user=row[3])
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
# To run the app, use: `uvicorn main:app --reload`
