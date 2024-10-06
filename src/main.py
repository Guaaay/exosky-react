from fastapi import FastAPI, HTTPException
import mariadb
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
from astroquery.gaia import Gaia
import logging



app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your React app's port
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
        cursor.execute("SELECT id_exoplanet, name, description, user, likes, id FROM pluton.constellations LIMIT ?", (limit,))
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

@app.get("/api/exoplanets/{id}", response_model=Exoplanet)
async def get_exoplanet_by_id(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Ejecuta la consulta para obtener el exoplaneta por su id
        cursor.execute("SELECT pl_name, disc_year, discoverymethod, disc_facility, id FROM pluton.exoplanets WHERE id = ?", (id,))
        row = cursor.fetchone()

        # Verifica si se encontró el exoplaneta
        if row is None:
            raise HTTPException(status_code=404, detail="Exoplanet not found")

        # Retorna el exoplaneta encontrado
        return Exoplanet(pl_name=row[0], disc_year=row[1], discoverymethod=row[2], disc_facility=row[3], id=row[4])

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


@app.get("/api/constellations/{name}", response_model=Constellation)
async def get_constellation(name: str):  # Cambia 'id' a 'name'
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Asegúrate de seleccionar todos los campos que necesitas
        cursor.execute("SELECT id, id_exoplanet, name, description, user, likes FROM pluton.constellations WHERE name = ?", (name,))
        row = cursor.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Constellation not found")
        # Crea el objeto Constellation usando los datos obtenidos
        return Constellation(id=row[0], id_exoplanet=row[1], name=row[2], description=row[3], user=row[4], likes=row[5])
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
# To run the app, use: `uvicorn main:app --reload`





# Suppress INFO log messages from astroquery
logging.getLogger('astroquery').setLevel(logging.WARNING)

Gaia.MAIN_GAIA_TABLE = "gaiadr3.gaia_source"  # Data Release 3, default

def celestial_to_cartesian(ra, dec, distance):
    """Convert celestial coordinates (RA, Dec) to Cartesian coordinates (x, y, z)."""
    ra_rad = np.radians(ra)
    dec_rad = np.radians(dec)
    x = distance * np.cos(dec_rad) * np.cos(ra_rad)
    y = distance * np.cos(dec_rad) * np.sin(ra_rad)
    z = distance * np.sin(dec_rad)
    return x, y, z

def planar_projection(df):
    """
    Create a planar projection of celestial points onto the plane z = R.
    
    Parameters:
    - df (pd.DataFrame): DataFrame containing celestial coordinates and distances.
    
    Returns:
    - pd.DataFrame: DataFrame containing the projected coordinates (x_projected, y_projected).
    """
    # Maximum distance from the reference point (the first entry)
    R = df['distance'].max()
    
    # Create new DataFrame for projected points using original coordinates
    df_projection = pd.DataFrame()
    
    # Perform projection for each point
    df_projection['x_projected'] = df['x'] * (R / df['z'])
    df_projection['y_projected'] = df['y'] * (R / df['z'])
    
    return df_projection

def recalculate_star_positions(planet_ra, planet_dec, star_catalog_df, normalization):
    """
    Adjust star positions relative to the exoplanet's coordinates and recalculate brightness.
    
    Parameters:
    - planet_ra (float): Exoplanet's right ascension in degrees.
    - planet_dec (float): Exoplanet's declination in degrees.
    - star_catalog_df (pd.DataFrame): DataFrame of star catalog with RA, Dec, and magnitude.
    
    Returns:
    - pd.DataFrame: DataFrame with recalculated x, y positions and brightness.
    """
    # Assume the exoplanet is at infinite distance (i.e., it's the reference point)
    exo_x, exo_y, exo_z = celestial_to_cartesian(planet_ra, planet_dec, 1e12)

    # Convert stars' celestial coordinates to Cartesian
    star_catalog_df[['x', 'y', 'z']] = star_catalog_df.apply(
        lambda row: celestial_to_cartesian(row['ra'], row['dec'], row['distance']),
        axis=1,
        result_type='expand'
    )

    # Shift stars' positions to be relative to the exoplanet
    star_catalog_df['x_relative'] = star_catalog_df['x'] - exo_x
    star_catalog_df['y_relative'] = star_catalog_df['y'] - exo_y
    star_catalog_df['z_relative'] = star_catalog_df['z'] - exo_z

    # Project the stars onto the z = R plane
    df_projection = planar_projection(star_catalog_df)
    
    # Calculate the modulus (distance in the x-y plane) for each projected point
    df_projection['modulus'] = np.sqrt(
        df_projection['x_projected']**2 + 
        df_projection['y_projected']**2
    )

    # Find normalization value for scaling
    normalization_value = df_projection['modulus'].mean()

    # Normalize the x and y coordinates
    df_projection['x_normalized'] = df_projection['x_projected'] / normalization_value * normalization
    df_projection['y_normalized'] = df_projection['y_projected'] / normalization_value * normalization

    # Select reference star (e.g., the first in the DataFrame) for brightness calculation
    reference_magnitude = star_catalog_df.iloc[0]['phot_g_mean_mag']
    
    # Calculate relative brightness
    star_catalog_df['relative_brightness'] = 10**(0.4 * (reference_magnitude - star_catalog_df['phot_g_mean_mag']))

    # Normalize brightness between 0 and 1
    min_brightness = star_catalog_df['relative_brightness'].min()
    max_brightness = star_catalog_df['relative_brightness'].max()
    star_catalog_df['relative_brightness_normalized'] = (
        (star_catalog_df['relative_brightness'] - min_brightness) / (max_brightness - min_brightness)
    )
    print(star_catalog_df.columns)
    # Merge brightness back with projected positions
    df_projection['relative_brightness'] = star_catalog_df['relative_brightness_normalized'].values
    df_projection['source_id'] = star_catalog_df['SOURCE_ID'].values  # Add the star's ID
    
    return df_projection

@app.get("/api/star_positions/")
async def get_stars(planet_ra: float, planet_dec: float, normalization: float, limit: int = 1000):
    """
    Retrieve star positions and brightness relative to a given exoplanet's position.
    
    Parameters:
    - planet_ra (float): Exoplanet's right ascension in degrees.
    - planet_dec (float): Exoplanet's declination in degrees.
    - limit (int): The maximum number of stars to retrieve.
    
    Returns:
    - dict: A dictionary where keys are source_ids and values are lists [x_normalized, y_normalized, relative_brightness].
    """

    # Set Pandas to display all rows and columns
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_columns', None)

    # Define additional columns to select from Gaia, including source_id for star identification
    columns_to_select = ["source_id", "ra", "dec", "phot_g_mean_mag", "parallax", "pmra", "pmdec"]
    columns_string = ", ".join(columns_to_select)

    # Query Gaia database
    query = f"""
    SELECT {columns_string} FROM gaiadr3.gaia_source_lite
    WHERE has_xp_sampled = 'True'
    AND random_index BETWEEN 0 AND 200000
    """  

    # Launch the async job
    job = Gaia.launch_job_async(query)
    results = job.get_results()

    # Convert results to a Pandas DataFrame
    df = results.to_pandas()

    # Calculate distance from parallax (in parsecs)
    df["distance"] = 1000 / df["parallax"]

    # Filter to keep only visible stars
    df = df[df['distance'] > 0].head(limit)

    # Recalculate star positions and brightness based on the exoplanet's location
    star_data = recalculate_star_positions(planet_ra, planet_dec, df, normalization)
    print(star_data.columns)
    # Convert to the required dictionary format: {star_id: [x_normalized, y_normalized, relative_brightness]}
    star_data_dict = star_data.set_index('source_id')[['x_normalized', 'y_normalized', 'relative_brightness']].T.to_dict(orient='list')

    return star_data_dict

