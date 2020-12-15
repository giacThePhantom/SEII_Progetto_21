const fetch = require("node-fetch");
const url = "https://se-2-progetto-21-test.herokuapp.com/api/v2/genome/"

describe('genome.test', () => {
	it("genome of existing species", () => {
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
		return fetch(url + 'mus_musculus').then( r => r.json()).then(data => {
			expect(data.genes[0]).toStrictEqual({
				id:"ENSMUSG00000118659",
				start:140909770,
				end:140917459,
				chromosome:"3",
				strand:-1,
				homologies:[]
			});
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

		return fetch(url + 'mus_musculus/0/9000000').then( r => r.json()).then(data => {
			expect(data.genes[0]).toStrictEqual({
				id:"ENSMUSG00000020393",
				species:"mus_musculus",
				start:5191552,
				end:5261558,
				chromosome:"11",
				strand:-1,
				homologies:[{
					target_id:"ENSG00000183762",
					target_species:"homo_sapiens"},
					{target_id:"ENSDARG00000062579",
					target_species:"danio_rerio"},{
					target_id:"ENSRNOG00000051487",
					target_species:"rattus_norvegicus"},{
					target_id:"ENSGALG00000005808",
					target_species:"gallus_gallus"
					}]
				 });
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
		return fetch(url + 'compara?species1=mus_musculus&species2=rattus_norvegicus').then(r => r.json()).then(data => {
			expect(data.species1.genes[0]).toStrictEqual({
				id:"ENSMUSG00000000103",
				start:2106015,
				chromosome:"Y",
				homologies:{
					target_id:"ENSRNOG00000053042"
				}
			});
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
		return fetch(url + 'compara?species1=mus_musculus&species2=rattus_norvegicus&chr=1').then(r => r.json()).then(data => {
			expect(data.species1.genes[0]).toStrictEqual({
				id:"ENSMUSG00000025900",
				start:3999557,
				end:4409241,
				chromosome:"1",
				strand:-1,
				homologies:{
					target_id:"ENSRNOG00000008807",
					target_species:"rattus_norvegicus"
				}
			});
		});
	});

});
