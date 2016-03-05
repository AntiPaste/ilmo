import rethinkdb as rethink

from ilmo import database
from ilmo import config


def get_all_registrations():
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).run(database.connection)
    return list(cursor)


def get_registration(rid):
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).filter({'id': rid}).run(database.connection)
    return cursor.next()


def create_registration(eid, custom_fields):
    response = rethink.db(config['database']['name']).table(
        'registrations'
    ).insert({
        'eid': eid,
        'custom_fields': custom_fields
    }).run(database.connection)
    if response['inserted'] != 1:
        return None, RegistrationInsertionException()
    return response['generated_keys'][0], None  # returns id


def update_registration(rid, new_registration):
    response = rethink.db(config['database']['name']).table(
        'registrations'
    ).filter({
        'id': rid
    }).update(
        new_registration
    ).run(database.connection)
    if response['errors'] != 0:
        return None, RegistrationUpdateException()
    return rid, None


def get_registrations_of_event(eid):
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).filter({
        'eid': eid
    }).run(database.connection)
    return list(cursor)


class RegistrationInsertionException(Exception):
    pass


class RegistrationUpdateException(Exception):
    pass
