import rethinkdb as rethink

from ilmo import database
from ilmo import config


def __add_keys_to_fields(fields):
    for field in fields:
        field['key'] = rethink.uuid()
    return fields


def get_events():
    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).run(database.connection)
    return list(cursor), None


def get_event(event_id):
    event = rethink.db(config['database']['name']).table('events').get(
        event_id
    ).run(database.connection)
    return event, None


def delete_event(event_id):
    event = get_event(event_id)
    rethink.db(config['database']['name']).table('events').get(
        event_id
    ).delete().run(database.connection)

    # return the removed event
    return event, None


def create_event(name, fields):
    fields = __add_keys_to_fields(fields)
    response = rethink.db(config['database']['name']).table('events').insert({
        'name': name,
        'fields': fields
    }).run(database.connection)

    if response['inserted'] != 1:
        return None, EventInsertException()

    # return the inserted ID
    return response['generated_keys'][0], None


def update_event(event_id, new_event):
    new_event['fields'] = __add_keys_to_fields(new_event['fields'])
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
