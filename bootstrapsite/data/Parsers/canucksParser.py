import re

file = open("..\canucks.csv", "r+")
lines = file.readlines()
file.close()

firstLine = True

mappings = {
				'ANA': 'Anaheim',
				'ATL': 'Atlanta',
				'BOS': 'Boston',
				'BUF': 'Buffalo',
				'CAR': 'Carolina',
				'CBJ': 'Columbus',
				'CGY': 'Calgary',
				'CHI': 'Chicago',
				'COL': 'Colorado',
				'DAL': 'Dallas',
				'DET': 'Detroit',
				'EDM': 'Edmonton',
				'FLA': 'Florida',
				'LA' : 'Los Angeles',
				'MIN': 'Minnesota',
				'MTL': 'Montreal',
				'NAS': 'Nashville',
				'NJ' : 'New Jersey',
				'NYI': 'New York Islanders',
				'NYR': 'New York Rangers',
				'OTT': 'Ottawa',
				'PHI': 'Philadelphia',
				'PHX': 'Phoenix',
				'PIT': 'Pittsburgh',
				'SJ' : 'San Jose',
				'STL': 'St. Louis',
				'TB' : 'Tampa Bay',
				'TOR': 'Toronto',
				'VAN': 'Vancouver',
				'WPG': 'Winnipeg',
				'WSH':'Washington'
			}


for line in lines:
	if firstLine:
		firstLine = False
		continue
	line = line.strip()
	#                 1-Player   2-Cur.Team    3-Pos       4-GP            5-G            6-A             7-P        8-SAT For       9-SAT Agst      10-SAT       11-Rel%       12-SAT Rel60   13-SAT Tied  14-SAT Ahead     15-SAT Behind   16-SAT Close
	#line = re.sub(r'"([A-z\s]+)","([A-z]+)","([A-z]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)".*', r'\1,\2,\3,\4,\5,\6,\7,\8,\9,\10,\11,\12,\13,\14,\15,\16',line)
	line = re.sub(r'"([A-z\s]+)","([A-z]+)","([A-z]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)","([0-9\-\.]+)".*', r'\1,\16',line)
	print line