create database hack;
#create user webuser and grant * on hack
use hack;
CREATE TABLE gaz_county (
  usps text,
  geoid bigint,
  state_fips varchar(2),
  county_fips varchar(3),
  ansicode bigint,
  name text,
  pop2010 bigint,
  hu2010 bigint,
  aland bigint,
  awater bigint,
  aland_sqmi double DEFAULT NULL,
  awater_sqmi double DEFAULT NULL,
  lat double DEFAULT NULL,
  lng double DEFAULT NULL,
	index(state_fips),
	index(county_fips)
) ENGINE = MyISAM

#### AFTER DATA LOAD !!!!! ###### 
alter table gaz_county add column geo_point POINT; 
update gaz_county set geo_point=Point(lat,lng) where lat is not null and lng is not null and state_fips is not null;
alter table gaz_county modify geo_point POINT NOT NULL;
create spatial index ix_spatial_gaz_county_geo_point on gaz_county(geo_point);
