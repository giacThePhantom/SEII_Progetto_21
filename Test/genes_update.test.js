const { get_gene_sequence } = require('../Ensembl_communication/update_data.js');
const read = require('../Ensembl_communication/update_data.js');



test('get_species_from_mart_export with empty input', () => {
	expect(read.get_species_from_mart_export("")).toBe(undefined);
});
