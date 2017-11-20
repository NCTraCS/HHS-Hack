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
)

