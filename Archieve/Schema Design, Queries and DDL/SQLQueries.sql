--Queries
--Group 21

--Function Part 1
with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select N.NName, N.IOC, count(M.MedalNum)
from Nation N left join Medals M on N.IOC = M.IOC
where M.Edition = '#Edition' and M.EName = '#Event' and M.DName = '#Discipline'
group by N.NName, N.IOC
order by count(M.MedalNum) desc, N.NName, N.IOC;
--Where condition depends on user selections. Each selection attribute can be selected or not.
--Total 8 combinations

--Function Part2
with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select edition, count(MedalNum)
from Medals
where M.EName = '#Event' and M.DName = '#Discipline'
group by edition order by edition desc;
--Where condition depends on user selections. Each selection attribute can be selected or not.
--Total 4 combinations

--Function Part3
with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select N.NName, N.IOC, count(M.MedalNum), NP.Population
from Nation N left join Medals M on N.IOC = M.IOC
			  inner join Nation_Owns_Population NP 
			  on NP.IOC = A.IOC and NP.Year = A.Edition 
			  and N.IOC = NP.IOC
where NP.Year = '#' and M.EName = '#Event' and M.DName = '#Discipline'
group by N.Name, N.IOC, NP.Population
order by count(M.Medal) desc, N.NName, N.IOC;
----Where condition depends on user selections. Year has to be selected and other two selection attribute can be selected or not.
--Total 4 combinations

--Queries used for ajax dynamically filtering

--given Event and Edition decides Discipline
select distinct DName from Event_Of
where EName = '#Event' and Edition = "#"
order by DName;

--given Discipline and Edition decides Event
select distinct EName from Event_Of
where DName = '#Discipline' and Edition = "#"
order by EName;

--given Discipline and event decides Edition
select distinct Edition from Event_Of
where DName = '#Discipline' and EName = '#Event'
order by Edition;