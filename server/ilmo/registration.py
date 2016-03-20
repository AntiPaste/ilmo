import rethinkdb as rethink

from ilmo import database
from ilmo import config


def __map_custom_fields(fields, custom_fields):
    """
    Maps dict {question_id: answer} to {question_label: answer}
    """
    new_fields = {}
    for key, value in custom_fields.items():
        for field in fields:
            if field['key'] != key:
                continue

            new_fields[field['label']] = value
            break

    return new_fields


def __sanitize_registration(fields, custom_fields):
    sanitized_fields = custom_fields.copy()
    for field_id in custom_fields:
        # Find field with key matching to the field id
        field = [f for f in fields if f['key'] == field_id]
        if not field:
            sanitized_fields.pop(field_id)
    return sanitized_fields


def __validate_registration(fields, custom_fields):
    invalid_fields = []
    for field_id in custom_fields:
        # Find field with key matching to the field id
        field = [f for f in fields if f['key'] == field_id]

        # Field is invalid if mandatory value is empty
        if not (field[0]['optional'] or custom_fields[field_id]):
            invalid_fields.push(field_id)

    return invalid_fields


def get_registrations():
    cursor = rethink.db(config['database']['name']).table(
        'registrations'
    ).run(database.connection)

    registrations = list(cursor)

    # Return empty registrations
    if not registrations:
        return registrations, None

    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(
        registrations[0]['event_id']
    ).get_field('fields').run(database.connection)

    fields = list(cursor)

    for registration in registrations:
        new_fields = __map_custom_fields(fields, registration['custom_fields'])
        registration['custom_fields'] = new_fields

    return registrations, None


def get_registration(registration_id):
    registration = rethink.db(config['database']['name']).table(
        'registrations'
    ).get(registration_id).run(database.connection)

    # Return empty registration
    if not registration:
        return registration, None

    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(
        registration['event_id']
    ).get_field('fields').run(database.connection)

    fields = list(cursor)

    new_fields = __map_custom_fields(fields, registration['custom_fields'])
    registration['custom_fields'] = new_fields

    return registration, None


def delete_registration(registration_id):
    registration, err = get_registration(registration_id)
    if not registration:
        return None, RegistrationNotFoundException()
    rethink.db(config['database']['name']).table('registrations').get(
        registration_id
    ).delete().run(database.connection)

    # return the removed registration
    return registration, None


def create_registration(event_id, custom_fields):
    # Validate custom fields by comparing them to the event fields
    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(event_id).get_field('fields').run(database.connection)

    fields = list(cursor)  # TODO: len(fields) == 0 -> invalid event ID error?

    custom_fields = __sanitize_registration(fields, custom_fields)
    invalid_fields = __validate_registration(fields, custom_fields)
    if invalid_fields:
        return None, RegistrationValidateException(
            'Invalid fields', invalid_fields
        )

    response = rethink.db(config['database']['name']).table(
        'registrations'
    ).insert({
        'event_id': event_id,
        'custom_fields': custom_fields
    }).run(database.connection)

    if response['inserted'] != 1:
        return None, RegistrationInsertException()

    # returns the inserted ID
    return response['generated_keys'][0], None


def update_registration(registration_id, new_registration):
    registration, err = get_registration(registration_id)
    if not registration:
        return None, RegistrationNotFoundException()
    event_id = registration.get('event_id')

    # Validate custom fields by comparing them to the event fields
    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(event_id).get_field('fields').run(database.connection)

    fields = list(cursor)

    custom_fields = __sanitize_registration(
        fields, registration.get('custom_fields')
    )
    invalid_fields = __validate_registration(fields, custom_fields)
    if invalid_fields:
        return None, RegistrationValidateException(
            'Invalid fields', invalid_fields
        )

    response = rethink.db(config['database']['name']).table(
        'registrations'
    ).get(
        registration_id
    ).update(
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
    # TODO: exception for invalid event id?

    registrations = list(cursor)
    if not registrations:
        return registrations, None

    cursor = rethink.db(config['database']['name']).table(
        'events'
    ).get(event_id).get_field('fields').run(database.connection)

    fields = list(cursor)

    for registration in registrations:
        new_fields = __map_custom_fields(fields, registration['custom_fields'])
        registration['custom_fields'] = new_fields

    return registrations, None


class RegistrationValidateException(Exception):
    def __init__(self, message, invalid_fields):
        # Call the base class constructor with the parameters it needs
        super(RegistrationValidateException, self).__init__(message)
        self.invalid_fields = invalid_fields


class RegistrationInsertException(Exception):
    pass


class RegistrationUpdateException(Exception):
    pass


class RegistrationNotFoundException(Exception):
    pass
