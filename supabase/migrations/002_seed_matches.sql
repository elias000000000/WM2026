-- WM 2026 Spielplan — alle 104 Spiele
-- Im Supabase SQL Editor ausführen NACH der Migration (001_initial_schema.sql)

insert into public.matches (match_ref, home_team, away_team, kickoff_utc, status, round, matchday, venue) values

-- GRUPPE A
('GS-A1','us','pa','2026-06-11T22:00:00Z','SCHEDULED','GROUP_A',1,'MetLife Stadium, East Rutherford NJ'),
('GS-A2','al','ua','2026-06-11T19:00:00Z','SCHEDULED','GROUP_A',1,'SoFi Stadium, Los Angeles CA'),
('GS-A3','us','al','2026-06-17T22:00:00Z','SCHEDULED','GROUP_A',2,'MetLife Stadium, East Rutherford NJ'),
('GS-A4','ua','pa','2026-06-17T19:00:00Z','SCHEDULED','GROUP_A',2,'AT&T Stadium, Dallas TX'),
('GS-A5','us','ua','2026-06-25T22:00:00Z','SCHEDULED','GROUP_A',3,'Levi''s Stadium, San Francisco CA'),
('GS-A6','pa','al','2026-06-25T22:00:00Z','SCHEDULED','GROUP_A',3,'Rose Bowl, Los Angeles CA'),

-- GRUPPE B
('GS-B1','mx','jm','2026-06-12T22:00:00Z','SCHEDULED','GROUP_B',1,'Estadio Azteca, Mexiko-Stadt'),
('GS-B2','sn','uz','2026-06-12T19:00:00Z','SCHEDULED','GROUP_B',1,'AT&T Stadium, Dallas TX'),
('GS-B3','mx','sn','2026-06-18T22:00:00Z','SCHEDULED','GROUP_B',2,'Estadio Azteca, Mexiko-Stadt'),
('GS-B4','uz','jm','2026-06-18T19:00:00Z','SCHEDULED','GROUP_B',2,'NRG Stadium, Houston TX'),
('GS-B5','mx','uz','2026-06-25T19:00:00Z','SCHEDULED','GROUP_B',3,'Estadio Azteca, Mexiko-Stadt'),
('GS-B6','jm','sn','2026-06-25T19:00:00Z','SCHEDULED','GROUP_B',3,'Camping World Stadium, Orlando FL'),

-- GRUPPE C
('GS-C1','ca','cl','2026-06-13T00:00:00Z','SCHEDULED','GROUP_C',1,'BC Place, Vancouver BC'),
('GS-C2','uy','pe','2026-06-12T23:00:00Z','SCHEDULED','GROUP_C',1,'MetLife Stadium, East Rutherford NJ'),
('GS-C3','ca','uy','2026-06-19T00:00:00Z','SCHEDULED','GROUP_C',2,'BC Place, Vancouver BC'),
('GS-C4','pe','cl','2026-06-18T23:00:00Z','SCHEDULED','GROUP_C',2,'Hard Rock Stadium, Miami FL'),
('GS-C5','ca','pe','2026-06-26T22:00:00Z','SCHEDULED','GROUP_C',3,'BMO Field, Toronto ON'),
('GS-C6','cl','uy','2026-06-26T22:00:00Z','SCHEDULED','GROUP_C',3,'NRG Stadium, Houston TX'),

-- GRUPPE D
('GS-D1','ar','ec','2026-06-13T22:00:00Z','SCHEDULED','GROUP_D',1,'MetLife Stadium, East Rutherford NJ'),
('GS-D2','bo','ve','2026-06-13T19:00:00Z','SCHEDULED','GROUP_D',1,'SoFi Stadium, Los Angeles CA'),
('GS-D3','ar','bo','2026-06-19T22:00:00Z','SCHEDULED','GROUP_D',2,'Hard Rock Stadium, Miami FL'),
('GS-D4','ve','ec','2026-06-19T19:00:00Z','SCHEDULED','GROUP_D',2,'Camping World Stadium, Orlando FL'),
('GS-D5','ar','ve','2026-06-26T19:00:00Z','SCHEDULED','GROUP_D',3,'MetLife Stadium, East Rutherford NJ'),
('GS-D6','ec','bo','2026-06-26T19:00:00Z','SCHEDULED','GROUP_D',3,'AT&T Stadium, Dallas TX'),

-- GRUPPE E
('GS-E1','br','co','2026-06-14T22:00:00Z','SCHEDULED','GROUP_E',1,'SoFi Stadium, Los Angeles CA'),
('GS-E2','hn','cr','2026-06-14T19:00:00Z','SCHEDULED','GROUP_E',1,'AT&T Stadium, Dallas TX'),
('GS-E3','br','hn','2026-06-20T22:00:00Z','SCHEDULED','GROUP_E',2,'NRG Stadium, Houston TX'),
('GS-E4','cr','co','2026-06-20T19:00:00Z','SCHEDULED','GROUP_E',2,'Levi''s Stadium, San Francisco CA'),
('GS-E5','br','cr','2026-06-27T22:00:00Z','SCHEDULED','GROUP_E',3,'MetLife Stadium, East Rutherford NJ'),
('GS-E6','co','hn','2026-06-27T22:00:00Z','SCHEDULED','GROUP_E',3,'Hard Rock Stadium, Miami FL'),

-- GRUPPE F
('GS-F1','fr','hr','2026-06-14T23:00:00Z','SCHEDULED','GROUP_F',1,'MetLife Stadium, East Rutherford NJ'),
('GS-F2','at','eg','2026-06-15T02:00:00Z','SCHEDULED','GROUP_F',1,'Camping World Stadium, Orlando FL'),
('GS-F3','fr','at','2026-06-20T23:00:00Z','SCHEDULED','GROUP_F',2,'AT&T Stadium, Dallas TX'),
('GS-F4','eg','hr','2026-06-21T02:00:00Z','SCHEDULED','GROUP_F',2,'Hard Rock Stadium, Miami FL'),
('GS-F5','fr','eg','2026-06-27T19:00:00Z','SCHEDULED','GROUP_F',3,'SoFi Stadium, Los Angeles CA'),
('GS-F6','hr','at','2026-06-27T19:00:00Z','SCHEDULED','GROUP_F',3,'BC Place, Vancouver BC'),

-- GRUPPE G
('GS-G1','es','pt','2026-06-15T22:00:00Z','SCHEDULED','GROUP_G',1,'MetLife Stadium, East Rutherford NJ'),
('GS-G2','ma','ci','2026-06-15T19:00:00Z','SCHEDULED','GROUP_G',1,'NRG Stadium, Houston TX'),
('GS-G3','es','ma','2026-06-21T22:00:00Z','SCHEDULED','GROUP_G',2,'SoFi Stadium, Los Angeles CA'),
('GS-G4','ci','pt','2026-06-21T19:00:00Z','SCHEDULED','GROUP_G',2,'Levi''s Stadium, San Francisco CA'),
('GS-G5','es','ci','2026-06-28T22:00:00Z','SCHEDULED','GROUP_G',3,'Hard Rock Stadium, Miami FL'),
('GS-G6','pt','ma','2026-06-28T22:00:00Z','SCHEDULED','GROUP_G',3,'MetLife Stadium, East Rutherford NJ'),

-- GRUPPE H
('GS-H1','gb-eng','nl','2026-06-15T23:00:00Z','SCHEDULED','GROUP_H',1,'AT&T Stadium, Dallas TX'),
('GS-H2','ch','dk','2026-06-16T02:00:00Z','SCHEDULED','GROUP_H',1,'Camping World Stadium, Orlando FL'),
('GS-H3','gb-eng','ch','2026-06-21T23:00:00Z','SCHEDULED','GROUP_H',2,'MetLife Stadium, East Rutherford NJ'),
('GS-H4','dk','nl','2026-06-22T02:00:00Z','SCHEDULED','GROUP_H',2,'SoFi Stadium, Los Angeles CA'),
('GS-H5','gb-eng','dk','2026-06-28T19:00:00Z','SCHEDULED','GROUP_H',3,'NRG Stadium, Houston TX'),
('GS-H6','nl','ch','2026-06-28T19:00:00Z','SCHEDULED','GROUP_H',3,'Levi''s Stadium, San Francisco CA'),

-- GRUPPE I
('GS-I1','de','be','2026-06-16T22:00:00Z','SCHEDULED','GROUP_I',1,'MetLife Stadium, East Rutherford NJ'),
('GS-I2','rs','cz','2026-06-16T19:00:00Z','SCHEDULED','GROUP_I',1,'AT&T Stadium, Dallas TX'),
('GS-I3','de','rs','2026-06-22T22:00:00Z','SCHEDULED','GROUP_I',2,'SoFi Stadium, Los Angeles CA'),
('GS-I4','cz','be','2026-06-22T19:00:00Z','SCHEDULED','GROUP_I',2,'Hard Rock Stadium, Miami FL'),
('GS-I5','de','cz','2026-06-29T22:00:00Z','SCHEDULED','GROUP_I',3,'MetLife Stadium, East Rutherford NJ'),
('GS-I6','be','rs','2026-06-29T22:00:00Z','SCHEDULED','GROUP_I',3,'NRG Stadium, Houston TX'),

-- GRUPPE J
('GS-J1','it','pl','2026-06-16T23:00:00Z','SCHEDULED','GROUP_J',1,'Camping World Stadium, Orlando FL'),
('GS-J2','tn','cm','2026-06-17T02:00:00Z','SCHEDULED','GROUP_J',1,'BC Place, Vancouver BC'),
('GS-J3','it','tn','2026-06-22T23:00:00Z','SCHEDULED','GROUP_J',2,'AT&T Stadium, Dallas TX'),
('GS-J4','cm','pl','2026-06-23T02:00:00Z','SCHEDULED','GROUP_J',2,'Levi''s Stadium, San Francisco CA'),
('GS-J5','it','cm','2026-06-29T19:00:00Z','SCHEDULED','GROUP_J',3,'SoFi Stadium, Los Angeles CA'),
('GS-J6','pl','tn','2026-06-29T19:00:00Z','SCHEDULED','GROUP_J',3,'Hard Rock Stadium, Miami FL'),

-- GRUPPE K
('GS-K1','jp','kr','2026-06-17T22:00:00Z','SCHEDULED','GROUP_K',1,'SoFi Stadium, Los Angeles CA'),
('GS-K2','ir','sa','2026-06-17T19:00:00Z','SCHEDULED','GROUP_K',1,'Estadio Azteca, Mexiko-Stadt'),
('GS-K3','jp','ir','2026-06-23T22:00:00Z','SCHEDULED','GROUP_K',2,'AT&T Stadium, Dallas TX'),
('GS-K4','sa','kr','2026-06-23T19:00:00Z','SCHEDULED','GROUP_K',2,'Camping World Stadium, Orlando FL'),
('GS-K5','jp','sa','2026-06-30T22:00:00Z','SCHEDULED','GROUP_K',3,'BC Place, Vancouver BC'),
('GS-K6','kr','ir','2026-06-30T22:00:00Z','SCHEDULED','GROUP_K',3,'NRG Stadium, Houston TX'),

-- GRUPPE L
('GS-L1','au','nz','2026-06-17T23:00:00Z','SCHEDULED','GROUP_L',1,'AT&T Stadium, Dallas TX'),
('GS-L2','ng','gh','2026-06-18T02:00:00Z','SCHEDULED','GROUP_L',1,'Hard Rock Stadium, Miami FL'),
('GS-L3','au','ng','2026-06-23T23:00:00Z','SCHEDULED','GROUP_L',2,'MetLife Stadium, East Rutherford NJ'),
('GS-L4','gh','nz','2026-06-24T02:00:00Z','SCHEDULED','GROUP_L',2,'Levi''s Stadium, San Francisco CA'),
('GS-L5','au','gh','2026-06-30T19:00:00Z','SCHEDULED','GROUP_L',3,'SoFi Stadium, Los Angeles CA'),
('GS-L6','nz','ng','2026-06-30T19:00:00Z','SCHEDULED','GROUP_L',3,'Camping World Stadium, Orlando FL'),

-- RUNDE DER LETZTEN 32
('R32-1','TBD','TBD','2026-07-03T22:00:00Z','SCHEDULED','ROUND_OF_32',null,'MetLife Stadium, East Rutherford NJ'),
('R32-2','TBD','TBD','2026-07-03T19:00:00Z','SCHEDULED','ROUND_OF_32',null,'SoFi Stadium, Los Angeles CA'),
('R32-3','TBD','TBD','2026-07-04T22:00:00Z','SCHEDULED','ROUND_OF_32',null,'AT&T Stadium, Dallas TX'),
('R32-4','TBD','TBD','2026-07-04T19:00:00Z','SCHEDULED','ROUND_OF_32',null,'NRG Stadium, Houston TX'),
('R32-5','TBD','TBD','2026-07-04T23:00:00Z','SCHEDULED','ROUND_OF_32',null,'Hard Rock Stadium, Miami FL'),
('R32-6','TBD','TBD','2026-07-05T02:00:00Z','SCHEDULED','ROUND_OF_32',null,'Camping World Stadium, Orlando FL'),
('R32-7','TBD','TBD','2026-07-05T22:00:00Z','SCHEDULED','ROUND_OF_32',null,'Levi''s Stadium, San Francisco CA'),
('R32-8','TBD','TBD','2026-07-05T19:00:00Z','SCHEDULED','ROUND_OF_32',null,'BC Place, Vancouver BC'),
('R32-9','TBD','TBD','2026-07-05T23:00:00Z','SCHEDULED','ROUND_OF_32',null,'MetLife Stadium, East Rutherford NJ'),
('R32-10','TBD','TBD','2026-07-06T02:00:00Z','SCHEDULED','ROUND_OF_32',null,'SoFi Stadium, Los Angeles CA'),
('R32-11','TBD','TBD','2026-07-06T22:00:00Z','SCHEDULED','ROUND_OF_32',null,'AT&T Stadium, Dallas TX'),
('R32-12','TBD','TBD','2026-07-06T19:00:00Z','SCHEDULED','ROUND_OF_32',null,'NRG Stadium, Houston TX'),
('R32-13','TBD','TBD','2026-07-06T23:00:00Z','SCHEDULED','ROUND_OF_32',null,'Hard Rock Stadium, Miami FL'),
('R32-14','TBD','TBD','2026-07-07T02:00:00Z','SCHEDULED','ROUND_OF_32',null,'Camping World Stadium, Orlando FL'),
('R32-15','TBD','TBD','2026-07-07T22:00:00Z','SCHEDULED','ROUND_OF_32',null,'Estadio Azteca, Mexiko-Stadt'),
('R32-16','TBD','TBD','2026-07-07T19:00:00Z','SCHEDULED','ROUND_OF_32',null,'BMO Field, Toronto ON'),

-- ACHTELFINALE
('R16-1','TBD','TBD','2026-07-09T22:00:00Z','SCHEDULED','ROUND_OF_16',null,'MetLife Stadium, East Rutherford NJ'),
('R16-2','TBD','TBD','2026-07-09T19:00:00Z','SCHEDULED','ROUND_OF_16',null,'SoFi Stadium, Los Angeles CA'),
('R16-3','TBD','TBD','2026-07-10T22:00:00Z','SCHEDULED','ROUND_OF_16',null,'AT&T Stadium, Dallas TX'),
('R16-4','TBD','TBD','2026-07-10T19:00:00Z','SCHEDULED','ROUND_OF_16',null,'NRG Stadium, Houston TX'),
('R16-5','TBD','TBD','2026-07-11T22:00:00Z','SCHEDULED','ROUND_OF_16',null,'Hard Rock Stadium, Miami FL'),
('R16-6','TBD','TBD','2026-07-11T19:00:00Z','SCHEDULED','ROUND_OF_16',null,'Levi''s Stadium, San Francisco CA'),
('R16-7','TBD','TBD','2026-07-12T22:00:00Z','SCHEDULED','ROUND_OF_16',null,'BC Place, Vancouver BC'),
('R16-8','TBD','TBD','2026-07-12T19:00:00Z','SCHEDULED','ROUND_OF_16',null,'Camping World Stadium, Orlando FL'),

-- VIERTELFINALE
('QF-1','TBD','TBD','2026-07-14T22:00:00Z','SCHEDULED','QUARTER_FINAL',null,'MetLife Stadium, East Rutherford NJ'),
('QF-2','TBD','TBD','2026-07-14T19:00:00Z','SCHEDULED','QUARTER_FINAL',null,'SoFi Stadium, Los Angeles CA'),
('QF-3','TBD','TBD','2026-07-15T22:00:00Z','SCHEDULED','QUARTER_FINAL',null,'AT&T Stadium, Dallas TX'),
('QF-4','TBD','TBD','2026-07-15T19:00:00Z','SCHEDULED','QUARTER_FINAL',null,'NRG Stadium, Houston TX'),

-- HALBFINALE
('SF-1','TBD','TBD','2026-07-17T22:00:00Z','SCHEDULED','SEMI_FINAL',null,'MetLife Stadium, East Rutherford NJ'),
('SF-2','TBD','TBD','2026-07-18T22:00:00Z','SCHEDULED','SEMI_FINAL',null,'SoFi Stadium, Los Angeles CA'),

-- SPIEL UM PLATZ 3
('TP-1','TBD','TBD','2026-07-18T19:00:00Z','SCHEDULED','THIRD_PLACE',null,'Hard Rock Stadium, Miami FL'),

-- FINALE
('FINAL','TBD','TBD','2026-07-19T22:00:00Z','SCHEDULED','FINAL',null,'MetLife Stadium, East Rutherford NJ');
