def IOC_sql(fileName, tableName, numColumn, startLine=1, outputName='out.sql'):
    csvFile = open(fileName, 'r')
    outputFile = open(outputName, 'w')
    lines = csvFile.readlines()
    csvFile.close()
    columnName = []

    firstlineContent = lines[startLine-1].split(',')
    sqlString = 'INSERT INTO ' + tableName + ' ('
    for i in range(0, numColumn):
        columnName.append(firstlineContent[i].strip())
    columnName[0] = 'NName'
    columnName[1] = 'IOC'
    columnName[2] = 'ISOCode'
    for i in range(0, numColumn-1):
        sqlString += columnName[i] + ', '
    sqlString += columnName[numColumn-1] + ') VALUES ('
    

    
        
    for i in range(startLine, len(lines)):
        Content = lines[i].split(',')
        outList = []
        sqlStringOut = sqlString
        for j in range(0, numColumn):
            outList.append(Content[j].strip())
        for k in range(0, numColumn-1):
            sqlStringOut += "'" + outList[k] + "'" + ', '
        sqlStringOut += "'" + outList[k+1] + "'" + '); '
        outputFile.write(sqlStringOut)

    outputFile.close()


def AttendRecord_sql(IOCFile, ANameFile, RecordFile, EditionFile,
                     EName, DName, Gender, outputName='attendR.sql'):
    iocF = open(IOCFile, 'r')
    anameF = open(ANameFile, 'r')
    recordF = open(RecordFile, 'r')
    editionF = open(EditionFile, 'r')
    outputF = open(outputName, 'w')

    iocLines = iocF.readlines()
    anameLines = anameF.readlines()
    recordLines = recordF.readlines()
    editionLines = editionF.readlines()
    iocF.close()
    anameF.close()
    recordF.close()
    editionF.close()

    specialList = ['DE', 'DI']

    for i in range(0, len(iocLines)):
        if (i+1)%3 == 1:
            Medal = 'Gold'
        elif (i+1)%3 == 2:
            Medal = 'Silver'
        else:
            Medal = 'Bronze'
        ANameContent = anameLines[i].strip().split()
        AName = ANameContent[-1].upper() + ', '
        if ANameContent[-2].upper() in specialList:
            AName = ANameContent[-2].upper() + ' ' + AName
            for i in range(0, len(ANameContent)-3):
                AName += ANameContent[i] + ' '
            AName += ANameContent[len(ANameContent) - 3]
        else:
            for i in range(0, len(ANameContent)-2):
                AName += ANameContent[i] + ' '
            AName += ANameContent[len(ANameContent) - 2]
        SqlString = "UPDATE Attend SET Record='" + recordLines[i].strip() + "' "
        SqlString += "WHERE IOC=" + "'" + iocLines[i].strip() + "' "
        SqlString += "AND Medal=" + "'" + Medal + "' "
#        SqlString += "AND AName=" + "'" + AName + "' "
        SqlString += "AND Gender=" + "'" + Gender + "' "
        SqlString += "AND EName=" + "'" + EName + "' "
        SqlString += "AND DName=" + "'" + DName + "' "
        SqlString += "AND Edition=" + editionLines[i].strip() +';\n'

        outputF.write(SqlString)

    outputF.close()

def AttendRecord_mongo(IOCFile, ANameFile, RecordFile, EditionFile,
                     EName, DName, Gender, outputName='attendR.json'):
    iocF = open(IOCFile, 'r')
    anameF = open(ANameFile, 'r')
    recordF = open(RecordFile, 'r')
    editionF = open(EditionFile, 'r')
    outputF = open(outputName, 'w')

    iocLines = iocF.readlines()
    anameLines = anameF.readlines()
    recordLines = recordF.readlines()
    editionLines = editionF.readlines()
    iocF.close()
    anameF.close()
    recordF.close()
    editionF.close()

    specialList = ['DE', 'DI']

    for i in range(0, len(iocLines)):
        if (i+1)%3 == 1:
            Medal = 'Gold'
        elif (i+1)%3 == 2:
            Medal = 'Silver'
        else:
            Medal = 'Bronze'
        ANameContent = anameLines[i].strip().split()
        AName = ANameContent[-1].upper() + ', '
        if ANameContent[-2].upper() in specialList:
            AName = ANameContent[-2].upper() + ' ' + AName
            for i in range(0, len(ANameContent)-3):
                AName += ANameContent[i] + ' '
            AName += ANameContent[len(ANameContent) - 3]
        else:
            for i in range(0, len(ANameContent)-2):
                AName += ANameContent[i] + ' '
            AName += ANameContent[len(ANameContent) - 2]
        MongoDoc = '{ "EName":' + '"' + EName + '" ,'
        MongoDoc += '"DName":' + '"' + DName + '",'
        MongoDoc += '"Gender":' + '"' + Gender + '",'
        MongoDoc += '"Edition":' + '"' + editionLines[i].strip() + '",'
        MongoDoc += '"Medal":' + '"' + Medal + '",'
        MongoDoc += '"Athlete": { "AName":' + '"' + AName + '",'
        MongoDoc += '"IOC":' + '"' + iocLines[i].strip() + '",'
        MongoDoc += '"Record":' + '"' + recordLines[i].strip() + '"}}\n'

        outputF.write(MongoDoc)

    outputF.close()




def InsertPopulation(CountryFile, PopulationFile, countryNum,
                     outputName='population.sql',
                     IOOCFile='IOOC.txt', CCountryFile='CCountry.txt'):
    iooc = open(IOOCFile, 'r')
    ccountry = open(CCountryFile, 'r')
    populationF = open(PopulationFile, 'r')
    countryF = open(CountryFile, 'r')
    outputFile = open(outputName, 'w')
    ioocLines = iooc.readlines()
    ccountryLines = ccountry.readlines()
    iooc.close()
    ccountry.close()
    ioocDict = {}

    initialString = "INSERT INTO Nation_owns_Population(IOC, Year, Population) VALUES("
    
    for i in range(0,len(ioocLines)):
        ioocDict[ccountryLines[i].strip()] = ioocLines[i].strip()
    for i in range(0, countryNum):
        countryName = countryF.readline().strip()
        if countryName not in ioocDict.keys():
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            tmp = populationF.readline()
            continue
        tmp = populationF.readline()
        IOC = ioocDict[countryName]
        
        StringWithIOC = initialString + "'" + IOC + "', "

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1952, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1956, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1960, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1964, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1968, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1976, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1980, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1984, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1988, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '1996, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '2000, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '2004, ' + population + ');'
        outputFile.write(StringToP+'\n')

        population = populationF.readline().strip()
        StringToP = StringWithIOC + '2008, ' + population + ');'
        outputFile.write(StringToP+'\n')

        tmp = populationF.readline()

    populationF.close()
    countryF.close()
    outputFile.close()
    














    
