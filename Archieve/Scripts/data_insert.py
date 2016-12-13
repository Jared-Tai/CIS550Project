def read_in_data():
	#read in
	stream = open("BigTable.dat", "r")
	lines = stream.readlines()
	stream.close()

	#get header
	header = lines[0]
	header = header.strip("\n").split("\t")
	n = len(header)
	print(header)

	#generating
	line_number = len(lines)
	i = 1
	data = []
	while(i < line_number):
		current_line = lines[i].strip("\n").split("\t")
		item = {}
		for j in range(0, n):
			if header[j] == "Athlete":
				current_line[j] = current_line[j].replace("\'","\'\'")
			item[header[j]] = current_line[j].strip()
			
		data.append(item)
		i += 1

	return data

def insert_Athlete_Belong_To(database):
	stream = open("insert_Athlete_Belong_To.sql", "w")
	for item in database:
		stream.write("INSERT INTO Athlete_Belong_To(IOC, AName, Gender) VALUES (\'"+item["NOC"]+"\', \'"\
			+item["Athlete"]+"\', \'"+item["Gender"]+"\');\n")
	stream.close()

def insert_Event(database):
	stream = open("insert_Event.sql", "w")
	for item in database:
		stream.write("INSERT INTO Event(Ename, Dname) VALUES (\'"+item["Event"]+"\', \'"\
			+item["Discipline"]+"\');\n")
	stream.close()

def insert_Discipline(database):
	stream = open("insert_Discipline.sql", "w")
	for item in database:
		stream.write("INSERT INTO Discipline(DName, Sports) VALUES (\'"+item["Discipline"]+"\', \'"\
			+item["Sport"]+"\');\n")
	stream.close()

def insert_Attend(database):
	stream = open("insert_Attend.sql", "w")
	for item in database:
		stream.write("INSERT INTO Attend(AName, Gender, EName, DName, Edition, Medal, IOC, Record) VALUES (\'"\
			+item["Athlete"]+"\', \'"\
			+item["Gender"]+"\', \'"\
			+item["Event"]+"\', \'"\
			+item["Discipline"]+"\', "\
			+item["Edition"]+", \'"\
			+item["Medal"]+"\', \'"\
			+item["NOC"]+"\', \'0\');\n")
	stream.close()

def insert_Olympic_Game(database):
	stream = open("insert_Olympic_Game.sql", "w")
	for item in database:
		stream.write("INSERT INTO Olympic_Game(Edition, City) VALUES ("\
			+item["Edition"]+", \'"\
			+item["City"]+"\');\n")
	stream.close()

def insert_Event_Of(database):
	stream = open("insert_Event_Of.sql", "w")
	for item in database:
		stream.write("INSERT INTO Event_Of(EName, DName, Edition) VALUES (\'"\
			+item["Event"]+"\', \'"\
			+item["Discipline"]+"\', "\
			+item["Edition"]+");\n")
	stream.close()

def distinct(name):
	stream = open(name+".sql", "r")
	lines = stream.readlines()
	stream.close()

	new_lines = set()
	for line in lines:
		new_lines.add(line)

	stream = open(name+".sql", "w")
	for line in new_lines:
		stream.write(line)
	stream.close()

def add_nation(database):
	stream = open("Nations.dat", "r")
	lines = stream.readlines()
	stream.close()

	nations = set()
	for item in database:
		nations.add(item["NOC"])

	IOC = set()
	for line in lines:
		current_line = line.strip("\n").split("\t")
		IOC.add(current_line[1])

	for i in nations:
		if i not in IOC:
			print("INSERT INTO Nation VALUE (\'"+i+"\', \'\', \'-\');")

def main():
	database = read_in_data()
	print(database[0]["Athlete"])

	insert_Athlete_Belong_To(database)
	distinct("insert_Athlete_Belong_To")
	print("insert_Athlete_Belong_To")
	insert_Event(database)
	distinct("insert_Event")
	print("insert_Event")
	insert_Discipline(database)
	distinct("insert_Discipline")
	print("insert_Discipline")
	insert_Attend(database)
	distinct("insert_Attend")
	print("insert_Attend")
	insert_Olympic_Game(database)
	distinct("insert_Olympic_Game")
	print("insert_Olympic_Game")
	insert_Event_Of(database)
	distinct("insert_Event_Of")
	print("insert_Event_Of")

	#add_nation(database)



if __name__ == "__main__":
	main()