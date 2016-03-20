import rethinkdb as rethink

from ilmo import database
from ilmo import config


def __map_custom_fields(fields, custom_fields):
    new_fields = {}
    for key, value in custom_fields.items():
        for field in fields:
            if field['key'] != key:
                continue

            new_fields[field['label']] = value
            break

    return new_fields


def get_registrations():
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).run(database.connection)

    registrations = list(cursor)
    if not registrations:
        return registrations

    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(
        registrations[0]['event_id']
    ).get_field('fields').run(database.connection)

    fields = list(cursor)

    for registration in registrations:
        new_fields = __map_custom_fields(fields, registration['custom_fields'])
        registration['custom_fields'] = new_fields

    return registrations


def get_registration(registration_id):
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).filter({'id': registration_id}).run(database.connection)

    registration = cursor.next()
    if not registration:
        return registration

    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(
        registration['event_id']
    ).get_field('fields').run(database.connection)

    fields = list(cursor)

    new_fields = __map_custom_fields(fields, registration['custom_fields'])
    registration['custom_fields'] = new_fields

    return registration


def create_registration(event_id, custom_fields):
    response = rethink.db(config['database']['name']).table(
        'registrations'
    ).insert({
        'event_id': event_id,
        'custom_fields': custom_fields
    }).run(database.connection)

    if response['inserted'] != 1:
        return None, RegistrationInsertionException()

    # returns the inserted ID
    return response['generated_keys'][0], None


def update_registration(registration_id, new_registration):
    response = rethink.db(config['database']['name']).table(
        'registrations'
    ).filter({
        'id': registration_id
    }).update(
        new_registration
    ).run(database.connection)

    if response['errors'] != 0:
        return None, RegistrationUpdateException()

    return registration_id, None


def get_event_registrations(event_id):
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).filter({
        'event_id': event_id
    }).run(database.connection)

    registrations = list(cursor)
    if not registrations:
        return registrations

    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(event_id).get_field('fields').run(database.connection)

    fields = list(cursor)

    for registration in registrations:
        new_fields = __map_custom_fields(fields, registration['custom_fields'])
        registration['custom_fields'] = new_fields

    return registrations


class RegistrationInsertionException(Exception):
    pass


class RegistrationUpdateException(Exception):
    pass
