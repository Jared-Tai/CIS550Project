CREATE TABLE Athlete_Belong_To ( 
IOC char(3),
AName varchar(255),
Gender varchar(5),
PRIMARY KEY (IOC, AName, Gender), FOREIGN KEY (IOC) REFERENCES Nation(IOC) ON DELETE CASCADE, CHECK (Gender in ('Men','Women'))
);

CREATE TABLE Discipline ( 
DName varchar(255),
Sports varchar(255),
PRIMARY KEY (DName) );

CREATE TABLE Attend (
IOC char(3),
AName varchar(255),
Gender varchar(5),
EName varchar(255),
DName varchar(255),
Medal varchar(6),
Record varchar(255),
Edition integer,
PRIMARY KEY (IOC, AName, Gender, EName, DName, Edition), 
FOREIGN KEY (IOC) REFERENCES Nation(IOC),
FOREIGN KEY (AName, Gender)
REFERENCES Athlete_Belong_To(AName, Gender),
FOREIGN KEY (EName, DName) 
REFERENCES Event_Of(EName, DName),
FOREIGN KEY (Edition) REFERENCES Olympic_Game (Edition), 
CHECK (Gender in ('Men','Women')),
CHECK (Medal in ('Gold','Silver','Bronze'))
);

CREATE TABLE Olympic_Game ( 
Edition integer,
City varchar(255), PRIMARY KEY (Edition), CHECK (Edition >= 1896)
);

CREATE TABLE Event_Of ( 
EName varchar(255),
DName varchar(255),
Edition integer,
PRIMARY KEY (EName, DName, Edition),
FOREIGN KEY (Edition) REFERENCES Olympic_Game(Edition),
CHECK (Edition >= 1896)
);

CREATE TABLE Nation (
IOC varchar(255),
NName varchar(255),
ISOCode varchar(255),
PRIMARY KEY (IOC)
);

CREATE TABLE Nation_Population (
IOC varchar(255),
Year integer,
Population integer,
PRIMARY KEY (IOC, Year),
FOREIGN KEY (IOC) REFERENCES Nation (IOC)
);



