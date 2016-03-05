from ilmo import app
from ilmo import logger
from ilmo import database

#import routes  # noqa

database.setup(database.connection)
logger.info('Databases initialized')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
