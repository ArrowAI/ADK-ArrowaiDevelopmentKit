const { BigQuery } = require('@google-cloud/bigquery');
const env = process.env.ARROWAPI_NODE_ENV || 'production';
const config = require('./../config/config')[env];
const bigquery = new BigQuery({
    projectId: 'arrowai-kubernetes',
    keyFilename: `${__dirname}/./../config/bigQuryProduction.json`
});
const dataset = bigquery.dataset('arrowaiproduction');
const table = dataset.table('event_staging');
let BigQueryHelper = {
    insertRows: ((rows) => {
        table.insert(rows, insertHandler);

    }),
    async excuteQuery(eventQuery) {
        // Queries the U.S. given names dataset for the state of Texas.
        const query = eventQuery;
        // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
        const options = {
            query: query,
            // Location must match that of the dataset(s) referenced in the query.
            // location: 'US',
        };
        // Run the query as a job
        const [job] = await bigquery.createQueryJob(options);
        console.log(`Job ${job.id} started.`);
        // Wait for the query to finish
        const [rows] = await job.getQueryResults();
        return rows;
    }


}

function insertHandler(err, apiResponse) {
    if (err) {
        console.log(JSON.stringify(err));

        if (err.name === 'PartialFailureError') { }
    }
}



module.exports = BigQueryHelper;