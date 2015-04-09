import csv

salaryTeams = [
'Anaheim',
'Boston',
'Buffalo',
'Calgary',
'Carolina',
'Chicago',
'Colorado',
'Columbus',
'Dallas',
'Detroit',
'Edmonton',
'Florida',
'Los Angeles',
'Minnesota',
'Montreal',
'Nashville',
'New Jersey',
'NY Islanders',
'NY Rangers',
'Ottawa',
'Philadelphia',
'Pittsburgh',
'San Jose',
'St Louis',
'Tampa Bay',
'Toronto',
'Vancouver',
'Washington',
'Winnipeg'
];
for teamName in salaryTeams:
	salaryDict = {}
	with open(teamName+'Salary.csv', 'rb') as csvfile:
		salaryReader = csv.reader(csvfile, delimiter=',', quotechar='"')
		first = True
		for row in salaryReader:
			if first:
				first = False
				continue
			try:
				salary = row[1].replace("$", "")
			except Exception, e:
				5
			try:
				salary = salary.replace(",", "")
			except Exception, e:
				5
			salaryDict[row[0]] = salary


	output = []
	with open('..\\Team Stats - Backup\\'+ teamName+'.csv', 'rb') as csvfile:
		statReader = csv.reader(csvfile, delimiter=',',quotechar='"')
		first = True
		for row in statReader:
			if first:
				first = False
				continue
			out = ''
			for r in row:
				out += '"' + r + '"' + ','
			try:
				out += '"' + salaryDict[row[0]] + '"'
			except Exception, e:
	 			out += '"0"'
			output.append(out)

	f = open('..\\'+ teamName+'.csv', 'w')
	f.write('Player,Cur. Team,Pos,GP,G,A,P,SAT For,SAT Agst,SAT,SAT Rel%,SAT Rel60,SAT Tied,SAT Ahead,SAT Behind,SAT Close,Salary\n')
	for value in output:
			f.write(value+'\n')
	f.close()