using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using VainillaWebApi.Models;
using Microsoft.AspNetCore.Cors;

namespace VainillaWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	[EnableCors("permitir")]
	public class PersonController : ControllerBase
	{
		[HttpGet]
		public async Task<ActionResult> Get()
		{
			using (VainillaCrudContext db = new VainillaCrudContext())
			{
				var query = await db.Person.ToListAsync();

				return Ok(query);
			}
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] Person person)
		{
			using (VainillaCrudContext db = new VainillaCrudContext())
			{
				Person oPerson = new Person();
				oPerson.FullName = person.FullName;
				oPerson.Age = person.Age;
				db.Person.Add(person);
				await db.SaveChangesAsync();

			}
			return Ok("Added");
		}

		[HttpPut]
		public async Task<ActionResult> Put([FromBody] Person person)
		{
			using (VainillaCrudContext db = new VainillaCrudContext())
			{

				Person oPerson = db.Person.Find(person.Id);
				oPerson.FullName = person.FullName;
				oPerson.Age = person.Age;
				db.Entry(oPerson).State = EntityState.Modified;
				await db.SaveChangesAsync();

			}
			return Ok("Modified");
		}

		[HttpDelete]
		public async Task<ActionResult> Delete([FromBody] Person person)
		{
			using (VainillaCrudContext db = new VainillaCrudContext())
			{

				Person oPerson = db.Person.Find(person.Id);
				db.Person.Remove(oPerson);
				await db.SaveChangesAsync();

			}
			return Ok("Deleted");
		}
	}
}
