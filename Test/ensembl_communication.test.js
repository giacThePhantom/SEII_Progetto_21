const read = require('../Ensembl_communication/read_data.js')


test('get_species_from_mart_export with empty input', () => {
	expect(read.get_species_from_mart_export("")).toBe(undefined);
});


test('get_species_from_mart_export with multiple name species', () => {
	expect(read.get_species_from_mart_export("mart_export_saccharomyces_cerevisiae.txt")).toBe('saccaromyces_cerevisiae');
});

test('get_species_from_mart_export with different file extension', () => {
	expect(read.get_species_from_mart_export("mart_export_human.json")).toBe('human');
});

test('get_species_from_mart_export with no name species', () => {
	expect(read.get_species_from_mart_export("mart_export.txt")).toBe(undefined);
});

test('get_list_gene with empty input', () => {
	expect(read.get_list_gene('')).toBe(undefined);
});

test('get_list_gene with non existing file', () => {
	expect(read.get_list_gene('nonexistingfile')).toBe(undefined);
});

test('get_list_gene with correct file', () => {
	expect(read.get_list_gene('mart_export_human.txt').length).toBe(67130);
});

test('get_gene_info with information from ensembl', () => {
	expect(read.get_gene_info('{"description" : "B-Raf proto-oncogene, serine/threonine kinase [Source:HGNC Symbol;Acc:HGNC:1097]",	"display_name" : "BRAF","end" : 140924929,"id" : "ENSG00000157764","seq_region_name" : "7","assembly_name" : "GRCh38","biotype" : "protein_coding","source" : "ensembl_havana",	"strand" : -1,"object_type" : "Gene","db_type" : "core","logic_name" : "ensembl_havana_gene_homo_sapiens","version":14,"start" : 140719327,"species" : "homo_sapiens"}')).toStrictEqual({
			description : "B-Raf proto-oncogene, serine/threonine kinase [Source:HGNC Symbol;Acc:HGNC:1097]",
			strand : -1,
			end : 140924929,
			id : "ENSG00000157764",
			chromosome : "7",
			biotype : "protein_coding",
			version:14,
			start : 140719327,
		});
});

test('get_gene_info with non gene info', () =>{
	expect(read.get_gene_info('{"Parent":"ENSG00000210077","biotype":"Mt_tRNA","source":"ensembl","strand":1,"species":"homo_sapiens","display_name":"MT-TV-201","seq_region_name":"MT","is_canonical":1,"end":1670,"logic_name":"mt_genbank_import_homo_sapiens","object_type":"Transcript","db_type":"core","id":"ENST00000387342","start":1602,"assembly_name":"GRCh38","version":1}')).toBe({});
});

