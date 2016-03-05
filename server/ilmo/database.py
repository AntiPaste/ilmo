import rethinkdb as rethink

from ilmo import config
from ilmo import logger

connection = rethink.connect(config['database']['host'], 28015)


def setup(connection):
    """
    Try to create database and tables if they don't exist
    """
    try:
        rethink.db_create(config['database']['name']).run(connection)
    except rethink.ReqlRuntimeError:
        logger.info('Database already exists')

    tables = ('events', 'registrations')
    for table in tables:
        try:
            rethink.db(
                config['database']['name']
            ).table_create(table).run(connection)
        except rethink.ReqlOpFailedError:
            logger.info('Table {} already exists'.format(table))
