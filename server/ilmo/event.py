import rethinkdb as rethink

from ilmo import database
from ilmo import config


def get_events():
    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).run(database.connection)
    return list(cursor)


def get_event(event_id):
    cursor = rethink.db(config['database']['name']).table('events').filter({
        'id': event_id
    }).run(database.connection)
    return cursor.next()


def create_event(name, fields):
    response = rethink.db(config['database']['name']).table('events').insert({
        'name': name,
        'fields': fields
    }).run(database.connection)

    if response['inserted'] != 1:
        return None, EventInsertionException()

    # return the inserted ID
    return response['generated_keys'][0], None


def update_event(event_id, new_event):
    response = rethink.db(config['database']['name']).table('events').filter({
        'id': event_id
    }).update(
        new_event
    ).run(database.connection)

    if response['errors'] != 0:
        return None, EventUpdateException()

    return event_id, None


class EventInsertionException(Exception):
    pass


class EventUpdateException(Exception):
    pass
