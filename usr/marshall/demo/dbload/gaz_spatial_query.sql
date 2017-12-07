SELECT
	state_fips,
    county_fips,
    name,
    lat,
    lng,
    X(geo_point), 
    Y(geo_point), 
    distance 
  FROM ( 
         SELECT 
			state_fips,
            county_fips,
            name,
            lat,
            lng,
            geo_point,
            r, 
            units * DEGREES( ACOS( COS(RADIANS(latpoint)) * 
                                       COS(RADIANS(X(geo_point))) * 
                                       COS(RADIANS(longpoint) - RADIANS(Y(geo_point))) + 
                                       SIN(RADIANS(latpoint)) * 
                                       SIN(RADIANS(X(geo_point))))) AS distance 
           FROM gaz_county
           JOIN ( 
                  SELECT 35.91 AS latpoint, -79.05 AS longpoint, 
                         100.0 AS r, 69.0 AS units 
                ) AS p ON (1=1) 
          WHERE MbrContains(GeomFromText( 
                        CONCAT('LINESTRING(', latpoint-(r/units),' ',
                                              longpoint-(r /(units* COS(RADIANS(latpoint)))), 
                                              ',', 
                                              latpoint+(r/units) ,' ', 
                                              longpoint+(r /(units * COS(RADIANS(latpoint)))), ')')),
                        geo_point) 
       ) AS d 
 WHERE distance <= r 
 ORDER BY distance