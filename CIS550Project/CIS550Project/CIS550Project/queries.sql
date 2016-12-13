1. 国家获奖历史统计 //

with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select N.NName, N.IOC, count(M.MedalNum)
from Nation N left join Medals M on N.IOC = M.IOC
group by N.NName, N.IOC
order by count(M.MedalNum) desc, N.NName, N.IOC;
	  
2. 国家人口平均奖牌数

select N.NName, N.IOC, count(A.Medal), NP.Population
from Nation N left join Attend A on N.IOC = A.IOC
	inner join Nation_Population NP 
	on NP.IOC = A.IOC and NP.Year = A.Edtion 
	and N.IOC = NP.IOC
where NP.Year = '#'
group by N.IOC;

3. 输入（项目）&（第几届奥运会） 

with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select N.NName, N.IOC, count(M.MedalNum)
from Nation N left join Medals M on N.IOC = M.IOC
where M.Edition = '#Edition' and M.EName = '#Event' and M.DName = '#Discipline'
group by N.NName, N.IOC
order by count(M.Medal) desc, N.NName, N.IOC; 

4. 输入（项目）

with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select N.NName, N.IOC, count(M.MedalNum)
from Nation N left join Medals M on N.IOC = M.IOC
where M.EName = '#Event' and M.DName = '#Discipline'
group by N.NName, N.IOC
order by count(M.Medal) desc, N.NName, N.IOC; 


5. 输入（第几届奥运会）

with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum
from Nation N left Join Attend A on N.IOC = A.IOC
group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)

select N.NName, N.IOC, count(M.MedalNum)
from Nation N left join Medals M on N.IOC = M.IOC
where M.Edition = '#Edition'
group by N.NName, N.IOC
order by count(M.MedalNum) desc, N.NName, N.IOC; 


