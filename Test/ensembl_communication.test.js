const { get_gene_sequence } = require('../Ensembl_communication/read_data.js');
const read = require('../Ensembl_communication/read_data.js')




test('get_species_from_mart_export with multiple name species', () => {
	expect(read.get_species_from_mart_export("mart_export_saccharomyces_cerevisiae.txt")).toBe('saccharomyces_cerevisiae');
});

test('get_species_from_mart_export with different file extension', () => {
	expect(read.get_species_from_mart_export("mart_export_homo_sapiens.json")).toBe('homo_sapiens');
});

test('get_species_from_mart_export with no name species', () => {
	expect(read.get_species_from_mart_export("mart_export.txt")).toBe('undefined_undefined');
});

test('get_species_from_mart_export with common name', () => {
	expect(read.get_species_from_mart_export("mart_export_human.txt")).toBe('human_undefined');
});

test('get_list_gene with correct file', () => {
	expect(read.get_list_gene('mart_export_homo_sapiens.txt').length).toBe(67130);
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
			species : 'homo_sapiens'
		});
});


test('get_gene_sequece with correct gene object as parameter', () =>{
	expect(read.get_gene_sequence('{ "desc": "chromosome:GRCh38:5:31743988:31744451:-1","id": "ENSG00000248378","version": 1,"molecule": "dna","query": "ENSG00000248378","seq": "TTGGAAGTGAATTAAGACCCTCTCTTGGATACCAGCTGTGAAAGAACGGACTTTTTTTACCTAGTAAGGATGTGACAGACCTGCTCCTGACCCTTCTTTGTTAGTGGCCAGTAAATATACGCAAGGCAAAGTCCCACCCTAGTTTTGAAAAAAGCCAAACTAACAACTCTGCCCAATTTCAAGGAACCGATATAATTTTCAGTACATGAGTGTGATTTAGAAATGGAAACAACATCAGAGCAGGGTTAAATCAACAACCAAGCCATAGACCTTAAAAGGACCAGACTTCATGGTTCAATGATGCCAAGAAAAAGATTCCACCTATAAACTCTTTAGAAAGTAACCACCTCAGAAAGTTCCAGACAAACCAGTTCTGCTTTGCAGATCAGCCCTGTATAAAGCTCTTACCACATTAGTAAGAAGTTACTTGTGCTTTGGTTACAAACAGGCACAATTAAAGGGAA" }')).toBe('TTGGAAGTGAATTAAGACCCTCTCTTGGATACCAGCTGTGAAAGAACGGACTTTTTTTACCTAGTAAGGATGTGACAGACCTGCTCCTGACCCTTCTTTGTTAGTGGCCAGTAAATATACGCAAGGCAAAGTCCCACCCTAGTTTTGAAAAAAGCCAAACTAACAACTCTGCCCAATTTCAAGGAACCGATATAATTTTCAGTACATGAGTGTGATTTAGAAATGGAAACAACATCAGAGCAGGGTTAAATCAACAACCAAGCCATAGACCTTAAAAGGACCAGACTTCATGGTTCAATGATGCCAAGAAAAAGATTCCACCTATAAACTCTTTAGAAAGTAACCACCTCAGAAAGTTCCAGACAAACCAGTTCTGCTTTGCAGATCAGCCCTGTATAAAGCTCTTACCACATTAGTAAGAAGTTACTTGTGCTTTGGTTACAAACAGGCACAATTAAAGGGAA');
});

test('get_gene_sequece with uncorrect gene object as parameter', () =>{
	expect(read.get_gene_sequence('{"species":"homo_sapiens","id":"ENSG00000141068","protein_id":"ENSP00000381958","type":"other_paralog","taxonomy_level":"Bilateria","method_link_type":"ENSEMBL_PARALOGUES"}')).toBe(undefined);
});

