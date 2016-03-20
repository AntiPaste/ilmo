import rethinkdb as rethink

from ilmo import database
from ilmo import config


def get_events():
    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).run(database.connection)
    return list(cursor)


def get_event(event_id):
    event = rethink.db(config['database']['name']).table('events').get(
        event_id
    ).run(database.connection)
    return event


def delete_event(event_id):
    event = get_event(event_id)
    rethink.db(config['database']['name']).table('events').get(
        event_id
    ).delete().run(database.connection)

    # return the removed event
    return event


def create_event(name, fields):
    response = rethink.db(config['database']['name']).table('events').insert({
        'name': name,
        'fields': fields
    }).run(database.connection)

    if response['inserted'] != 1:
        return None, EventInsertException()

    # return the inserted ID
    return response['generated_keys'][0], None


def update_event(event_id, new_event):
    response = rethink.db(config['database']['name']).table('events').get(
        event_id
    ).update(
        new_event
    ).run(database.connection)

    if response['errors'] != 0:
        return None, EventUpdateException()

    return event_id, None


class EventInsertException(Exception):
    pass


class EventUpdateException(Exception):
    pass
