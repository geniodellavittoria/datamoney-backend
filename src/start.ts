
// Start the server
import {logger} from './shared/logger';
import app from './server';

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
