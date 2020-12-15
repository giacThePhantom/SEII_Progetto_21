const fetch = require("node-fetch");
const url = "https://se-2-progetto-21-test.herokuapp.com/api/v2/genome/"

describe('genome.test', () => {
	it("genome of non existing species", () => {
		expect.assertions(1);

		return fetch(url + 'nonexistingspecies').then( r => r.json()).then(data => {
			expect(data).toStrictEqual(
				{error: "Genome of species: nonexistingspecies doesn't exists"}
			);
		});
	});
	
	it("genome of mus_musculus", () => {
		jest.setTimeout(1200000);
		expect.assertions(1);
		return fetch(url + 'mus_musculus').then(data => {
			expect(data.status).toBe(200);
		});
	});
				
	it("genome of non existing species from 0 to 1000", () => {
		expect.assertions(1);

		return fetch(url + 'nonexistingspecies/0/100').then( r => r.json()).then(data => {
			expect(data).toStrictEqual(
				{error : "Genome of species: nonexistingspecies doesn't exists"}
			);
		});
	});
	
	it("genome of mus_musculus from 0 to 1000", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus/0/1000').then( r => r.json()).then(data => {
			expect(data).toStrictEqual({
				name : 'mus_musculus',
				start : "0",
				end : "1000",
				genes : []
			});
		});
	});

	it("genome of mus_musculus from 0 9000000", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus/0/9000000').then(data => {
			expect(data.status).toStrictEqual(200);
		});
	});

	it("genome of mus_musculus from 9000000 to 0", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus/9000000/0').then( r => r.json()).then(data => {
			expect(data).toStrictEqual({
				name:"mus_musculus",
				start:"9000000",
				end:"0",
				genes:[]
			});
		});
	});

	it("genome of mus_musculus from -9000000 to 0", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus/-9000000/0').then( r => r.json()).then(data => {
			expect(data).toStrictEqual({
				name:"mus_musculus",
				start:"-9000000",
				end:"0",
				genes:[]
			});
		});
	});

	it('genome compara nonexistingspecie1 with nonexistingspecies2', () => {
		expect.assertions(1);
		return fetch(url + 'compara?species1=nonexistingspecies1&species2=nonexistingspecies2').then(r => r.json()).then(data => {
			expect(data).toStrictEqual({
				error:[
					"Genome of species: nonexistingspecies2 doesn't exists",
					"Genome of species: nonexistingspecies1 doesn't exists"
				]
			});
		});
	});

	it('genome compara mus_musculus with rattus_norvegicus', () => {
		expect.assertions(1);
		jest.setTimeout(1200000);
		return fetch(url + 'compara?species1=mus_musculus&species2=rattus_norvegicus').then(data => {
			expect(data.status).toBe(200);
		});
	});

	it('genome compara mus_musculus with nonexistingspecies2', () => {
		expect.assertions(1);
		return fetch(url + 'compara?species1=mus_musculus&species2=nonexistingspecies2').then(r => r.json()).then(data => {
			expect(data).toStrictEqual({
				error:"Genome of species: nonexistingspecies2 doesn't exists"
			});
		});
	});

	it('genome compara nonexistingspecies1 with mus_musculus', () => {
		expect.assertions(1);
		return fetch(url + 'compara?species1=nonexistingspecies1&species2=mus_musculus').then(r => r.json()).then(data => {
			expect(data).toStrictEqual({
				error:"Genome of species: nonexistingspecies1 doesn't exists"
			});
		});
	});

	it('genome compara mus_musculus with rattus_norvegicus on chromosome B', () => {
		expect.assertions(1);
		return fetch(url + 'compara?species1=mus_musculus&species2=rattus_norvegicus&chr=B').then(r => r.json()).then(data => {
			expect(data).toStrictEqual({
				error:"Chromosome: B doesn't exists"
			});
		});
	});

	it('genome compara mus_musculus with rattus_norvegicus on chromosome 1', () => {
		expect.assertions(1);
		return fetch(url + 'compara?species1=mus_musculus&species2=rattus_norvegicus&chr=1').then(data => {
			expect(data.status).toBe(200);
		});
	});

});
